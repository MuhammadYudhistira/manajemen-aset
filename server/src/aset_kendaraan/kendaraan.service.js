const {
  findDetailAsetByKodeDetail,
} = require('../detail_aset/detail_aset.repository');
const {
  findAllKendaraan,
  findKendaraanByKodeDetail,
  insertKendaraan,
  updateKendaraanByKodeDetail,
  deleteKendaraanByKodeDetail,
} = require('./kendaraan.repository');

const getListKendaraan = async () => {
  const listKendaraan = await findAllKendaraan();
  return listKendaraan;
};

const getDetailKendaraan = async (kode_detail) => {
  const kendaraan = await findKendaraanByKodeDetail(kode_detail);
  if (!kendaraan) throw new Error('Detail kendaraan tidak ditemukan');
  return kendaraan;
};

const detailAsetExist = async (kode_detail) => {
  const detailAset = await findDetailAsetByKodeDetail(kode_detail);
  if (!detailAset) throw new Error('Detail Aset tidak ditemukan');
  return detailAset;
};

const createKendaraan = async (newKendaraanData) => {
  await detailAsetExist(newKendaraanData.kode_detail);
  const exist = await findKendaraanByKodeDetail(newKendaraanData.kode_detail);
  if (exist) throw new Error('Detail Kendaraan Sudah Ada');
  const kendaraan = await insertKendaraan(newKendaraanData);
  return kendaraan;
};

const updateKendaraan = async (kode_detail, newKendaraanData) => {
  await getDetailKendaraan(kode_detail);
  const kendaraan = await updateKendaraanByKodeDetail(
    kode_detail,
    newKendaraanData
  );
  return kendaraan;
};

const deleteKendaraan = async (kode_detail) => {
  await getDetailKendaraan(kode_detail);
  const kendaraan = await deleteKendaraanByKodeDetail(kode_detail);
  return kendaraan;
};

module.exports = {
  getListKendaraan,
  getDetailKendaraan,
  createKendaraan,
  updateKendaraan,
  deleteKendaraan,
};
