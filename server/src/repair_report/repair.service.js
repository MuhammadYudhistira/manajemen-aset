const { getDetailDamage } = require("../damage_report/damage.service");
const {
  findAllRepair,
  findRepairById,
  insertRepair,
  deleteRepairById,
} = require("./repair.repository");

const getAllRepairs = async () => {
  const repairs = await findAllRepair();
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

module.exports = { getAllRepairs, getDetailRepair, createRepair, deleteRepair };
