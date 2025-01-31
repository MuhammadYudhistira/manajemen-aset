const prisma = require('../../db/index');

const findAllPengadaan = async () => {
  const pengadaan = await prisma.pengadaan.findMany({
    include: {
      Detail_Pengadaan: true,
    },
  });
  return pengadaan;
};

const findPengadaanByNomor = async (nomor) => {
  const pengadaan = await prisma.pengadaan.findUnique({
    where: {
      nomor_pengadaan: nomor,
    },
    include: {
      Detail_Aset: {
        include: {
          aset: {
            select: {
              nama_barang: true,
            },
          },
          lokasi: {
            select: {
              nama_lokasi: true,
            },
          },
        },
      },
      Detail_Pengadaan: {
        include: {
          aset: true,
          lokasi: true,
        },
      },
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
        create: newPengadaanData.detail_barang.map((item) => ({
          kode_barang: item.kode_barang,
          harga_satuan: parseInt(item.harga_satuan),
          jumlah_barang: parseInt(item.jumlah_barang),
          id_lokasi: parseInt(item.id_lokasi),
        })),
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
