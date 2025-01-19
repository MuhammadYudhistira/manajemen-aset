const { createRuanganValidation } = require('../validation/ruangan-validation');
const { validate } = require('../validation/validation');

const {
  findlokasi,
  findlokasiById,
  insertlokasi,
  editlokasiById,
  deletelokasiById,
} = require('./lokasi.repository');

const getAlllokasi = async () => {
  const listlokasi = await findlokasi();
  return listlokasi;
};

const getlokasiById = async (id) => {
  const lokasi = await findlokasiById(id);
  if (!lokasi) throw new Error('lokasi tidak ditemukan');
  return lokasi;
};

const createlokasi = async (newlokasiData) => {
  const data = validate(createRuanganValidation, newlokasiData);
  const lokasi = await insertlokasi(data);
  return lokasi;
};

const editlokasi = async (id, newlokasiData) => {
  await getlokasiById(id);
  const data = validate(createRuanganValidation, newlokasiData);
  const lokasi = await editlokasiById(id, data);
  return lokasi;
};

const deletelokasi = async (id) => {
  await getlokasiById(id);
  const lokasi = await deletelokasiById(id);
  return lokasi;
};

module.exports = {
  getAlllokasi,
  getlokasiById,
  createlokasi,
  editlokasi,
  deletelokasi,
};
