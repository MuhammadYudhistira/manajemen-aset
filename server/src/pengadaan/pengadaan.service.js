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
  try {
    console.log('🚀 ~ createPengadaan ~ newPengadaanData:', newPengadaanData);
    // Insert pengadaan
    const pengadaan = await insertPengadaan(newPengadaanData);

    // Loop melalui setiap detail_barang
    for (const data of newPengadaanData.detail_barang) {
      const jumlah_barang = parseInt(data.jumlah_barang);
      // Loop untuk membuat aset berdasarkan jumlah_barang
      for (let i = 0; i < jumlah_barang; i++) {
        const detailAsetData = {
          kode_barang: data.kode_barang,
          nomor_pengadaan: newPengadaanData.nomor_pengadaan,
          id_lokasi: parseInt(data.id_lokasi),
          merk: data.merk,
          ukuran: data.ukuran,
          harga_satuan: parseInt(data.harga_satuan),
          tahun_perolehan: new Date(newPengadaanData.tanggal_pengadaan),
          image: [],
        };

        // Panggil fungsi createDetailAset
        await createDetailAset(detailAsetData);
      }
    }

    return pengadaan;
  } catch (error) {
    console.error('Error detail:', error);
    throw error;
  }
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
