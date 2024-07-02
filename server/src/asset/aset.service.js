const { deleteImage } = require("../middleware/uploadGambar");
const {
  findAssets,
  findAssetsById,
  insertAsset,
  deleteAsset,
  editAsset,
  countAssetStatus,
  countAsset,
} = require("./aset.repository");

const getAllAssets = async () => {
  const assets = await findAssets();
  assets.map((asset) => {
    !asset.image
      ? (asset.image = null)
      : (asset.image = `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${asset.image}`);
  });
  return assets;
};

const getAssetByid = async (id) => {
  const asset = await findAssetsById(id);
  if (!asset) throw new Error("Aset tidak ditemukan");
  !asset.image
    ? (asset.image = null)
    : (asset.image = `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${asset.image}`);
  return asset;
};

const createAsset = async (newAssetData) => {
  newAssetData.harga_satuan = parseInt(newAssetData.harga_satuan);
  newAssetData.jumlah_barang = parseInt(newAssetData.jumlah_barang);
  newAssetData.nilai_perolehan = parseInt(
    newAssetData.jumlah_barang * newAssetData.harga_satuan
  );
  if (newAssetData.image.length >= 1) {
    newAssetData.image = newAssetData.image[0];
  } else {
    newAssetData.image = null;
  }

  newAssetData.tahun_perolehan = new Date(newAssetData.tahun_perolehan);
  const asset = await insertAsset(newAssetData);
  return asset;
};

const editAsetById = async (id, newAssetData) => {
  await getAssetByid(id);
  if (newAssetData.harga_satuan && newAssetData.jumlah_barang) {
    newAssetData.harga_satuan = parseInt(newAssetData.harga_satuan);
    newAssetData.jumlah_barang = parseInt(newAssetData.jumlah_barang);
    newAssetData.nilai_perolehan = parseInt(
      newAssetData.jumlah_barang * newAssetData.harga_satuan
    );
  }

  if (newAssetData.image.length >= 1) {
    newAssetData.image = newAssetData.image[0];
  } else {
    newAssetData.image = undefined;
  }

  if (newAssetData.tahun_perolehan) {
    newAssetData.tahun_perolehan = new Date(newAssetData.tahun_perolehan);
  }

  const asset = await editAsset(id, newAssetData);
  return asset;
};

const deleteAssetById = async (id) => {
  await getAssetByid(id);
  const asset = await deleteAsset(id);
  return asset;
};

const countAset = async () => {
  const all = await countAsset();
  const available = await countAssetStatus("Available");
  const inactive = await countAssetStatus("Inactive");
  const repairing = await countAssetStatus("Under_Maintenance");

  const count = {
    all,
    available,
    inactive,
    repairing,
  };
  return count;
};

module.exports = {
  getAllAssets,
  getAssetByid,
  createAsset,
  editAsetById,
  deleteAssetById,
  countAset,
};
