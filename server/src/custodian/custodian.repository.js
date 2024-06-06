const prisma = require("../../db/index");

const findCustodians = async () => {
  const custodians = await prisma.penanggung_Jawab.findMany();
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
