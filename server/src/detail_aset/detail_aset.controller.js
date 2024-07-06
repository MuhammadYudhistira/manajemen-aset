const { response } = require("../response/response");
const { responseError } = require("../response/responseError");
const {
  getAllDetailAset,
  getDetailAset,
  createDetailAset,
  editDetailAset,
  deleteDetailAset,
  listDetailAset,
} = require("./detail_aset.service");

const getListDetailAset = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getAllDetailAset(id);
    response(200, data, "berhasil mendapatkan data", res);
  } catch (error) {
    responseError(500, error.message, res);
  }
};

const getDetailDetailAset = async (req, res) => {
  try {
    const { idDetail } = req.params;
    const data = await getDetailAset(idDetail);
    response(200, data, "Berhasil mendapatkan data", res);
  } catch (error) {
    responseError(404, error.message, res);
  }
};

const postDetailAset = async (req, res) => {
  try {
    const data = req.body;
    console.log("🚀 ~ postDetailAset ~ data:", data);

    const detailAsset = await createDetailAset(data);
    response(200, detailAsset, "Berhasil Menambahkan Data Detail Aset", res);
  } catch (error) {
    console.log(error);
    responseError(400, error.message, res);
  }
};

const updateDetailAset = async (req, res) => {
  try {
    const { idDetail } = req.params;
    const data = req.body;
    data.id = idDetail;
    const detailAset = await editDetailAset(idDetail, data);
    response(200, detailAset, "Berhasil merubah data", res);
  } catch (error) {
    console.error("Error in updateDetailAset:", error);
    responseError(400, error.message, res);
  }
};

const removeDetailAset = async (req, res) => {
  try {
    const { idDetail } = req.params;
    await deleteDetailAset(idDetail);
    response(200, null, "Berhasil menghapus data", res);
  } catch (error) {
    responseError(400, error.message, res);
  }
};

const getAllListDetailAset = async (req, res) => {
  try {
    const data = await listDetailAset();
    response(200, data, "Berhasil mengambil data", res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
};

module.exports = {
  getListDetailAset,
  getDetailDetailAset,
  postDetailAset,
  updateDetailAset,
  removeDetailAset,
  getAllListDetailAset,
};
