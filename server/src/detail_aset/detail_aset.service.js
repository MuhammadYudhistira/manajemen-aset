const { getAssetByid, getAssetByCode } = require('../asset/aset.service');
const { deleteImage } = require('../middleware/uploadGambar');
const {
  createDetailAsetValidation,
  UpdateDetailAsetValidation,
} = require('../validation/detail-aset-validation');
const { validate } = require('../validation/validation');
const {
  findDetailAset,
  insertDetailAset,
  findDetailAsetByKodeBarang,
  insertDetailAsetImage,
  findAllDetailAset,
  deleteDetailAsetImageById,
  findDetailAsetImageById,
  findDetailAsetImageByIdDetailAset,
  updateAssetStatus,
  findDetailAsetByStatusNotInactive,
  searchDetailAset,
  findDetailAsetByKodeDetail,
  editDetailAsetByKodeDetail,
  deleteDetailAsetByKodeDetail,
} = require('./detail_aset.repository');
const {
  createKendaraan,
  updateKendaraan,
} = require('../aset_kendaraan/kendaraan.service');

const getAllDetailAset = async (id) => {
  await getAssetByid(id);
  const listDetailAset = await findDetailAset(id);
  return listDetailAset;
};

const getDetailAset = async (kode_detail) => {
  const detailAset = await findDetailAsetByKodeDetail(kode_detail);
  if (!detailAset) throw new Error('Detail Aset tidak ditemukan');
  return detailAset;
};

const getSearchDetailAset = async (search) => {
  const data = await searchDetailAset(search);
  if (!data) throw new Error('Data tidak ditemukan');

  return data;
};

const countDetailAset = async (kode_detail) => {
  const countDetailAset = await findDetailAsetByKodeDetail(kode_detail);
  if (countDetailAset === 1) throw new Error('Kode Barang Sudah ada');
  return countDetailAset;
};

const generateKodeDetail = async (kode_barang) => {
  const details = await findDetailAsetByKodeBarang(kode_barang);

  //finding missing code
  for (let i = 1; i <= details.length; i++) {
    const expectedKodeDetail = `${kode_barang}.${String(i).padStart(3, '0')}`;
    if (!details.find((detail) => detail.kode_detail === expectedKodeDetail)) {
      return expectedKodeDetail;
    }
  }

  // Jika tidak ada yang hilang, tambahkan di akhir
  return `${kode_barang}.${String(details.length + 1).padStart(3, '0')}`;
};

const createDetailAset = async (newDetailAsetData) => {
  const aset = await getAssetByCode(newDetailAsetData.kode_barang);

  const kode_detail = await generateKodeDetail(newDetailAsetData.kode_barang);
  const data = {
    ...newDetailAsetData,
    kode_detail,
  };
  await countDetailAset(data.kode_detail);
  console.log(data);
  const body = validate(createDetailAsetValidation, data);

  const detailAset = await insertDetailAset(body);

  if (aset.jenis_barang === 'Kendaraan') {
    newDetailAsetData.kode_detail = detailAset.kode_detail;
    const kendaraan = await createKendaraan(newDetailAsetData);
    console.log(kendaraan);
  }

  const imageData = newDetailAsetData.image.map((img) => ({
    kode_detail: detailAset.kode_detail,
    link: img,
  }));

  await insertDetailAsetImage(imageData);

  return detailAset;
};

const editDetailAset = async (kode_detail, newDetailAsetData) => {
  const existingDetailAset = await getDetailAset(kode_detail);

  if (existingDetailAset.kode_barang !== newDetailAsetData.kode_barang) {
    newDetailAsetData.kode_detail = await generateKodeDetail(
      newDetailAsetData.kode_barang
    );
  } else {
    // Jika kode_barang tetap sama kode_detail tidak berubah
    newDetailAsetData.kode_detail = existingDetailAset.kode_detail;
  }

  const data = validate(UpdateDetailAsetValidation, newDetailAsetData);

  const detailAset = await editDetailAsetByKodeDetail(kode_detail, data);

  if (existingDetailAset.aset.jenis_barang === 'Kendaraan') {
    newDetailAsetData.kode_detail = detailAset.kode_detail;
    const kendaraan = await updateKendaraan(
      detailAset.kode_detail,
      newDetailAsetData
    );
    console.log(kendaraan);
  }

  const imageData = newDetailAsetData.image.map((img) => ({
    kode_detail: detailAset.kode_detail,
    link: img,
  }));

  await insertDetailAsetImage(imageData);

  return detailAset;
};

const archiveAsset = async (kode_detail, keterangan) => {
  await getDetailAset(kode_detail);
  const detailAset = await updateAssetStatus(
    kode_detail,
    'Inactive',
    keterangan
  );
  return detailAset;
};

const unarchiveAsset = async (kode_detail, keterangan) => {
  await getDetailAset(kode_detail);
  const detailAset = await updateAssetStatus(
    kode_detail,
    'Available',
    keterangan
  );
  return detailAset;
};

const deleteDetailAset = async (kode_detail) => {
  await getDetailAset(kode_detail);
  const oldData = await findDetailAsetImageByIdDetailAset(kode_detail);

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

  const detailAset = await deleteDetailAsetByKodeDetail(kode_detail);
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
  if (!data.id || data.id === '') throw new Error('Inputan ID tidak ada');
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

const getListDetailAset = async () => {
  const detailAsets = await findAllDetailAset();
  return detailAsets;
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
  getListDetailAset,
};
