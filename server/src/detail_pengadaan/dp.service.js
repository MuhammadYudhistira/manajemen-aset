const {
  insertDetailAsetImage,
} = require('../detail_aset/detail_aset.repository');
const {
  findAllDetailPengadaan,
  findDetailPengadaanById,
  editDetailPengadaan,
  deleteDetailPengadaanById,
  editStatusDetailPengadaan,
} = require('./dp.repository');

const getListDP = async () => {
  const list = await findAllDetailPengadaan();
  return list;
};

const getDetailDP = async (id) => {
  const detail = await findDetailPengadaanById(id);
  if (!detail) {
    throw new Error('Detail Pengadaan tidak ditemukan');
  }
  return detail;
};

const updateDetailPengadaan = async (id, data) => {
  await getDetailDP(id);
  const updatedDetailPengadaan = await editDetailPengadaan(id, data);

  const imageData = data.image.map((img) => ({
    kode_detail: id,
    link: img,
  }));

  await insertDetailAsetImage(imageData);

  return updatedDetailPengadaan;
};

const deleteDetailPengadaan = async (id) => {
  await getDetailDP(id);
  const deletedDetailPengadaan = await deleteDetailPengadaanById(id);
  return deletedDetailPengadaan;
};

const updateAssetArchiveStatus = async (id, status, keterangan) => {
  await getDetailDP(id);
  return await editStatusDetailPengadaan(id, status, keterangan);
};

const archiveDP = async (kode_detail, keterangan) => {
  return await updateAssetArchiveStatus(kode_detail, 'Inactive', keterangan);
};

const unarchiveDP = async (kode_detail, keterangan) => {
  return await updateAssetArchiveStatus(kode_detail, 'Available', keterangan);
};

module.exports = {
  getListDP,
  getDetailDP,
  updateDetailPengadaan,
  deleteDetailPengadaan,
  archiveDP,
  unarchiveDP,
};
