const prisma = require("../../db/index");

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

const editRuangan = async (id, ruanganData) => {
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

const deletedRuangan = async (id) => {
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
  editRuangan,
  deletedRuangan,
};
