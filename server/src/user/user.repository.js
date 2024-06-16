const prisma = require("../../db/index");
const { registerUserValidation } = require("../validation/user-validation");
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
      profile: true,
    },
  });

  return result;
};

module.exports = { findUser, findUserById, findUserByNip, insertUser };
