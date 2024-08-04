const { getDetailDamage } = require("../damage_report/damage.service");
const { editDetailAsetById } = require("../detail_aset/detail_aset.repository");
const { deleteImage } = require("../middleware/uploadGambar");
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
  try {
    const oldData = await getDetailRepair(id);
    const { faktur, berita_acara, kuitansi } = oldData;

    const deleteFiles = async (files) => {
      const deletePromises = files.map(deleteImage);
      const results = await Promise.all(deletePromises);
      results.forEach((result, index) => {
        if (result.success) {
          console.log(`File ${files[index]} berhasil dihapus`);
        } else {
          console.error(
            `Gagal menghapus file ${files[index]}, sebab: ${result}`
          );
        }
      });
    };

    await deleteFiles([faktur, berita_acara, kuitansi]);

    const repair = await deleteRepairById(id);
    return repair;
  } catch (error) {
    console.error(`Gagal menghapus repair, sebab: ${error.message}`);
    throw error;
  }
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

const inputLaporan = async (id, newRepairData) => {
  const oldData = await getDetailRepair(id);

  const data = {
    faktur: newRepairData.faktur,
    kuitansi: newRepairData.kuitansi,
    berita_acara: newRepairData.berita_acara,
    status: "Completed",
  };

  const newData = {
    status: "Available",
  };

  await editDetailAsetById(oldData.id_detail_aset, newData);

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
  inputLaporan,
};
