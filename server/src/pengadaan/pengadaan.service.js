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

const isNomorPengadaanExist = async (nomor) => {
  const pengadaan = await findPengadaanByNomor(nomor);
  return pengadaan ? true : false;
};

const createPengadaan = async (newPengadaanData) => {
  try {
    // Insert pengadaan

    if (await isNomorPengadaanExist(newPengadaanData.nomor_pengadaan))
      throw new Error('Nomor Pengadaan Sudah Ada');

    if (newPengadaanData.tanggal_pengadaan === 'undefined')
      throw new Error('Tanggal Pengadaan Tidak Boleh Kosong');

    if (newPengadaanData.detail_barang.length === 0)
      throw new Error('Tambahkan minimal satu detail barang');

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
