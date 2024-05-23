const { findAssets, findAssetsById } = require("./aset.repository");

const getAllAssets = async () => {
  const assets = await findAssets();
  return assets;
};

const getAssetByid = async (id) => {
  const assets = await findAssetsById(id);
  return assets;
};

module.exports = { getAllAssets, getAssetByid };
