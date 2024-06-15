const {
  findUser,
  findUserById,
  insertUser,
  countUserByNip,
} = require("./user.repository");

const bcrypt = require("bcrypt");

const getUser = async () => {
  const users = await findUser();
  return users;
};

const getDetailUser = async (id) => {
  const user = await findUserById(id);
  if (!user) throw new Error("User tidak ditemukan");
  return user;
};

const countUser = async (nip) => {
  const user = await countUserByNip(nip);
  if (user === 1) throw new Error("User dengan nip tersebut sudah ada");
  return user;
};

const createUser = async (newUserData) => {
  await countUser(newUserData.nip);
  newUserData.password = await bcrypt.hash(newUserData.password, 10);
  const user = await insertUser(newUserData);
  return user;
};

module.exports = { getUser, getDetailUser, createUser };
