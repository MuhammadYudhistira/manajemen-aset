const prisma = require('../../db/index')

const findDetailAset = async () =>{
    const detail_aset = prisma.detail_Aset.findMany()
    return detail_aset
}

const findDetailAsetById = async (id) =>{
    const detail_Aset = prisma.detail_Aset.findUnique({
        where:{
            id: id
        }
    })
    return detail_Aset
}

const createDetailAset = async (newDetailAsetData) =>{
    const detail_Aset = prisma.detail_Aset.create({
        data: {
            nomor_barang: newDetailAsetData.nomor_barang,
            nomor_rangka: newDetailAsetData.nomor_rangka,
            nomor_bpkb: newDetailAsetData.nomor_bpkb,
            nomor_mesin: newDetailAsetData.nomor_mesin,
            nomor_polisi: newDetailAsetData.nomor_polisi,
            id_aset: newDetailAsetData.id_aset,
            id_ruangan: newDetailAsetData.id_ruangan
        }
    })

    return detail_Aset
}

const editDetailAset = async (id, newDetailAsetData) =>{
    const detail_Aset = prisma.detail_Aset.update({
        where:{
            id: id
        },
        data: {
            nomor_barang: newDetailAsetData.nomor_barang,
            nomor_rangka: newDetailAsetData.nomor_rangka,
            nomor_bpkb: newDetailAsetData.nomor_bpkb,
            nomor_mesin: newDetailAsetData.nomor_mesin,
            nomor_polisi: newDetailAsetData.nomor_polisi,
            id_aset: newDetailAsetData.id_aset,
            id_ruangan: newDetailAsetData.id_ruangan
        }
    })

    return detail_Aset
}

const deleteDetailAset = async(id)=>{
    const detail_Aset = prisma.detail_Aset.delete({
        where:{
            id:id
        }
    })

    return detail_Aset
}

module.exports = {findDetailAset, findDetailAsetById, createDetailAset, editDetailAset, deleteDetailAset}