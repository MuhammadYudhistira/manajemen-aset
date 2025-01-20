const { createDetailAset } = require('../detail_aset/detail_aset.service');
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

const createPengadaan = async (newPengadaanData) => {
  const pengadaan = await insertPengadaan(newPengadaanData);
  newDetailAsetData = {
    kode_barang: newPengadaanData.kode_barang,
    nomor_pengadaan: newPengadaanData.nomor_pengadaan,
    merk: newPengadaanData.merk,
    ukuran: newPengadaanData.ukuran,
    harga_satuan: newPengadaanData.harga_satuan,
    id_lokasi: newPengadaanData.id_lokasi,
    tahun_perolehan: newPengadaanData.tahun_perolehan,
    image: [],
  };
  for (let i = 0; i < newPengadaanData.jumlah_barang; i++) {
    await createDetailAset(newDetailAsetData);
  }
  return pengadaan;
};

const deletePengadaan = async (nomor) => {
  const pengadaan = await deletePengadaanByNomor(nomor);
  return pengadaan;
};

module.exports = {
  getAllPengadaan,
  getPengadaanByNomor,
  createPengadaan,
  deletePengadaan,
};
