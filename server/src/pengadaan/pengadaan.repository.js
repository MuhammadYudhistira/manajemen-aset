const prisma = require('../../db/index');
const {
  findDetailPengadaanByKodeBarang,
} = require('../detail_pengadaan/dp.repository');

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

const getLastPengadaan = async () => {
  return await prisma.pengadaan.findFirst({
    orderBy: { nomor_pengadaan: 'desc' },
  });
};

const insertPengadaan = async (newPengadaanData) => {
  if (
    !newPengadaanData.detail_barang ||
    newPengadaanData.detail_barang.length === 0
  ) {
    throw new Error('Detail barang tidak boleh kosong');
  }

  const generateKodeAsetBatch = async (kode_barang, jumlah) => {
    const details = await findDetailPengadaanByKodeBarang(kode_barang);
    const existingKodeAset = new Set(details.map((d) => d.kode_aset));

    let newKodeAsetList = [];
    let counter = 1;

    while (newKodeAsetList.length < jumlah) {
      const newKodeAset = `${String(counter).padStart(3, '0')}`;
      if (!existingKodeAset.has(newKodeAset)) {
        newKodeAsetList.push(newKodeAset);
      }
      counter++;
    }

    return newKodeAsetList;
  };

  const detailBarangWithKodeAset = await Promise.all(
    newPengadaanData.detail_barang.flatMap(async (item) => {
      const jumlah = Number(item.jumlah_barang);
      const kode_aset_list = await generateKodeAsetBatch(
        item.kode_barang,
        jumlah
      );

      return kode_aset_list.map((kode_aset) => ({
        id: `${newPengadaanData.nomor_pengadaan}.${item.kode_barang}.${kode_aset}`,
        kode_barang: item.kode_barang,
        id_lokasi: Number(item.id_lokasi),
        nip_penanggung_jawab: item.nip_penanggung_jawab,
        kode_aset,
        harga_satuan: Number(item.harga_satuan),
        merk: item.merk,
        ukuran: item.ukuran,
        umur_ekonomis: Number(item.umur_ekonomis),
      }));
    })
  ).then((result) => result.flat());

  const pengadaan = await prisma.pengadaan.create({
    data: {
      no_pengajuan: newPengadaanData.no_pengajuan,
      nomor_pengadaan: newPengadaanData.nomor_pengadaan,
      nama_vendor: newPengadaanData.nama_vendor,
      tanggal_penerimaan: new Date(newPengadaanData.tanggal_penerimaan),
      dokumen_pengadaan: newPengadaanData?.dokumen_pengadaan,
      Detail_Pengadaan: {
        createMany: {
          data: detailBarangWithKodeAset,
        },
      },
    },
    include: {
      Detail_Pengadaan: true,
    },
  });

  await prisma.pengajuan.update({
    where: { no_pengajuan: newPengadaanData.no_pengajuan },
    data: { status: 'Completed' },
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
  getLastPengadaan,
};
