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

const insertDamage = async (newDamageData) => {
    const damage = await prisma.laporan_Kerusakan.create({
        data: {
            id_pelapor: newDamageData.id_pelapor,
            id_detail_aset: newDamageData.id_detail_aset,
            deskripsi: newDamageData.deskripsi,
            bukti_kerusakan: newDamageData.bukti_kerusakan,
        }
    })
    return damage
}

const editDamegeById = async (id, newDamageData) => {
    const damage = await prisma.laporan_Kerusakan.update({
        where: {
            id: id
        }, data: {
            deskripsi: newDamageData.deskripsi,
            bukti_kerusakan: newDamageData.bukti_kerusakan,
            approved_by: newDamageData.approved_by,
            approved_date: newDamageData.approved_date,
            status: newDamageData.status,
            keterangan: newDamageData.keterangan
        }
    })
    return damage
}

const deleteDamageById = async (id) => {
    const damage = await prisma.laporan_Kerusakan.delete({
        where:{
            id: id
        }
    })
    return damage
}

module.exports= { findAllDamage, findDamageById, insertDamage, editDamegeById, deleteDamageById}