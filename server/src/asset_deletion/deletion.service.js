const {
  findAllDeletion,
  insertDeletion,
  findDeletionById,
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
  console.log(data);
  const deletion = await insertDeletion(data);
  return deletion;
};

module.exports = {
  getAllDeletion,
  createDeletion,
  getDetailDetaletion,
};
