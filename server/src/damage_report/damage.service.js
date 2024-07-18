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
  const damage = await insertDamage(newDamageData);
  return damage;
};

const editDamage = async (id, newDamageData) => {
  await getDetailDamage(id);
  const damage = await editDamegeById(id, newDamageData);
  return damage;
};

const deleteDamage = async (id) => {
  const damage = await deleteDamageById(id);
  return damage;
};

const getDamageByIdUser = async (id) => {
  const damages = await findDamageByIdUser(id);
  return damages;
};

module.exports = {
  getAllDamage,
  getDamageByIdUser,
  getDetailDamage,
  createDemage,
  editDamage,
  deleteDamage,
};
