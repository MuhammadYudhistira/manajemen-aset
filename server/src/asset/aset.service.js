const { deleteImage } = require("../middleware/uploadGambar");
const { getDetailUser } = require("../user/user.service");
const {
  findAssets,
  findAssetsById,
  insertAsset,
  deleteAsset,
  editAsset,
  countAssetStatus,
  countAsset,
  findAssetsByUser,
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
  const oldData = await getAssetByid(id);
  if (newAssetData.harga_satuan && newAssetData.jumlah_barang) {
    newAssetData.harga_satuan = parseInt(newAssetData.harga_satuan);
    newAssetData.jumlah_barang = parseInt(newAssetData.jumlah_barang);
    newAssetData.nilai_perolehan = parseInt(
      newAssetData.jumlah_barang * newAssetData.harga_satuan
    );
  }

  if (newAssetData.image.length >= 1) {
    newAssetData.image = newAssetData.image[0];
    const url = oldData.image;
    const path = new URL(url).pathname;
    const results = decodeURIComponent(path.replace("/manajemen-aset/", ""));
    console.log(results);
    deleteImage(results)
      .then(async (result) => {
        if (result.success) {
          console.log(`File berhasil dihapus`);
        } else {
          console.error(`Gagal menghapus file, sebab: ${result}`);
        }
      })
      .catch((error) => {
        console.error(`Gagal menghapus file, sebab: ${error.message}`);
      });
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
  const damaged = await countAssetStatus("Damaged");
  const inactive = await countAssetStatus([
    "Inactive",
    "Request_Deletion",
    "Deletion_Accepted",
  ]);

  const count = {
    all,
    available,
    damaged,
    inactive,
  };
  return count;
};

const getAssetByUser = async (id) => {
  await getDetailUser(id);
  const asset = await findAssetsByUser(id);
  return asset;
};

module.exports = {
  getAllAssets,
  getAssetByid,
  getAssetByUser,
  createAsset,
  editAsetById,
  deleteAssetById,
  countAset,
};
