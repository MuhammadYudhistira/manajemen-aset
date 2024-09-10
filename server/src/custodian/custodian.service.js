const {
  findCustodians,
  findCustodiansById,
  countCustodian,
  insertCustodian,
  editCustodianById,
  deleteCustodianById,
  findAllUsersWhoCustodian,
} = require("./custodian.repository");

const getAllCustodian = async () => {
  const custodian = await findCustodians();
  return custodian;
};

const getDetailCustodian = async (id) => {
  const custodians = await findCustodiansById(id);
  if (!custodians) throw new Error("Penanggung Jawab tidak ditemukan");
  return custodians;
};

const countData = async (newCustodianData) => {
  const count = await countCustodian(newCustodianData);
  if (count === 1) throw new Error("Penanggung jawab sudah ada");
  return count;
};

const createCustodian = async (newCustodianData) => {
  await countData(newCustodianData);
  const custodian = await insertCustodian(newCustodianData);
  return custodian;
};

const updateCustodian = async (id, newCustodianData) => {
  await getDetailCustodian(id);
  await countData(newCustodianData);
  const custodian = await editCustodianById(id, newCustodianData);
  return custodian;
};

const deleteCustodian = async (id) => {
  await getDetailCustodian(id);
  const custodian = await deleteCustodianById(id);
  return custodian;
};

const getAllUserWhoseCustodian = async () => {
  const listUsers = await findAllUsersWhoCustodian();
  return listUsers;
};

module.exports = {
  getAllCustodian,
  getDetailCustodian,
  createCustodian,
  updateCustodian,
  deleteCustodian,
  getAllUserWhoseCustodian,
};
