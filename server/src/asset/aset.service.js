const { findAssets } = require("./aset.repository");

const getAllAssets = async () => {
  const assets = await findAssets();
  return assets;
};

module.exports = { getAllAssets };
