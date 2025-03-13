const { updateAssetStatus } = require('../detail_aset/detail_aset.repository');
const {
  findAllDeletion,
  insertDeletion,
  findDeletionById,
  updateDeletionStatus,
  deleteDeleteionById,
  getLastDeletion,
} = require('./deletion.repository');

const getAllDeletion = async () => {
  const listDeletion = await findAllDeletion();
  return listDeletion;
};

const getDetailDetaletion = async (id) => {
  const deletion = await findDeletionById(id);
  if (!deletion) throw new Error('Penghapusan nilai aset tidak ditemukan');
  return deletion;
};

const generateNomorPenghapusan = async () => {
  const lastDeletion = await getLastDeletion(); // Ambil data terakhir dari database
  if (!lastDeletion || !lastDeletion.no_penghapusan) {
    return 'DLT001'; // Jika belum ada data, mulai dari P001
  }

  const lastNumber = parseInt(lastDeletion.no_penghapusan.slice(3), 10); // Ambil angka setelah 'P'
  const nextNumber = lastNumber + 1;
  return `DLT${String(nextNumber).padStart(3, '0')}`; // Format ke PXXX
};

const createDeletion = async (data) => {
  if (data.kode_detail.length === 0)
    throw new Error('Pilih aset yang ingin dihapus');

  if (!data.no_penghapusan) {
    data.no_penghapusan = await generateNomorPenghapusan();
  }
  const deletion = await insertDeletion(data);
  return deletion;
};

const confirmationDeletion = async (id, data) => {
  await getDetailDetaletion(id);
  const { keterangan, bukti_penghapusan } = data;

  const keterangan_aset = {
    status: 'Deletion_Accepted',
    keterangan: 'Penghapusan nilai aset disetujui',
  };

  const deletion = await updateDeletionStatus(
    id,
    'Accepted',
    keterangan,
    bukti_penghapusan,
    data.kode_detail,
    keterangan_aset
  );

  return deletion;
};

const rejectionDeletion = async (id, data) => {
  await getDetailDetaletion(id);
  const { keterangan, bukti_penghapusan } = data;
  const keterangan_aset = {
    status: 'Available',
    keterangan: 'Aset Tersedia',
  };
  const deletion = await updateDeletionStatus(
    id,
    'Rejected',
    keterangan,
    bukti_penghapusan,
    data.kode_detail,
    keterangan_aset
  );
  return deletion;
};

const deleteDeletion = async (id) => {
  await getDetailDetaletion(id);
  const deletion = await deleteDeleteionById(id);
  return deletion;
};

module.exports = {
  getAllDeletion,
  createDeletion,
  getDetailDetaletion,
  confirmationDeletion,
  rejectionDeletion,
  deleteDeletion,
};
