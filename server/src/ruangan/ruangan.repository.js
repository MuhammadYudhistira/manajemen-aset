const prisma = require("../../db/index");
const {
  createRuanganValidation,
} = require("../../validation/ruangan-validation");
const { validate } = require("../../validation/ruangan-validation");

const findRuangan = async () => {
  const listRuangan = await prisma.ruangan.findMany();
  return listRuangan;
};

const findRuanganById = async (id) => {
  const ruangan = await prisma.ruangan.findUnique({
    where: {
      id: id,
    },
  });

  return ruangan;
};

const insertRuangan = async (ruanganData) => {
  const ruangan = await prisma.ruangan.create({
    data: {
      nama_ruangan: ruanganData.nama_ruangan,
    },
  });

  return ruangan;
};

const editRuanganById = async (id, ruanganData) => {
  const ruangan = await prisma.ruangan.update({
    where: {
      id: id,
    },
    data: {
      nama_ruangan: ruanganData.nama_ruangan,
    },
  });

  return ruangan;
};

const deleteRuanganById = async (id) => {
  const ruangan = await prisma.ruangan.delete({
    where: {
      id: id,
    },
  });

  return ruangan;
};

module.exports = {
  findRuangan,
  findRuanganById,
  insertRuangan,
  editRuanganById,
  deleteRuanganById,
};
