const prisma = require('../../db/index');

const findAllBarang = async () => {
  const barang = await prisma.barang.findMany({
    orderBy: {
      kode_barang: 'asc',
    },
  });
  return barang;
};

module.exports = { findAllBarang };
