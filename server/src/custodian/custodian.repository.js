const prisma = require('../../db/index');

const findCustodians = async () => {
  const custodians = await prisma.penanggung_Jawab.findMany({
    include: {
      detail_aset: {
        select: {
          kode_detail: true,
          merk: true,
          Detail_Aset_Images: {
            select: {
              link: true,
            },
          },
          aset: {
            select: {
              nama_barang: true,
              kode_barang: true,
            },
          },
          lokasi: {
            select: {
              nama_lokasi: true,
            },
          },
        },
      },
      user: {
        select: {
          nip: true,
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
          lokasi: {
            select: {
              nama_lokasi: true,
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
      kode_detail: custodianData.kode_detail,
    },
  });

  return custodian;
};

const insertCustodian = async (newCustodianData) => {
  const custodian = await prisma.penanggung_Jawab.create({
    data: {
      kode_detail: newCustodianData.kode_detail,
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
      kode_detail: newCustodianData.kode_detail,
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
      nama: true,
      nip: true,
      image: true,
      Penanggung_Jawab: {
        select: {
          id: true,
          detail_aset: {
            select: {
              kode_detail: true,
              merk: true,
              aset: {
                select: {
                  nama_barang: true,
                },
              },
              kode_barang: true,
              lokasi: {
                select: {
                  nama_lokasi: true,
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
