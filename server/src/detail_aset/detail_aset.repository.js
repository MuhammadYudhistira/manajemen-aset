const prisma = require('../../db/index')

const findDetailAset = async (id) =>{
    const detailAset = prisma.detail_Aset.findMany({
        where:{
            id_aset: id
        },
        include : {
            aset:{
                select: {
                    nama_barang: true,
                    merk:true,
                    tahun_perolehan:true,
                    ukuran:true,
                    harga_satuan: true,
                }
            },
            ruangan: {
                select: {
                    nama_ruangan: true
                }
            }
        },
    })
    return detailAset
}

const findDetailAsetById = async (id) =>{
    const detailAset = prisma.detail_Aset.findUnique({
        where:{
            id: id
        }
    })
    return detailAset
}

const insertDetailAset = async (newDetailAsetData) =>{
    const detailAset = prisma.detail_Aset.create({
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

    return detailAset
}

const editDetailAsetById = async (id, newDetailAsetData) =>{
    const detailAset = prisma.detail_Aset.update({
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

    return detailAset
}

const deleteDetailAsetById = async(id)=>{
    const detailAset = prisma.detail_Aset.delete({
        where:{
            id:id
        }
    })

    return detailAset
}

module.exports = {findDetailAset, findDetailAsetById, insertDetailAset, editDetailAsetById, deleteDetailAsetById}