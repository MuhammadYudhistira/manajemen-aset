const { findAllDetailPengadaan } = require("./dp.repository")

const getListDP = async () =>{
  const list = await findAllDetailPengadaan()
  return list
}

module.exports = { getListDP }