const { getAssetByid } = require('../asset/aset.service');
const { deleteImage } = require('../middleware/uploadGambar');
const {
  createDetailAsetValidation,
  UpdateDetailAsetValidation,
} = require('../validation/detail-aset-validation');
const { validate } = require('../validation/validation');
const {
  findDetailAset,
  findDetailAsetById,
  insertDetailAset,
  editDetailAsetById,
  deleteDetailAsetById,
  findDetailAsetByKodeBarang,
  insertDetailAsetImage,
  findAllDetailAset,
  deleteDetailAsetImageById,
  findDetailAsetImageById,
  findDetailAsetImageByIdDetailAset,
  updateAssetStatus,
  findDetailAsetByStatusNotInactive,
  searchDetailAset,
} = require('./detail_aset.repository');

const getAllDetailAset = async (id) => {
  await getAssetByid(id);
  const listDetailAset = await findDetailAset(id);
  return listDetailAset;
};

const getDetailAset = async (id) => {
  const detailAset = await findDetailAsetById(id);
  if (!detailAset) throw new Error('Detail Aset tidak ditemukan');
  return detailAset;
};

const getSearchDetailAset = async (search) => {
  const data = await searchDetailAset(search);
  if (!data) throw new Error('Data tidak ditemukan');

  return data;
};

const countDetailAset = async (kode_barang) => {
  const countDetailAset = await findDetailAsetByKodeBarang(kode_barang);
  if (countDetailAset === 1) throw new Error('Kode Barang Sudah ada');
  return countDetailAset;
};

const createDetailAset = async (newDetailAsetData) => {
  const data = validate(createDetailAsetValidation, newDetailAsetData);
  await countDetailAset(data.kode_barang);

  const detailAset = await insertDetailAset(data);

  const imageData = newDetailAsetData.image.map((img) => ({
    id_detail_aset: detailAset.id,
    link: img,
  }));

  await insertDetailAsetImage(imageData);

  return detailAset;
};

const editDetailAset = async (id, newDetailAsetData) => {
  const oldData = await getDetailAset(id);
  const data = validate(UpdateDetailAsetValidation, newDetailAsetData);
  console.log(data);
  if (oldData.kode_barang !== data.kode_barang) {
    await countDetailAset(data.kode_barang);
  }
  const detailAset = await editDetailAsetById(id, data);

  const imageData = newDetailAsetData.image.map((img) => ({
    id_detail_aset: detailAset.id,
    link: img,
  }));

  await insertDetailAsetImage(imageData);

  return detailAset;
};

const archiveAsset = async (id, keterangan) => {
  await getDetailAset(id);
  const detailAset = await updateAssetStatus(id, 'Inactive', keterangan);
  return detailAset;
};

const unarchiveAsset = async (id, keterangan) => {
  await getDetailAset(id);
  const detailAset = await updateAssetStatus(id, 'Available', keterangan);
  return detailAset;
};

const deleteDetailAset = async (id) => {
  await getDetailAset(id);
  const oldData = await findDetailAsetImageByIdDetailAset(id);

  oldData.forEach((gbr) => {
    const namaFile = gbr.link.split('/')[1];

    deleteImage(gbr.link)
      .then(async (result) => {
        if (result.success) {
          console.log(`File berhasil dihapus: ${namaFile}`);
        } else {
          console.error(`Gagal menghapus file: ${namaFile}, sebab: ${result}`);
        }
      })
      .catch((error) => {
        console.error(
          `Gagal menghapus file: ${namaFile}, sebab: ${error.message}`
        );
      });
  });

  const detailAset = await deleteDetailAsetById(id);
  return detailAset;
};

const listDetailAset = async () => {
  const detailAset = await findAllDetailAset();
  return detailAset;
};

const listActiveDetailAset = async () => {
  const detailAset = await findDetailAsetByStatusNotInactive();
  return detailAset;
};

const getDetailAsetImage = async (id) => {
  const idInt = parseInt(id);
  const exist = await findDetailAsetImageById(idInt);
  if (!exist) {
    throw new Error('Tidak ada gambar yang dicari');
  }
  return exist;
};

const deleteDetailAsetImage = async (data) => {
  if (!data.id || data.id === '') throw new Error('Id kosong');

  await getDetailAsetImage(data.id);

  const image = deleteDetailAsetImageById(data.id);

  try {
    deleteImage(data.link);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }

  return image;
};

module.exports = {
  getAllDetailAset,
  getDetailAset,
  createDetailAset,
  editDetailAset,
  deleteDetailAset,
  listDetailAset,
  deleteDetailAsetImage,
  archiveAsset,
  unarchiveAsset,
  listActiveDetailAset,
  getSearchDetailAset,
};
