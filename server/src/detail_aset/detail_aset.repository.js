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
      Detail_Aset_Images: {
        select: {
          link: true,
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
              image: true,
            },
          },
        },
      },
    },
  });

  const result = detailAset.map((detail) => ({
    ...detail,
    Penanggung_Jawab: detail.Penanggung_Jawab.map((pj) => pj.user),
  }));

  return result;
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
      Detail_Aset_Images: {
        select: {
          id: true,
          link: true,
        },
      },
      ruangan: {
        select: {
          id: true,
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
              image: true,
            },
          },
        },
      },
    },
  });
  const result = {
    ...detailAset,
    Penanggung_Jawab: detailAset.Penanggung_Jawab.map((pj) => pj.user),
  };

  return result;
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
      keterangan: newDetailAsetData.keterangan,
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
      keterangan: newDetailAsetData.keterangan,
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

const insertDetailAsetImage = async (data) => {
  const DAImage = prisma.detail_Aset_Images.createMany({
    data,
  });

  return DAImage;
};

const findAllDetailAset = async () => {
  const detailAset = await prisma.detail_Aset.findMany({
    orderBy: {
      kode_barang: "asc",
    },
    include: {
      aset: {
        select: {
          nama_barang: true,
        },
      },
    },
  });

  return detailAset;
};

const deleteDetailAsetImageById = async (id) => {
  const DAImage = prisma.detail_Aset_Images.delete({
    where: {
      id: id,
    },
  });

  return DAImage;
};

const findDetailAsetImageById = async (id) => {
  const DAImage = prisma.detail_Aset_Images.findFirst({
    where: {
      id: id,
    },
  });
  return DAImage;
};

module.exports = {
  findDetailAset,
  findDetailAsetById,
  insertDetailAset,
  editDetailAsetById,
  deleteDetailAsetById,
  findDetailAsetByKodeBarang,
  insertDetailAsetImage,
  findAllDetailAset,
  deleteDetailAsetImageById,
  findDetailAsetImageById,
};
