const {
  findDetailPengadaanByKodeBarang,
} = require('../detail_pengadaan/dp.repository');
const {
  findAllPengadaan,
  findPengadaanByNomor,
  deletePengadaanByNomor,
  insertPengadaan,
  getLastPengadaan,
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

const generateNomorPengadaan = async () => {
  const lastPengadaan = await getLastPengadaan(); // Ambil data terakhir dari database
  if (!lastPengadaan || !lastPengadaan.nomor_pengadaan) {
    return 'P001'; 
  }

  const lastNumber = parseInt(lastPengadaan.nomor_pengadaan.slice(1), 10); 
  const nextNumber = lastNumber + 1;
  return `P${String(nextNumber).padStart(3, '0')}`; 
};

const createPengadaan = async (newPengadaanData) => {
  try {
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

    if (!newPengadaanData.no_pengajuan)
      throw new Error('Pilih minimal satu pengusulan');

    if (
      !Array.isArray(newPengadaanData.detail_barang) ||
      newPengadaanData.detail_barang.length === 0
    ) {
      throw new Error('Tambahkan minimal satu detail barang');
    }

    // Generate nomor pengadaan otomatis jika belum ada
    if (!newPengadaanData.nomor_pengadaan) {
      newPengadaanData.nomor_pengadaan = await generateNomorPengadaan();
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
