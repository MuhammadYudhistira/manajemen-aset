const prisma = require("../../db/index");

const findDetailAset = async (id) => {
  const detailAset = await prisma.detail_Aset.findMany({
    where: {
      id_aset: id,
    },
    include: {
      aset: {
        select: {
          nama_barang: true,
          merk: true,
          tahun_perolehan: true,
          ukuran: true,
          harga_satuan: true,
        },
      },
      ruangan: {
        select: {
          nama_ruangan: true,
        },
      },
      Penanggung_Jawab: {
        select: {
          user: {
            select: {
              nama: true,
            },
          },
        },
      },
    },
  });
  return detailAset;
};

const findDetailAsetById = async (idDetail) => {
  const detailAset = await prisma.detail_Aset.findUnique({
    where: {
      id: idDetail,
    },
    include: {
      aset: {
        select: {
          nama_barang: true,
          merk: true,
          tahun_perolehan: true,
          ukuran: true,
          harga_satuan: true,
        },
      },
      ruangan: {
        select: {
          nama_ruangan: true,
        },
      },
      Penanggung_Jawab: {
        select: {
          user: {
            select: {
              nama: true,
              nip: true,
              no_hp: true,
              alamat: true,
              role: true,
            },
          },
        },
      },
    },
  });
  return detailAset;
};

const findDetailAsetByKodeBarang = async (kode_barang) => {
  const detail_Aset = prisma.detail_Aset.count({
    where: {
      kode_barang: kode_barang,
    },
  });
  return detail_Aset;
};

const insertDetailAset = async (newDetailAsetData) => {
  const detailAset = prisma.detail_Aset.create({
    data: {
      kode_barang: newDetailAsetData.kode_barang,
      nomor_rangka: newDetailAsetData.nomor_rangka,
      nomor_bpkb: newDetailAsetData.nomor_bpkb,
      nomor_mesin: newDetailAsetData.nomor_mesin,
      nomor_polisi: newDetailAsetData.nomor_polisi,
      id_aset: newDetailAsetData.id_aset,
      id_ruangan: newDetailAsetData.id_ruangan,
    },
  });

  return detailAset;
};

const editDetailAsetById = async (id, newDetailAsetData) => {
  const detailAset = prisma.detail_Aset.update({
    where: {
      id: id,
    },
    data: {
      kode_barang: newDetailAsetData.kode_barang,
      nomor_rangka: newDetailAsetData.nomor_rangka,
      nomor_bpkb: newDetailAsetData.nomor_bpkb,
      nomor_mesin: newDetailAsetData.nomor_mesin,
      nomor_polisi: newDetailAsetData.nomor_polisi,
      id_aset: newDetailAsetData.id_aset,
      id_ruangan: newDetailAsetData.id_ruangan,
    },
  });

  return detailAset;
};

const deleteDetailAsetById = async (id) => {
  const detailAset = prisma.detail_Aset.delete({
    where: {
      id: id,
    },
  });

  return detailAset;
};

module.exports = {
  findDetailAset,
  findDetailAsetById,
  insertDetailAset,
  editDetailAsetById,
  deleteDetailAsetById,
  findDetailAsetByKodeBarang,
};
