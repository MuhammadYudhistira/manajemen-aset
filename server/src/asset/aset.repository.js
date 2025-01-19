const prisma = require('../../db/index');

const findAssets = async () => {
  const assets = await prisma.aset.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      Detail_Aset: {
        include: {
          lokasi: true,
        },
      },
    },
  });
  return assets;
};

const findAssetsByCode = async (code) => {
  const asset = await prisma.aset.findUnique({
    where: {
      kode_barang: code,
    },
    include: {
      Detail_Aset: {
        include: {
          lokasi: {
            select: {
              nama_lokasi: true,
            },
          },
          Penanggung_Jawab: {
            select: {
              user: true,
            },
          },
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

const findAssetsByUser = async (id) => {
  const assets = await prisma.detail_Aset.findMany({
    where: {
      Penanggung_Jawab: {
        some: {
          id_user: id,
        },
      },
      status: {
        notIn: ['Inactive', 'Deletion_Accepted'],
      },
    },
    select: {
      id: true,
      kode_barang: true,
      keterangan: true,
      createdAt: true,
      status: true,
      aset: {
        select: {
          nama_barang: true,
          deskripsi: true,
          ukuran: true,
        },
      },
      Detail_Aset_Images: {
        select: {
          link: true,
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
  const asset = await prisma.aset.create({
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
  const asset = await prisma.aset.delete({
    where: {
      kode_barang: code,
    },
  });

  return asset;
};

const editAsset = async (code, assetData) => {
  const asset = await prisma.aset.update({
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
  const assets = await prisma.detail_Aset.count();
  return assets;
};

const countAssetStatus = async (status) => {
  const assets = await prisma.detail_Aset.count({
    where: {
      status: Array.isArray(status) ? { in: status } : status,
    },
  });
  return assets;
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
