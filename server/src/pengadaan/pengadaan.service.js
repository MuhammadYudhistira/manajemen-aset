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
  newPengadaanData.detail_barang = newPengadaanData.detail_barang.map(
    (item) => ({
      ...item,
      nomor_pengadaan: newPengadaanData.nomor_pengadaan, // add properti nomor_pengadaan
    })
  );
  const pengadaan = await insertPengadaan(newPengadaanData);
  const detail_aset = newPengadaanData.detail_barang;

  for (const data of detail_aset) {
    // Ulangi sebanyak jumlah_barang
    const jumlah_barang = parseInt(data.jumlah_barang);
    for (let i = 0; i < jumlah_barang; i++) {
      console.log(i);
      const detailAsetData = {
        kode_barang: data.kode_barang,
        nomor_pengadaan: data.nomor_pengadaan,
        merk: data.merk,
        ukuran: data.ukuran,
        id_lokasi: data.id_lokasi,
        harga_satuan: parseInt(data.harga_satuan),
        tahun_perolehan: data.tahun_perolehan,
      };

      await createDetailAset(detailAsetData);
    }
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
