const { editDetailAsetById } = require("../detail_aset/detail_aset.repository");
const { getDetailAset } = require("../detail_aset/detail_aset.service");
const { deleteImage } = require("../middleware/uploadGambar");
const {
  findAllDamage,
  findDamageById,
  insertDamage,
  editDamegeById,
  deleteDamageById,
  findDamageByIdUser,
} = require("./damage.repository");

const getAllDamage = async () => {
  const damage = await findAllDamage();
  return damage;
};

const getDetailDamage = async (id) => {
  const damage = await findDamageById(id);
  if (!damage) throw new Error("Laporan Kerusakan tidak ditemukan");
  return damage;
};

const createDemage = async (newDamageData) => {
  if (newDamageData.image.length >= 1) {
    newDamageData.image = newDamageData.image[0];
  } else {
    newDamageData.image = "";
  }

  const newData = {
    status: "Damaged",
  };

  await editDetailAsetById(newDamageData.id_detail_aset, newData);

  const damage = await insertDamage(newDamageData);
  return damage;
};

const editDamage = async (id, newDamageData) => {
  const oldData = await getDetailDamage(id);

  if (newDamageData.image.length >= 1) {
    newDamageData.image = newDamageData.image[0];
    const url = oldData.image;
    console.log({ url });
    deleteImage(url)
      .then(async (result) => {
        console.log(result);
        if (result.success) {
          console.log(`File berhasil dihapus`);
        } else {
          console.error(`Gagal menghapus file, sebab: ${result}`);
        }
      })
      .catch((error) => {
        console.error(`Gagal menghapus file, sebab: ${error.message}`);
      });
  } else {
    newDamageData.image = undefined;
  }

  const damage = await editDamegeById(id, newDamageData);
  return damage;
};

const deleteDamage = async (id) => {
  const oldData = await getDetailDamage(id);
  const url = oldData.image;
  console.log({ url });
  deleteImage(url)
    .then(async (result) => {
      console.log(result);
      if (result.success) {
        console.log(`File berhasil dihapus`);
      } else {
        console.error(`Gagal menghapus file, sebab: ${result}`);
      }
    })
    .catch((error) => {
      console.error(`Gagal menghapus file, sebab: ${error.message}`);
    });
  const damage = await deleteDamageById(id);
  return damage;
};

const getDamageByIdUser = async (id) => {
  const damages = await findDamageByIdUser(id);
  return damages;
};

const acceptDamage = async (id, user) => {
  await getDetailDamage(id);

  const data = {
    approved_by: user.nama,
    approved_date: new Date(),
    status: "Approved",
  };
  const damage = await editDamegeById(id, data);

  return damage;
};

const rejectDamage = async (id, rejectMessage) => {
  console.log("🚀 ~ rejectDamage ~ rejectMessage:", rejectMessage);
  await getDetailDamage(id);

  const data = {
    keterangan: rejectMessage,
    status: "Rejected",
  };
  const damage = await editDamegeById(id, data);

  return damage;
};

module.exports = {
  getAllDamage,
  getDamageByIdUser,
  getDetailDamage,
  createDemage,
  editDamage,
  deleteDamage,
  acceptDamage,
  rejectDamage,
};
