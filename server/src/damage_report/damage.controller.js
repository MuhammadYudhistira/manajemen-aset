const express = require('express')
const { getAllDamage, getDetailDamage } = require('./damage.service')
const { response } = require('../response/response')
const { responseError } = require('../response/responseError')

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

module.exports = router