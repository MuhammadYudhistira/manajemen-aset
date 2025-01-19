const prisma = require('../../db/index');

const findlokasi = async () => {
  const listlokasi = await prisma.lokasi.findMany({
    orderBy: {
      nama_lokasi: 'asc',
    },
  });
  return listlokasi;
};

const findlokasiById = async (id) => {
  const lokasi = await prisma.lokasi.findUnique({
    where: {
      id: id,
    },
  });

  return lokasi;
};

const insertlokasi = async (lokasiData) => {
  const lokasi = await prisma.lokasi.create({
    data: {
      nama_lokasi: lokasiData.nama_lokasi,
    },
  });

  return lokasi;
};

const editlokasiById = async (id, lokasiData) => {
  const lokasi = await prisma.lokasi.update({
    where: {
      id: id,
    },
    data: {
      nama_lokasi: lokasiData.nama_lokasi,
    },
  });

  return lokasi;
};

const deletelokasiById = async (id) => {
  const lokasi = await prisma.lokasi.delete({
    where: {
      id: id,
    },
  });

  return lokasi;
};

module.exports = {
  findlokasi,
  findlokasiById,
  insertlokasi,
  editlokasiById,
  deletelokasiById,
};
