const prisma = require("../../db/index");

const findAssets = async () => {
  const assets = await prisma.aset.findMany();
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
      merk: assetData.merk,
      tahun_perolehan: assetData.tahun_perolehan,
      ukuran: assetData.ukuran,
      harga_satuan: assetData.harga_satuan,
      jumlah_barang: assetData.jumlah_barang,
      nilai_perolehan: assetData.nilai_perolehan,
    },
  });

  return asset;
};

module.exports = {
  findAssets,
  findAssetsById,
  insertAsset,
  deleteAsset,
  editAsset,
};
