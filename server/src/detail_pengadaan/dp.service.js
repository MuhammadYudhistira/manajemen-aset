const {
  findAllDetailPengadaan,
  findDetailPengadaanById,
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

module.exports = { getListDP, getDetailDP };
