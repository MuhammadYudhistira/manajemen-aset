const prisma = require('../../db/index');

const findAllDetailPengadaan = async () => {
  const listDP = await prisma.detail_Pengadaan.findMany({
    include: {
      barang: {
        select: {
          kode_barang: true,
          nama_barang: true,
          jenis_barang: true,
          image: true,
        },
      },
      Aset_Kendaraan: true,
      lokasi: {
        select: {
          nama_lokasi: true,
        },
      },
    },
  });
  return listDP;
};

module.exports = { findAllDetailPengadaan };
