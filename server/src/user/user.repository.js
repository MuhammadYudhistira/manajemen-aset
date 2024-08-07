const prisma = require("../../db/index");
const {
  registerUserValidation,
  updateUserValidation,
} = require("../validation/user-validation");
const { validate } = require("../validation/validation");

const findUser = async () => {
  const user = await prisma.user.findMany();
  return user;
};

const findUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      Penanggung_Jawab: {
        select: {
          detail_aset: {
            include: {
              aset: true,
            },
          },
        },
      },
    },
  });

  return user;
};

const findUserByNip = async (nip) => {
  const user = await prisma.user.findUnique({
    where: {
      nip: nip,
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

const deleteUserById = async (id) => {
  const user = await prisma.user.delete({
    where: {
      id: id,
    },
  });

  return user;
};

const editUserById = async (id, newUserData) => {
  const user = validate(updateUserValidation, newUserData);
  const result = await prisma.user.update({
    where: {
      id: id,
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
      Penanggung_Jawab: {
        some: {},
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
  findUserById,
  findUserByNip,
  insertUser,
  deleteUserById,
  editUserById,
  countAllUser,
  countUserByGender,
  countUserByPJ,
};
