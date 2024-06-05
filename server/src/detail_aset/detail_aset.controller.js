const { getAllDetailAset, getDetailAset } = require("./detail_aset.service");

const getListDetailAset = async (req, res) => {
  const { id } = req.params;
  const data = await getAllDetailAset(id);
  res.json({
    data,
  });
};

const getDetailDetailAset = async (req, res) => {
  const { idDetail } = req.params;
  const data = await getDetailAset(idDetail)
  res.json({
    data
  })
};

module.exports = { getListDetailAset, getDetailDetailAset };
