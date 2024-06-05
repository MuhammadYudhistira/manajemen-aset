const {
  createRuanganValidation,
} = require("../../validation/ruangan-validation");
const validate = require("../../validation/validation").default;
const {
  findRuangan,
  findRuanganById,
  insertRuangan,
  editRuanganById,
  deleteRuanganById,
} = require("./ruangan.repository");

const getAllRuangan = async () => {
  const listRuangan = await findRuangan();
  return listRuangan;
};

const getRuanganById = async (id) => {
  const ruangan = await findRuanganById(id);
  if (!ruangan) throw new Error("Ruangan tidak ditemukan");
  return ruangan;
};

const createRuangan = async (newRuanganData) => {
  const data = validate(createRuanganValidation, newRuanganData);
  const ruangan = await insertRuangan(data);
  return ruangan;
};

const editRuangan = async (id, newRuanganData) => {
  await getRuanganById(id);
  const ruangan = await editRuanganById(id, newRuanganData);
  return ruangan;
};

const deleteRuangan = async (id) => {
  await getRuanganById(id);
  const ruangan = await deleteRuanganById(id);
  return ruangan;
};

module.exports = {
  getAllRuangan,
  getRuanganById,
  createRuangan,
  editRuangan,
  deleteRuangan,
};
