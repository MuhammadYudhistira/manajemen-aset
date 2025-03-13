const {
  findAllPengajuan,
  findOnePengajuan,
  insertPengajuan,
  cancelPengajuan,
  findPengajuanByNo,
  findPengajuanByNip,
  findPengajuanByStatus,
  changePengajuanStatus,
  getLastPengajuan,
} = require('./pengajuan.repository');

const listPengajuan = async () => {
  const pengajuan = await findAllPengajuan();
  return pengajuan;
};

const listPengajuanByUser = async (nip) => {
  const pengajuan = await findPengajuanByNip(nip);
  return pengajuan;
};

const listAcceptedPengajuan = async () => {
  const pengajuan = await findPengajuanByStatus('Approved');
  return pengajuan;
};

const detailPengajuan = async (no) => {
  const pengajuan = await findPengajuanByNo(no);
  if (!pengajuan) {
    throw new Error('Pengajuan tidak ditemukan');
  }
  return pengajuan;
};

const generateNomorPengajuan = async () => {
  const lasPengajuan = await getLastPengajuan(); // Ambil data terakhir dari database
  if (!lasPengajuan || !lasPengajuan.no_pengajuan) {
    return 'PGJ001';
  }

  const lastNumber = parseInt(lasPengajuan.no_pengajuan.slice(3), 10); // Ambil hanya angka setelah 'PGJ'
  const nextNumber = lastNumber + 1;
  return `PGJ${String(nextNumber).padStart(3, '0')}`;
};

const createPengajuan = async (newPengajuanData) => {
  if (!newPengajuanData.no_pengajuan) {
    newPengajuanData.no_pengajuan = await generateNomorPengajuan();
  }

  console.log(newPengajuanData.no_pengajuan);

  const pengajuan = await insertPengajuan(newPengajuanData);
  return pengajuan;
};

const cancelledPengajuan = async (no) => {
  await detailPengajuan(no);

  const pengajuan = await cancelPengajuan(no);
  return pengajuan;
};

const reviewPengajuan = async (no, data) => {
  await detailPengajuan(no);

  const pengajuan = await changePengajuanStatus(no, data);
  return pengajuan;
};

module.exports = {
  listPengajuan,
  detailPengajuan,
  createPengajuan,
  cancelledPengajuan,
  listPengajuanByUser,
  listAcceptedPengajuan,
  reviewPengajuan,
};
