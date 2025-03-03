const express = require('express');
const { response } = require('../response/response');
const { responseError } = require('../response/responseError');
const {
  getAllPengadaan,
  getPengadaanByNomor,
  createPengadaan,
  deletePengadaan,
} = require('./pengadaan.service');
const { uploadFiles } = require('../middleware/uploadFile');

const router = express.Router();

const fileConfigs = [
  {
    fieldName: 'dokumen_pengadaan',
    maxFileSize: 1024 * 1024 * 5, // 5MB
    allowedMimeTypes: ['application/pdf'],
  },
];

router.get('/', async (req, res) => {
  try {
    const data = await getAllPengadaan();
    response(200, data, 'Berhasil Mendapatkan Data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.get('/:nomor', async (req, res) => {
  try {
    const { nomor } = req.params;
    const data = await getPengadaanByNomor(nomor);
    response(200, data, 'Berhasil Mendapatkan Data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.post('/', uploadFiles(fileConfigs), async (req, res) => {
  try {
    const data = req.body;

    // Menangani dokumen_pengadaan jika berupa array
    data.dokumen_pengadaan = req.body.dokumen_pengadaan?.[0];

    // Proses detail_barang
    // const detailBarang = Object.keys(data)
    //   .filter((key) => key.startsWith('detail_barang[')) // Ambil hanya key yang terkait dengan detail_barang
    //   .reduce((acc, key) => {
    //     const match = key.match(/detail_barang\[(\d+)\]\.(\w+)/); // Match indeks dan properti
    //     if (match) {
    //       const [, index, prop] = match;
    //       acc[index] = acc[index] || {}; // Pastikan ada objek untuk indeks tertentu
    //       acc[index][prop] = data[key]; // Set nilai properti
    //     }
    //     return acc;
    //   }, []);

    // // Konversi ke array dari objek detail_barang
    // data.detail_barang = Object.values(detailBarang);

    // // Hapus properti asli yang sudah diproses
    // Object.keys(data)
    //   .filter((key) => key.startsWith('detail_barang['))
    //   .forEach((key) => delete data[key]);

    // // Logging hasil data setelah transformasi
    // console.log('🚀 ~ router.post ~ data:', data);

    const pengadaan = await createPengadaan(data);

    response(200, pengadaan, 'Berhasil Menambahkan Data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.delete('/:nomor', async (req, res) => {
  try {
    const { nomor } = req.params;
    const data = await deletePengadaan(nomor);
    response(200, data, 'Berhasil Menghapus Data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

module.exports = router;
