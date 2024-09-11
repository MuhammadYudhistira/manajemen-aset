const prisma = require("../../db/index");

const findAssets = async () => {
  const assets = await prisma.aset.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return assets;
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
    available: assets.filter((asset) => asset.status === "Available").length,
    damaged: assets.filter((asset) => asset.status === "Damaged").length,
    repairing: assets.filter((asset) => asset.status === "Under_Maintenance")
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
      nama_barang: assetData.nama_barang,
      deskripsi: assetData.deskripsi,
      merk: assetData.merk,
      tahun_perolehan: assetData.tahun_perolehan,
      ukuran: assetData.ukuran,
      harga_satuan: assetData.harga_satuan,
      jumlah_barang: assetData.jumlah_barang,
      nilai_perolehan: assetData.nilai_perolehan,
      image: assetData.image,
    },
  });

  return asset;
};

const deleteAsset = async (id) => {
  const asset = await prisma.aset.delete({
    where: {
      id: id,
    },
  });

  return asset;
};

const editAsset = async (id, assetData) => {
  const asset = await prisma.aset.update({
    where: {
      id: id,
    },
    data: {
      nama_barang: assetData.nama_barang,
      deskripsi: assetData.deskripsi,
      merk: assetData.merk,
      tahun_perolehan: assetData.tahun_perolehan,
      ukuran: assetData.ukuran,
      harga_satuan: assetData.harga_satuan,
      jumlah_barang: assetData.jumlah_barang,
      nilai_perolehan: assetData.nilai_perolehan,
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
      status: status,
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
};
