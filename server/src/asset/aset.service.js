const { deleteImage } = require('../middleware/uploadGambar');
const { getDetailUser } = require('../user/user.service');
const {
  findAssets,
  insertAsset,
  deleteAsset,
  editAsset,
  countAssetStatus,
  countAsset,
  findAssetsByUser,
  findAssetsByCode,
} = require('./aset.repository');

const getAllAssets = async () => {
  const assets = await findAssets();
  assets.map((asset) => {
    !asset.image
      ? (asset.image = null)
      : (asset.image = `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${asset.image}`);
  });
  return assets;
};

const getAssetByCode = async (code) => {
  const asset = await findAssetsByCode(code);
  if (!asset) throw new Error('Aset tidak ditemukan');
  !asset.image
    ? (asset.image = null)
    : (asset.image = `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${asset.image}`);
  return asset;
};

const createAsset = async (newAssetData) => {
  const haveCode = await findAssetsByCode(newAssetData.kode_barang);

  if (haveCode) throw new Error('Kode Barang sudah ada');
  // newAssetData.harga_satuan = parseInt(newAssetData.harga_satuan);
  // newAssetData.jumlah_barang = parseInt(newAssetData.jumlah_barang);
  // newAssetData.nilai_perolehan = parseInt(
  //   newAssetData.jumlah_barang * newAssetData.harga_satuan
  // );

  // newAssetData.tahun_perolehan = new Date(newAssetData.tahun_perolehan);
  if (newAssetData.image.length >= 1) {
    newAssetData.image = newAssetData.image[0];
  } else {
    newAssetData.image = null;
  }
  try {
    const asset = await insertAsset(newAssetData);
    return asset;
  } catch (error) {
    // Log error type and details
    console.log(error);
    console.error('Error type:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    if (error?.meta?.target === 'asets_nama_barang_key')
      throw new Error('Nama barang sudah ada');
    if (
      newAssetData.jenis_barang !== 'Peralatan' &&
      newAssetData.jenis_barang !== 'Kendaraan'
    )
      throw new Error('Jenis barang tidak valid');
  }
};

const editAsetByCode = async (code, newAssetData) => {
  const oldData = await getAssetByCode(code);
  // if (newAssetData.harga_satuan && newAssetData.jumlah_barang) {
  //   newAssetData.harga_satuan = parseInt(newAssetData.harga_satuan);
  //   newAssetData.jumlah_barang = parseInt(newAssetData.jumlah_barang);
  //   newAssetData.nilai_perolehan = parseInt(
  //     newAssetData.jumlah_barang * newAssetData.harga_satuan
  //   );
  // }

  // if (newAssetData.tahun_perolehan) {
  //   newAssetData.tahun_perolehan = new Date(newAssetData.tahun_perolehan);
  // }

  if (newAssetData.kode_barang !== oldData.kode_barang) {
    const haveCode = await findAssetsByCode(newAssetData.kode_barang);
    if (haveCode) throw new Error('Kode Barang sudah ada');
  }

  if (newAssetData.image.length >= 1) {
    newAssetData.image = newAssetData.image[0];
    if (oldData.image !== null) {
      const url = oldData.image;
      const path = new URL(url).pathname;
      const results = decodeURIComponent(path.replace('/manajemen-aset/', ''));
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
    }
  } else {
    newAssetData.image = undefined;
  }

  try {
    const asset = await editAsset(code, newAssetData);
    console.log('🚀 ~ editAsetByCode ~ newAssetData:', newAssetData);
    return asset;
  } catch (error) {
    // Log error type and details
    console.log(error);
    if (error?.meta?.target === 'asets_nama_barang_key')
      throw new Error('Nama barang sudah ada');
    if (
      newAssetData.jenis_barang !== 'Peralatan' &&
      newAssetData.jenis_barang !== 'Kendaraan'
    )
      throw new Error('Jenis barang tidak valid');
  }
};

const deleteAssetByCode = async (code) => {
  await getAssetByCode(code);
  const asset = await deleteAsset(code);
  return asset;
};

const countAset = async () => {
  const all = await countAsset();
  const available = await countAssetStatus('Available');
  const damaged = await countAssetStatus('Damaged');
  const inactive = await countAssetStatus([
    'Inactive',
    'Request_Deletion',
    'Deletion_Accepted',
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
  getAssetByCode,
  getAssetByUser,
  createAsset,
  editAsetByCode,
  deleteAssetByCode,
  countAset,
};
