const prisma = require("../../db/index");

const findCustodians = async () => {
  const custodians = await prisma.penanggung_Jawab.findMany({
    include: {
      detail_aset: {
        select: {
          id: true,
          kode_barang: true,
          aset: {
            select: {
              nama_barang: true,
              merk: true,
            },
          },
          ruangan: {
            select: {
              nama_ruangan: true,
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          nama: true,
          image: true,
        },
      },
    },
  });
  return custodians;
};

const findCustodiansById = async (id) => {
  const custodians = await prisma.penanggung_Jawab.findUnique({
    where: {
      id: id,
    },
    include: {
      detail_aset: {
        include: {
          ruangan: {
            select: {
              nama_ruangan: true,
            },
          },
        },
      },
      user: true,
    },
  });
  return custodians;
};

const countCustodian = async (custodianData) => {
  const custodian = await prisma.penanggung_Jawab.count({
    where: {
      id_user: custodianData.id_user,
      id_detail_aset: custodianData.id_detail_aset,
    },
  });

  return custodian;
};

const insertCustodian = async (newCustodianData) => {
  const custodian = await prisma.penanggung_Jawab.create({
    data: {
      id_detail_aset: newCustodianData.id_detail_aset,
      id_user: newCustodianData.id_user,
    },
  });
  return custodian;
};

const editCustodianById = async (id, newCustodianData) => {
  const custodian = await prisma.penanggung_Jawab.update({
    where: {
      id: id,
    },
    data: {
      id_detail_aset: newCustodianData.id_detail_aset,
      id_user: newCustodianData.id_user,
    },
  });

  return custodian;
};

const deleteCustodianById = async (id) => {
  const custodian = await prisma.penanggung_Jawab.delete({
    where: {
      id: id,
    },
  });

  return custodian;
};

const findAllUsersWhoCustodian = async () => {
  const listUsers = await prisma.user.findMany({
    where: {
      Penanggung_Jawab: {
        some: {},
      },
    },
    select: {
      id: true,
      nama: true,
      nip: true,
      image: true,
      Penanggung_Jawab: {
        select: {
          id: true,
          detail_aset: {
            select: {
              aset: {
                select: {
                  nama_barang: true,
                  merk: true,
                },
              },
              kode_barang: true,
              ruangan: {
                select: {
                  nama_ruangan: true,
                },
              },
              Detail_Aset_Images: {
                take: 1,
              },
            },
          },
        },
      },
    },
  });
  return listUsers;
};

module.exports = {
  findCustodians,
  findCustodiansById,
  countCustodian,
  insertCustodian,
  editCustodianById,
  deleteCustodianById,
  findAllUsersWhoCustodian,
};
