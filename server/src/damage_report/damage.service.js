const { findAllDamage, findDamageById, insertDamage, editDamegeById, deleteDamageById } = require("./damage.repository")

const getAllDamage = async () => {
    const damage = await findAllDamage()
    return damage
}

const getDetailDamage = async (id) =>{
    const damage = await findDamageById(id)
    if(!damage) throw new Error ("Laporan Kerusakan tidak ditemukan")
    return damage
}

const createDemage = async(newDamageData) => {
    const damage = await insertDamage(newDamageData)
    return damage
}

const editDamage = async (id, newDamageData) =>{
    await getDetailDamage(id)
    const damage = await editDamegeById(id, newDamageData)
    return damage
}

const deleteDamage = async (id) => {
    const damage = await deleteDamageById(id)
    return damage
}

module.exports = {getAllDamage, getDetailDamage, createDemage, editDamage, deleteDamage}

