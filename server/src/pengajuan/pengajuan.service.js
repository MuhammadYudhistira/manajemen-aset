const {
  findAllPengajuan,
  findOnePengajuan,
  insertPengajuan,
  cancelPengajuan,
  findPengajuanByNo,
} = require('./pengajuan.repository');

const listPengajuan = async () => {
  const pengajuan = await findAllPengajuan();
  return pengajuan;
};

const detailPengajuan = async (no) => {
  const pengajuan = await findPengajuanByNo(no);
  if (!pengajuan) {
    throw new Error('Pengajuan tidak ditemukan');
  }
  return pengajuan;
};

const createPengajuan = async (newPengajuanData) => {
  const hasData = await findPengajuanByNo(newPengajuanData.no_pengajuan);

  if (hasData) throw new Error('Nomor pengajuan sudah ada');
  const pengajuan = await insertPengajuan(newPengajuanData);
  return pengajuan;
};

const cancelledPengajuan = async (no) => {
  await detailPengajuan(no);

  const pengajuan = await cancelPengajuan(no);
  return pengajuan;
};

module.exports = {
  listPengajuan,
  detailPengajuan,
  createPengajuan,
  cancelledPengajuan,
};
