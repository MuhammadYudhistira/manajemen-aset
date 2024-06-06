const {
  createDetailAsetValidation,
  UpdateDetailAsetValidation,
} = require("../validation/detail-aset-validation");
const { validate } = require("../validation/validation");
const {
  findDetailAset,
  findDetailAsetById,
  insertDetailAset,
  editDetailAsetById,
  deleteDetailAsetById,
  findDetailAsetByKodeBarang,
} = require("./detail_aset.repository");

const getAllDetailAset = async (id) => {
  const listDetailAset = await findDetailAset(id);
  return listDetailAset;
};

const getDetailAset = async (id) => {
  const detailAset = await findDetailAsetById(id);
  if (!detailAset) throw new Error("Detail Aset tidak ditemukan");
  return detailAset;
};

const countDetailAset = async (kode_barang) => {
  const countDetailAset = await findDetailAsetByKodeBarang(kode_barang);
  if (countDetailAset === 1) throw new Error("Kode Barang Sudah ada");
  return countDetailAset;
};

const createDetailAset = async (newDetailAsetData) => {
  const data = validate(createDetailAsetValidation, newDetailAsetData);
  await countDetailAset(data.kode_barang);
  const detailAset = await insertDetailAset(data);
  return detailAset;
};

const editDetailAset = async (id, newDetailAsetData) => {
  await getDetailAset(id);
  const data = validate(UpdateDetailAsetValidation, newDetailAsetData);
  await countDetailAset(data.kode_barang);
  const detailAset = await editDetailAsetById(id, data);
  return detailAset;
};

const deleteDetailAset = async (id) => {
  await getDetailAset(id);
  const detailAset = await deleteDetailAsetById(id);
  return detailAset;
};

module.exports = {
  getAllDetailAset,
  getDetailAset,
  createDetailAset,
  editDetailAset,
  deleteDetailAset,
};
