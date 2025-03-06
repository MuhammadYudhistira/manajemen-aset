const prisma = require('../../db/index');

const findAssets = async () => {
  const assets = await prisma.barang.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      Detail_Pengadaan: {
        include: {
          lokasi: {
            select: {
              nama_lokasi: true,
            },
          },
        },
      },
    },
  });

  // Menambahkan jumlah detail aset ke dalam hasil
  return assets.map((asset) => ({
    ...asset,
    jumlahAset: asset.Detail_Pengadaan.length, // Hitung jumlah detail aset
  }));
};

const findAssetsByCode = async (code) => {
  const asset = await prisma.barang.findUnique({
    where: {
      kode_barang: code,
    },
    include: {
      Detail_Pengadaan: {
        orderBy: {
          pengadaan: {
            tanggal_penerimaan: 'desc',
          },
        },
        include: {
          lokasi: {
            select: {
              nama_lokasi: true,
            },
          },
          user: {
            select: {
              nama: true,
            },
          },
          pengadaan: true,
        },
      },
    },
  });
  return asset;
};

const findAssetsById = async (id) => {
  const asset = await prisma.aset.findUnique({
    where: {
      id: id,
    },
    include: {
      Detail_Aset: {
        include: {
          ruangan: {
            select: {
              nama_ruangan: true,
            },
          },
          Penanggung_Jawab: {
            include: {
              user: {
                select: {
                  nama: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return asset;
};

const findAssetsByUser = async (nip) => {
  const assets = await prisma.detail_Pengadaan.findMany({
    where: {
      nip_penanggung_jawab: nip,
      status: {
        notIn: ['Inactive', 'Deletion_Accepted'],
      },
    },
    include: {
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
      user: {
        select: {
          nama: true,
        },
      },
    },
  });

  // Menghitung jumlah aset berdasarkan status
  const count = {
    all: assets.length,
    available: assets.filter((asset) => asset.status === 'Available').length,
    damaged: assets.filter((asset) => asset.status === 'Damaged').length,
    repairing: assets.filter((asset) => asset.status === 'Under_Maintenance')
      .length,
  };

  return {
    count,
    listAssets: assets,
  };
};

const insertAsset = async (assetData) => {
  const asset = await prisma.barang.create({
    data: {
      kode_barang: assetData.kode_barang,
      nama_barang: assetData.nama_barang,
      jenis_barang: assetData.jenis_barang,
      image: assetData.image,
    },
  });

  return asset;
};

const deleteAsset = async (code) => {
  const asset = await prisma.barang.delete({
    where: {
      kode_barang: code,
    },
  });

  return asset;
};

const editAsset = async (code, assetData) => {
  const asset = await prisma.barang.update({
    where: {
      kode_barang: code,
    },
    data: {
      nama_barang: assetData.nama_barang,
      jenis_barang: assetData.jenis_barang,
      kode_barang: assetData.kode_barang,
      image: assetData.image,
    },
  });

  return asset;
};

const countAsset = async () => {
  const count = await prisma.detail_Pengadaan.count();
  return count;
};

const countAssetStatus = async (status) => {
  const countStatus = await prisma.detail_Pengadaan.count({
    where: {
      status: Array.isArray(status) ? { in: status } : status,
    },
  });
  return countStatus;
};

module.exports = {
  findAssets,
  findAssetsById,
  findAssetsByUser,
  insertAsset,
  deleteAsset,
  editAsset,
  countAsset,
  countAssetStatus,
  findAssetsByCode,
};
