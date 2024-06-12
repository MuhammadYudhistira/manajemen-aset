const prisma = require("../../db/index");

const findCustodians = async () => {
  const custodians = await prisma.penanggung_Jawab.findMany({
    include:{
      detail_aset:{
        select:{
          aset:{
            select:{
              nama_barang:true,
              merk:true
            }
          },
          ruangan: {
            select:{
              nama_ruangan:true
            }
          }
        }
      },
      user:{
        select:{
          nama:true,
          profile:true
        }
      }
    }
  });
  return custodians;
};

const findCustodiansById = async (id) => {
  const custodians = await prisma.penanggung_Jawab.findUnique({
    where: {
      id: id,
    },
  });
  return custodians;
};

module.exports = { findCustodians, findCustodiansById };
