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

module.exports = {
  findUser,
  findUserById,
  findUserByNip,
  insertUser,
  deleteUserById,
  editUserById,
};
