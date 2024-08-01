const { getDetailDamage } = require("../damage_report/damage.service");
const {
  findAllRepair,
  findRepairById,
  insertRepair,
  deleteRepairById,
  updateRepairById,
  findRepairsByStatus,
} = require("./repair.repository");

const getAllRepairs = async () => {
  const repairs = await findAllRepair();
  return repairs;
};

const getAllAcceptedRepairs = async () => {
  const repairs = await findRepairsByStatus("Approved");
  return repairs;
};

const getDetailRepair = async (id) => {
  const repair = await findRepairById(id);
  if (!repair) throw new Error("Laporan perbaikan tidak ditemukan");
  return repair;
};

const createRepair = async (newRepairData) => {
  const damage = await getDetailDamage(newRepairData.id_laporan_kerusakan);
  newRepairData.biaya_perbaikan = parseInt(newRepairData.biaya_perbaikan);
  newRepairData.id_detail_aset = damage.id_detail_aset;
  const repair = await insertRepair(newRepairData);
  return repair;
};

const deleteRepair = async (id) => {
  await getDetailRepair(id);
  const repair = await deleteRepairById(id);
  return repair;
};

const editRepair = async (id, newRepairData) => {
  await getDetailRepair(id);
  const damage = await getDetailDamage(newRepairData.id_laporan_kerusakan);
  newRepairData.biaya_perbaikan = parseInt(newRepairData.biaya_perbaikan);
  newRepairData.id_detail_aset = damage.id_detail_aset;
  const repair = await updateRepairById(id, newRepairData);
  return repair;
};

const acceptRepair = async (id, user) => {
  await getDetailRepair(id);

  const data = {
    approved_by: user.nama,
    approved_date: new Date(),
    status: "Approved",
  };
  const repair = await updateRepairById(id, data);

  return repair;
};

const rejectRepair = async (id, rejectMessage) => {
  await getDetailRepair(id);

  const data = {
    keterangan: rejectMessage,
    status: "Rejected",
  };
  const repair = await updateRepairById(id, data);

  return repair;
};

module.exports = {
  getAllRepairs,
  getAllAcceptedRepairs,
  getDetailRepair,
  createRepair,
  deleteRepair,
  editRepair,
  acceptRepair,
  rejectRepair,
};
