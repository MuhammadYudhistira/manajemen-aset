const { Storage } = require("@google-cloud/storage");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const projectId = process.env.PROJECT_ID;
const serviceKey = path.join(__dirname, "../../config/service-key.json");
const storage = new Storage({
  projectId,
  keyFilename: serviceKey,
});

const bucket = storage.bucket(process.env.BUCKET_NAME);

const uploadImage = (namaFolder, maxFileSize, allowedMimeTypes) => {
  const fileFilter = (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Allowed types are: " + allowedMimeTypes.join(", ")
        ),
        false
      );
    }
  };

  const multerUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: maxFileSize,
    },
    fileFilter,
  });

  const handleUploadGambar = (req, res, next) => {
    multerUpload.array("image", 10)(req, res, async (err) => {
      //maksimal 10 gambar dalam sekali upload gambar
      if (err instanceof multer.MulterError) {
        return res
          .status(500)
          .json({ success: false, error: "Multer error", message: err });
      } else if (err) {
        return res.status(400).json({
          success: false,
          error: "Unknown error",
          message: err.message,
        });
      }

      // nantinya diteruskan ke fungsi selanjutnya yang ada di controller
      req.body.image = [];

      const file = req.files;
      console.log("🚀 ~ multerUpload.array ~ file:", file);
      if (!file || file.length === 0 || file === undefined) {
        console.log(`Tidak ada gambar yang diupload!!!`);
        return next();
      }

      for (const image of file) {
        const fileName =
          namaFolder + "/" + Date.now().toString() + "_" + image.originalname;
        const blob = bucket.file(fileName);
        const blobStream = blob.createWriteStream({
          resumable: false,
        });

        blobStream.on("error", (err) => {
          res.status(500).send({ message: err.message });
        });

        blobStream.on("finish", async () => {
          req.body.image.push(fileName);

          if (req.body.image.length === file.length) {
            console.log("isi req body image", req.body.image);
            next();
          }
        });

        blobStream.end(image.buffer);
      }
    });
  };

  return handleUploadGambar;
};

const deleteImage = async (fileName) => {
  try {
    const file = bucket.file(fileName);
    await file.delete();
    return `File ${fileName} deleted successfully.`;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

module.exports = { uploadImage, deleteImage };
