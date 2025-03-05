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

const findDetailPengadaanById = async (id) => {
  const detailPengadaan = await prisma.detail_Pengadaan.findUnique({
    where: {
      id: id,
    },
    include: {
      user: {
        select: {
          nama: true,
          nip: true,
          image: true,
          alamat: true,
          no_hp: true,
        },
      },
      barang: {
        select: {
          kode_barang: true,
          nama_barang: true,
          jenis_barang: true,
          image: true,
        },
      },
      lokasi: {
        select: {
          nama_lokasi: true,
        },
      },
      Aset_Kendaraan: true,
      Detail_Aset_Images: true,
      Laporan_Kerusakan: {
        include: {
          Perbaikan: true,
        },
      },
      pengadaan: true,
    },
  });
  return detailPengadaan;
};

const editStatusDetailPengadaan = async (id, status, keterangan) => {
  const detailPengadaan = await prisma.detail_Pengadaan.update({
    where: {
      id: id,
    },
    data: {
      status: status,
      keterangan: keterangan,
    },
  });
  return detailPengadaan;
};

const editDetailPengadaan = async (id, data) => {
  const detail_Pengadaan = await prisma.detail_Pengadaan.update({
    where: { id },
    data: {
      id_lokasi: parseInt(data.id_lokasi),
      merk: data.merk,
      ukuran: data.ukuran,
      Aset_Kendaraan: {
        upsert: {
          create: {
            nomor_bpkb: data.nomor_bpkb,
            nomor_polisi: data.nomor_polisi,
            nomor_mesin: data.nomor_mesin,
            nomor_rangka: data.nomor_rangka,
          },
          update: {
            nomor_bpkb: data.nomor_bpkb,
            nomor_polisi: data.nomor_polisi,
            nomor_mesin: data.nomor_mesin,
            nomor_rangka: data.nomor_rangka,
          },
        },
      },
    },
  });

  return detail_Pengadaan;
};

const deleteDetailPengadaanById = async (id) => {
  const detailPengadaan = await prisma.detail_Pengadaan.delete({
    where: {
      id: id,
    },
  });
  return detailPengadaan;
};

module.exports = {
  findAllDetailPengadaan,
  findDetailPengadaanById,
  editStatusDetailPengadaan,
  editDetailPengadaan,
  deleteDetailPengadaanById,
};
