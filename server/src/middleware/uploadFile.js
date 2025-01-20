const { Storage } = require('@google-cloud/storage');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const projectId = process.env.PROJECT_ID;
const serviceKey = path.join(__dirname, '../../config/service-key.json');
const storage = new Storage({
  projectId,
  keyFilename: serviceKey,
});

const bucket = storage.bucket(process.env.BUCKET_NAME);

const uploadFiles = (fileConfigs) => {
  const fields = fileConfigs.map((config) => ({
    name: config.fieldName,
    maxCount: 10, // Sesuaikan dengan kebutuhan
  }));

  const multerUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: Math.max(...fileConfigs.map((config) => config.maxFileSize)),
    },
    fileFilter: (req, file, cb) => {
      const allowedMimeTypes = fileConfigs.flatMap(
        (config) => config.allowedMimeTypes
      );
      if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(
          new Error(
            'Invalid file type. Allowed types are: ' +
              allowedMimeTypes.join(', ')
          ),
          false
        );
      }
    },
  }).fields(fields);

  return (req, res, next) => {
    multerUpload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res
          .status(500)
          .json({ success: false, error: 'Multer error', message: err });
      } else if (err) {
        return res.status(400).json({
          success: false,
          error: 'Unknown error',
          message: err.message,
        });
      }

      fileConfigs.forEach((config) => {
        req.body[config.fieldName] = [];
      });

      const files = req.files;
      if (!files || Object.keys(files).length === 0) {
        console.log(`Tidak ada file yang diupload!`);
        return next();
      }

      const uploadPromises = [];

      for (const fieldName in files) {
        const fileArray = files[fieldName];
        for (const file of fileArray) {
          const fileName = `laporan/file-${fieldName}/${Date.now()}_${
            file.originalname
          }`;
          const blob = bucket.file(fileName);
          const blobStream = blob.createWriteStream({ resumable: false });

          const uploadPromise = new Promise((resolve, reject) => {
            blobStream.on('error', (err) => reject(err));
            blobStream.on('finish', () => {
              req.body[fieldName].push(fileName);
              resolve();
            });

            blobStream.end(file.buffer);
          });

          uploadPromises.push(uploadPromise);
        }
      }

      Promise.all(uploadPromises)
        .then(() => next())
        .catch((err) => res.status(500).send({ message: err.message }));
    });
  };
};

const deleteFile = async (fileName) => {
  try {
    const file = bucket.file(fileName);
    await file.delete();
    console.log(`File ${fileName} deleted successfully.`);
    return `File ${fileName} deleted successfully.`;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

module.exports = { uploadFiles, deleteFile };
