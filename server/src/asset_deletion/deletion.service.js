const { updateAssetStatus } = require("../detail_aset/detail_aset.repository");
const {
  findAllDeletion,
  insertDeletion,
  findDeletionById,
  updateDeletionStatus,
} = require("./deletion.repository");

const getAllDeletion = async () => {
  const listDeletion = await findAllDeletion();
  return listDeletion;
};

const getDetailDetaletion = async (id) => {
  const deletion = await findDeletionById(id);
  return deletion;
};

const createDeletion = async (data) => {
  const deletion = await insertDeletion(data);
  data.id_detail_aset.forEach((id) => {
    updateAssetStatus(
      id,
      "Request_Deletion",
      "Sedang merequest penghapusan nilai aset"
    );
  });
  return deletion;
};

const confirmationDeletion = async (id, data) => {
  const { keterangan } = data;
  const deletion = await updateDeletionStatus(id, "Accepted", keterangan);
  data.id_detail_aset.forEach((id) => {
    updateAssetStatus(
      id,
      "Deletion_Accepted",
      "Penghapusan nilai aset disetujui"
    );
  });
  return deletion;
};

const rejectionDeletion = async (id, data) => {
  const { keterangan } = data;
  const deletion = await updateDeletionStatus(id, "Rejected", keterangan);
  data.id_detail_aset.forEach((id) => {
    updateAssetStatus(id, "Available", "Aset tersedia");
  });
  return deletion;
};

module.exports = {
  getAllDeletion,
  createDeletion,
  getDetailDetaletion,
  confirmationDeletion,
  rejectionDeletion,
};
