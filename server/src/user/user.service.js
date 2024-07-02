const {
  findUser,
  findUserById,
  insertUser,
  findUserByNip,
  deleteUserById,
  editUserById,
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
  const user = await findUserByNip(nip);
  if (user) throw new Error("User dengan nip tersebut sudah ada");
  return user;
};

const createUser = async (newUserData) => {
  await countUser(newUserData.nip);
  if (newUserData.image.length >= 1) {
    newUserData.image = newUserData.image[0];
  } else {
    newUserData.image = null;
  }
  newUserData.password = await bcrypt.hash(newUserData.password, 10);
  const user = await insertUser(newUserData);
  return user;
};

const deleteUser = async (id) => {
  await getDetailUser(id);
  const user = await deleteUserById(id);
  return user;
};

const editUser = async (id, newUserData) => {
  const oldData = await getDetailUser(id);
  if (newUserData.nip !== oldData.nip) {
    await countUser(newUserData.nip);
  }
  if (newUserData.image.length >= 1) {
    newUserData.image = newUserData.image[0];
  } else {
    newUserData.image = null;
  }
  if (newUserData.password) {
    newUserData.password = await bcrypt.hash(newUserData.password, 10);
  }
  const user = await editUserById(id, newUserData);
  return user;
};

module.exports = { getUser, getDetailUser, createUser, deleteUser, editUser };
