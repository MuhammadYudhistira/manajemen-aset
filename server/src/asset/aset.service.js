const {
  findAssets,
  findAssetsById,
  insertAsset,
  deleteAsset,
  editAsset,
} = require("./aset.repository");

const getAllAssets = async () => {
  const assets = await findAssets();
  return assets;
};

const getAssetByid = async (id) => {
  const assets = await findAssetsById(id);
  if (!assets) throw new Error("Aset tidak ditemukan");
  return assets;
};

const createAsset = async (newAssetData) => {
  newAssetData.harga_satuan = parseInt(newAssetData.harga_satuan);
  newAssetData.jumlah_barang = parseInt(newAssetData.jumlah_barang);
  newAssetData.nilai_perolehan = parseInt(
    newAssetData.jumlah_barang * newAssetData.harga_satuan
  );
  newAssetData.image = newAssetData.image[0];

  newAssetData.tahun_perolehan = new Date(newAssetData.tahun_perolehan);
  const asset = await insertAsset(newAssetData);
  return asset;
};

const editAsetById = async (id, newAssetData) => {
  await getAssetByid(id);
  const asset = await editAsset(id, newAssetData);
  return asset;
};

const deleteAssetById = async (id) => {
  await getAssetByid(id);
  const asset = await deleteAsset(id);
  return asset;
};

module.exports = {
  getAllAssets,
  getAssetByid,
  createAsset,
  editAsetById,
  deleteAssetById,
};
