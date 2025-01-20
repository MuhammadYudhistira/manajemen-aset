const prisma = require('../../db/index');

const findAllPengadaan = async () => {
  const pengadaan = await prisma.pengadaan.findMany();
  return pengadaan;
};

const findPengadaanByNomor = async (nomor) => {
  const pengadaan = await prisma.pengadaan.findUnique({
    where: {
      nomor_pengadaan: nomor,
    },
  });
  return pengadaan;
};

const insertPengadaan = async (newPengadaanData) => {
  const pengadaan = await prisma.pengadaan.create({
    data: {
      nomor_pengadaan: newPengadaanData.nomor_pengadaan,
      nama_vendor: newPengadaanData.nama_vendor,
      tanggal_pengadaan: new Date(newPengadaanData.tanggal_pengadaan),
      dokumen_pengadaan: newPengadaanData?.dokumen_pengadaan,
      Detail_Pengadaan: {
        create: {
          kode_barang: newPengadaanData.kode_barang,
          harga_satuan: parseInt(newPengadaanData.harga_satuan),
          jumlah_barang: parseInt(newPengadaanData.jumlah_barang),
          total_harga:
            newPengadaanData.harga_satuan * newPengadaanData.jumlah_barang,
        },
      },
    },
  });

  return pengadaan;
};

const deletePengadaanByNomor = async (nomor) => {
  const pengadaan = await prisma.pengadaan.delete({
    where: {
      nomor_pengadaan: nomor,
    },
  });

  return pengadaan;
};

module.exports = {
  findAllPengadaan,
  findPengadaanByNomor,
  insertPengadaan,
  deletePengadaanByNomor,
};
