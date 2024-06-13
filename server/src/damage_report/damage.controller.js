const express = require('express')
const { getAllDamage, getDetailDamage, createDemage, deleteDamage, editDamage } = require('./damage.service')
const { response } = require('../response/response')
const { responseError } = require('../response/responseError')
const { editDamegeById } = require('./damage.repository')

const router = express.Router()

router.get("/", async (req,res) => {
    const data = await getAllDamage()
    response(200, data, "Berhasil mendapatkan data laporan kerusakan", res)
})

router.get("/:id", async (req,res) => {
    try {
    const {id} = req.params
    const data = await getDetailDamage(id)
    response(200, data, "Berhasil mendapatkan data", res)
    } catch (error) {
        responseError(404, error.message, res)
    }

})

router.post("/", async (req,res) => {
    try {
        const data = req.body
        const damage = await createDemage(data)
        response(200, damage, "Berhasil menambahkan laporan kerusakan", res)
    } catch (error) {
        responseError(500, error.message, res)
    }
})

router.patch("/:id", async (req,res) => {
    try {
        const {id} = req.params
        const data = req.body
        const damage = await editDamage(id, data)
        response(200, damage, "Berhasil mengupdate data laporan kerusakan", res)
    } catch (error) {
        responseError(500, error.message, res)
    }
})

router.delete("/:id", async (req,res) => {
    try {
        const {id} = req.params
        await deleteDamage(id)
        response(200, null, "Berhasil menghapus data laporan kerusakan", res)
    } catch (error) {
        responseError(500, error.message, res)
    }   
})



module.exports = router