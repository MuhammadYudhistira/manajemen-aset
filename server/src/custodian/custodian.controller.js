const express = require('express')
const { getAllCustodian, getDetailCustodian, createCustodian, updateCustodian, deleteCustodian } = require('./custodian.service')
const { response } = require('../response/response')
const { responseError } = require('../response/responseError')

const router = express.Router()

router.get('/', async (req,res) =>{
    const data = await getAllCustodian()
    response(200, data, "Berhasil Mengambil data", res)
})

router.get('/:id', async (req,res) =>{
    const {id} = req.params
    const data = await getDetailCustodian(id)
    response(200, data, "berhasil mengambil data", res)
})

router.post("/", async (req,res) => {
    try {
        
        const data = req.body
        const custodian = await createCustodian(data)
        response(200, custodian, "berhasil menambahkan data penanggung jawab", res)
    } catch (error) {
        responseError(500, error.message, res)
    }
})

router.patch("/:id", async (req,res) =>{
    try {
        const {id} = req.params
        const data = req.body
        const custodian = await updateCustodian(id, data)
        response(200, custodian, "Berhasil mengupdate data penanggung jawab", res)
    } catch (error) {
        responseError(500, error.message, res)
    }
})

router.delete("/:id", async (req,res) =>{
    try {
        const {id} = req.params
        await deleteCustodian(id)
        response(200, null, "Berhasil mengahpus data penanggung jawab", res)
    } catch (error) {
        responseError(500, error.message, res)
    }
})


module.exports = router