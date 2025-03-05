const prisma = require('../../db/index');
const {
  registerUserValidation,
  updateUserValidation,
} = require('../validation/user-validation');
const { validate } = require('../validation/validation');

const findUser = async () => {
  const user = await prisma.user.findMany();
  return user;
};

const findUserByNip = async (nip) => {
  const user = await prisma.user.findUnique({
    where: {
      nip: nip,
    },
    include: {
      Detail_Pengadaan: true,
    },
  });

  return user;
};

const findUserByRole = async (role) => {
  const user = await prisma.user.findMany({
    where: {
      role: role,
    },
    select: {
      nama: true,
      nip: true,
      image: true,
    },
  });

  return user;
};

const findPJ = async () => {
  const user = await prisma.user.findMany({
    where: {
      Detail_Pengadaan: {
        some: {}, // Cek apakah ada relasi ke Detail_Pengadaan
      },
    },
    include: {
      Detail_Pengadaan: {
        select: {
          id: true,
          barang: {
            select: {
              nama_barang: true,
            },
          },
          Detail_Aset_Images: {
            select: {
              link: true,
            },
          },
        },
      },
    },
  });

  return user;
};

const insertUser = async (newUserData) => {
  const user = validate(registerUserValidation, newUserData);

  const result = await prisma.user.create({
    data: user,
    select: {
      nip: true,
      nama: true,
      image: true,
    },
  });

  return result;
};

const deleteUserByNip = async (nip) => {
  const user = await prisma.user.delete({
    where: {
      nip: nip,
    },
  });

  return user;
};

const editUserByNip = async (nip, newUserData) => {
  const user = validate(updateUserValidation, newUserData);
  const result = await prisma.user.update({
    where: {
      nip: nip,
    },
    data: user,
  });

  return result;
};

const countAllUser = async () => {
  const user = await prisma.user.count();
  return user;
};

const countUserByPJ = async () => {
  const userCount = await prisma.user.count({
    where: {
      Detail_Pengadaan: {
        some: {}, // Cek apakah ada relasi ke Detail_Pengadaan
      },
    },
  });

  return userCount;
};

const countUserByGender = async (gender) => {
  const user = await prisma.user.count({
    where: {
      jenis_kelamin: gender,
    },
  });
  return user;
};

module.exports = {
  findUser,
  findUserByNip,
  insertUser,
  deleteUserByNip,
  editUserByNip,
  countAllUser,
  countUserByGender,
  countUserByPJ,
  findPJ,
  findUserByRole,
};
