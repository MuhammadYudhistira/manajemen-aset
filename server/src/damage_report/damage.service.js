const { findAllDamage, findDamageById } = require("./damage.repository")

const getAllDamage = async () => {
    const damage = await findAllDamage()
    return damage
}

const getDetailDamage = async (id) =>{
    const damage = await findDamageById(id)
    if(!damage) throw new Error ("Laporan Kerusakan tidak ditemukan")
    return damage
}

module.exports = {getAllDamage, getDetailDamage}

