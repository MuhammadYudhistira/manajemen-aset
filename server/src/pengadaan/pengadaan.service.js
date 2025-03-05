const {
  findDetailPengadaanByKodeBarang,
} = require('../detail_pengadaan/dp.repository');
const {
  findAllPengadaan,
  findPengadaanByNomor,
  deletePengadaanByNomor,
  insertPengadaan,
} = require('./pengadaan.repository');

const getAllPengadaan = async () => {
  const pengadaan = await findAllPengadaan();
  return pengadaan;
};

const getPengadaanByNomor = async (nomor) => {
  const pengadaan = await findPengadaanByNomor(nomor);
  if (!pengadaan) throw new Error('Data Pengadaan Tidak Ditemukan');
  return pengadaan;
};

const isNomorPengadaanExist = async (nomor) => {
  const pengadaan = await findPengadaanByNomor(nomor);
  return pengadaan ? true : false;
};

const createPengadaan = async (newPengadaanData) => {
  try {
    if (await isNomorPengadaanExist(newPengadaanData.nomor_pengadaan)) {
      throw new Error('Nomor Pengadaan Sudah Ada');
    }

    if (
      !newPengadaanData.tanggal_penerimaan ||
      newPengadaanData.tanggal_penerimaan === 'undefined'
    ) {
      throw new Error('Tanggal Pengadaan Tidak Boleh Kosong');
    }

    try {
      newPengadaanData.detail_barang = JSON.parse(
        newPengadaanData.detail_barang
      );
    } catch (error) {
      throw new Error(
        'Format detail_barang tidak valid. Harus berupa JSON string.'
      );
    }

    if (
      !Array.isArray(newPengadaanData.detail_barang) ||
      newPengadaanData.detail_barang.length === 0
    ) {
      throw new Error('Tambahkan minimal satu detail barang');
    }

    // Insert pengadaan ke database
    const pengadaan = await insertPengadaan(newPengadaanData);

    return pengadaan;
  } catch (error) {
    console.error('Error detail:', error);
    throw error;
  }
};

const deletePengadaan = async (nomor) => {
  await getPengadaanByNomor(nomor);
  const pengadaan = await deletePengadaanByNomor(nomor);
  return pengadaan;
};

module.exports = {
  getAllPengadaan,
  getPengadaanByNomor,
  createPengadaan,
  deletePengadaan,
};
