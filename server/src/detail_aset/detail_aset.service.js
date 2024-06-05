const { findDetailAset, findDetailAsetById, insertDetailAset, editDetailAsetById, deleteDetailAsetById } = require("./detail_aset.repository")

const getAllDetailAset = async (id) =>{
    const listDetailAset = await findDetailAset(id)
    return listDetailAset
}

const getDetailAset = async (id) =>{
    const detailAset = await findDetailAsetById(id)
    if(!detailAset) throw new Error("Detail Aset tidak ditemukan")
    return detailAset
}

const createDetailAset = async (newDetailAsetData) =>{
    const detailAset = await insertDetailAset(newDetailAsetData)
    return detailAset
}

const editDetailAset = async (id, newDetailAsetData) =>{
    await getDetailAset(id)
    const detailAset = await editDetailAsetById(newDetailAsetData)
    return detailAset
}

const deleteDetailAset = async (id) =>{
    await getDetailAset(id)
    const detailAset = await deleteDetailAsetById(id)
    return detailAset
}

module.exports = {getAllDetailAset, getDetailAset, createDetailAset, editDetailAset, deleteDetailAset}

