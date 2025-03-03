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
      Detail_Pengadaan: {
        include: {
          barang: true,
          lokasi: true,
          user: true,
        },
      },
    },
  });
  return pengadaan;
};

const insertPengadaan = async (newPengadaanData) => {
  if (
    !newPengadaanData.detail_barang ||
    newPengadaanData.detail_barang.length === 0
  ) {
    throw new Error('Detail barang tidak boleh kosong');
  }

  const pengadaan = await prisma.pengadaan.create({
    data: {
      no_pengajuan: newPengadaanData.no_pengajuan,
      nomor_pengadaan: newPengadaanData.nomor_pengadaan,
      nama_vendor: newPengadaanData.nama_vendor,
      tanggal_penerimaan: new Date(newPengadaanData.tanggal_penerimaan),
      dokumen_pengadaan: newPengadaanData?.dokumen_pengadaan,
      Detail_Pengadaan: {
        createMany: {
          data: newPengadaanData.detail_barang.map((item) => ({
            id: `${newPengadaanData.nomor_pengadaan}.${item.kode_barang}.${item.kode_aset}`,
            kode_barang: item.kode_barang,
            id_lokasi: Number(item.id_lokasi),
            nip_penanggung_jawab: item.nip_penanggung_jawab,
            kode_aset: item.kode_aset,
            harga_satuan: Number(item.harga_satuan),
            merk: item.merk,
            ukuran: item.ukuran,
            umur_ekonomis: Number(item.umur_ekonomis),
          })),
        },
      },
    },
    include: {
      Detail_Pengadaan: true,
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
