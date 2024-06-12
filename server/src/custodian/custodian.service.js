const { findCustodians } = require("./custodian.repository")

const getAllCustodian = async () =>{
    const custodian = await findCustodians()
    return custodian
}


module.exports = {getAllCustodian}