const prisma = require('../../db/index');

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
      Laporan_Kerusakan: {
        include: {
          Perbaikan: true,
        },
      },
      // Perbaikan: {
      //   select: {
      //     id: true,
      //     hal: true,
      //     createdAt: true,
      //   },
      // },
    },
  });
  const result = {
    ...detailAset,
    Penanggung_Jawab: detailAset.Penanggung_Jawab.map((pj) => pj.user),
  };

  return result;
};

const findDetailAsetByStatusNotInactive = async () => {
  const detailAset = await prisma.detail_Aset.findMany({
    where: {
      status: {
        notIn: ['Inactive', 'Deletion_Accepted'],
      },
    },
    orderBy: {
      kode_detail: 'asc',
    },
    include: {
      aset: {
        select: {
          nama_barang: true,
          jenis_barang: true,
          kode_barang: true,
        },
      },
    },
  });
  return detailAset;
};

const findDetailAsetByKodeDetail = async (kode_detail) => {
  const detail_Aset = await prisma.detail_Aset.findUnique({
    where: {
      kode_detail: kode_detail,
    },
    include: {
      Penanggung_Jawab: {
        select: {
          id_user: true,
        },
      },
      Aset_Kendaraan: true,
      Laporan_Kerusakan: {
        include: {
          Perbaikan: true,
        },
      },
      lokasi: {
        select: {
          nama_lokasi: true,
        },
      },
      Detail_Aset_Images: {
        select: {
          link: true,
        },
      },
    },
  });
  return detail_Aset;
};

const findDetailAsetByKodeBarang = async (kode_barang) => {
  return await prisma.detail_Aset.findMany({
    where: {
      kode_barang: kode_barang,
    },
    orderBy: {
      kode_detail: 'asc',
    },
  });
};

const searchDetailAset = async (search) => {
  const detailAset = await prisma.detail_Aset.findMany({
    where: {
      OR: [
        {
          kode_detail: {
            contains: search,
          },
        },
        {
          aset: {
            nama_barang: {
              contains: search,
            },
          },
        },
      ],
    },
    select: {
      kode_detail: true,
      merk: true,
      aset: {
        select: {
          nama_barang: true,
        },
      },
      Detail_Aset_Images: {
        select: {
          link: true,
        },
      },
    },
  });

  return detailAset;
};

const insertDetailAset = async (newDetailAsetData) => {
  const detailAset = prisma.detail_Aset.create({
    data: {
      kode_detail: newDetailAsetData.kode_detail,
      kode_barang: newDetailAsetData.kode_barang,
      nomor_pengadaan: newDetailAsetData.nomor_pengadaan,
      id_lokasi: newDetailAsetData.id_lokasi,
      merk: newDetailAsetData.merk,
      ukuran: newDetailAsetData.ukuran,
      harga_satuan: newDetailAsetData.harga_satuan,
      tahun_perolehan: newDetailAsetData.tahun_perolehan,
      status: newDetailAsetData.status,
      keterangan: newDetailAsetData.keterangan,
    },
  });

  return detailAset;
};

const editDetailAsetByKodeDetail = async (kode_detail, newDetailAsetData) => {
  const detailAset = prisma.detail_Aset.update({
    where: {
      kode_detail: kode_detail,
    },
    data: {
      kode_detail: newDetailAsetData.kode_detail,
      kode_barang: newDetailAsetData.kode_barang,
      nomor_pengadaan: newDetailAsetData.nomor_pengadaan,
      id_lokasi: newDetailAsetData.id_lokasi,
      merk: newDetailAsetData.merk,
      ukuran: newDetailAsetData.ukuran,
      harga_satuan: newDetailAsetData.harga_satuan,
      tahun_perolehan: newDetailAsetData.tahun_perolehan,
      status: newDetailAsetData.status,
      keterangan: newDetailAsetData.keterangan,
    },
  });

  return detailAset;
};

const updateAssetStatus = async (kode_detail, status, keterangan) => {
  const asset = await prisma.detail_Aset.update({
    where: {
      kode_detail: kode_detail,
    },
    data: {
      status: status,
      keterangan: keterangan,
    },
  });
  return asset;
};

const deleteDetailAsetByKodeDetail = async (kode_detail) => {
  const detailAset = prisma.detail_Aset.delete({
    where: {
      kode_detail: kode_detail,
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
      kode_detail: 'asc',
    },
    include: {
      aset: {
        select: {
          nama_barang: true,
          jenis_barang: true,
        },
      },
      Aset_Kendaraan: {
        select: {
          nomor_bpkb: true,
          nomor_mesin: true,
          nomor_polisi: true,
          nomor_rangka: true,
        },
      },
      lokasi: {
        select: {
          nama_lokasi: true,
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

const findDetailAsetImageByIdDetailAset = async (kode_detail) => {
  const DAImage = prisma.detail_Aset_Images.findMany({
    where: {
      kode_detail: kode_detail,
    },
  });
  return DAImage;
};

module.exports = {
  findDetailAset,
  findDetailAsetById,
  insertDetailAset,
  editDetailAsetByKodeDetail,
  deleteDetailAsetByKodeDetail,
  findDetailAsetByKodeDetail,
  insertDetailAsetImage,
  findAllDetailAset,
  deleteDetailAsetImageById,
  findDetailAsetImageById,
  findDetailAsetImageByIdDetailAset,
  updateAssetStatus,
  findDetailAsetByStatusNotInactive,
  searchDetailAset,
  findDetailAsetByKodeBarang,
};
