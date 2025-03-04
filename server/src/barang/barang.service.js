const { findAllBarang } = require('./barang.repository');

const getAllBarang = async () => {
  const listBarang = await findAllBarang();
  return listBarang;
};

module.exports = { getAllBarang };
