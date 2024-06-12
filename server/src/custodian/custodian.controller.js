const express = require('express')
const { getAllCustodian } = require('./custodian.service')
const { response } = require('../response/response')

const router = express.Router()

router.get('/', async (req,res) =>{
    const data = await getAllCustodian()
    response(200, data, "Berhasil Mengambil data", res)
})

module.exports = router