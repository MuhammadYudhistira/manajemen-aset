const prisma = require('../../db/index')

const findAllDamage = async () => {
    const damage = await prisma.laporan_Kerusakan.findMany()
    return damage 
}

const findDamageById = async (id) => {
    const damage = await prisma.laporan_Kerusakan.findUnique({
        where: {
            id: id
        }
    })
    return damage
}

module.exports= { findAllDamage, findDamageById}