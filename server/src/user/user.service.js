const { deleteImage } = require("../middleware/uploadGambar");
const {
  findUser,
  findUserById,
  insertUser,
  findUserByNip,
  deleteUserById,
  editUserById,
  countAllUser,
  countUserByGender,
  countUserByPJ,
  deleteUserByNip,
  editUserByNip,
} = require("./user.repository");

const bcrypt = require("bcrypt");

const getUser = async () => {
  const users = await findUser();
  return users;
};

const countUserStats = async () => {
  const all = await countAllUser();
  const wanita = await countUserByGender("Wanita");
  const pria = await countUserByGender("Pria");
  const pj = await countUserByPJ();

  return {
    allUser: all,
    Wanita: wanita,
    Pria: pria,
    Pj: pj,
  };
};

const getDetailUser = async (nip) => {
  const user = await findUserByNip(nip);
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

const deleteUser = async (nip) => {
  const oldData = await getDetailUser(nip);
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
  const user = await deleteUserByNip(nip);
  return user;
};

const editUser = async (nip, newUserData) => {
  const oldData = await getDetailUser(nip);
  if (newUserData.nip !== oldData.nip && newUserData.nip) {
    await countUser(newUserData.nip);
  }
  if (newUserData.image.length >= 1) {
    newUserData.image = newUserData.image[0];
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
    newUserData.image = undefined;
  }
  if (newUserData.password) {
    newUserData.password = await bcrypt.hash(newUserData.password, 10);
  }
  const user = await editUserByNip(nip, newUserData);
  return user;
};

module.exports = {
  getUser,
  getDetailUser,
  createUser,
  deleteUser,
  editUser,
  countUserStats,
};
