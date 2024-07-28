const prisma = require("../../db/index");

const findAllDamage = async () => {
  const damage = await prisma.laporan_Kerusakan.findMany({
    select: {
      id: true,
      perihal: true,
      status: true,
      createdAt: true,
      user: {
        select: {
          nama: true,
          image: true,
        },
      },
      detail_aset: {
        select: {
          id: true,
          kode_barang: true,
          aset: {
            select: {
              nama_barang: true,
            },
          },
          ruangan: {
            select: {
              nama_ruangan: true,
            },
          },
        },
      },
      Perbaikan: {
        select: {
          _count: true,
        },
      },
    },
  });
  return damage;
};

const findDamageById = async (id) => {
  const damage = await prisma.laporan_Kerusakan.findUnique({
    where: {
      id: id,
    },
    include: {
      detail_aset: {
        select: {
          kode_barang: true,
          aset: {
            select: {
              nama_barang: true,
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
          nama: true,
        },
      },
    },
  });
  return damage;
};

const findDamageByIdUser = async (id) => {
  const damage = await prisma.laporan_Kerusakan.findMany({
    where: {
      id_user: id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      perihal: true,
      status: true,
      createdAt: true,
      detail_aset: {
        select: {
          kode_barang: true,
          aset: {
            select: {
              nama_barang: true,
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
          nama: true,
        },
      },
    },
  });

  return damage;
};

const insertDamage = async (newDamageData) => {
  const damage = await prisma.laporan_Kerusakan.create({
    data: {
      id_user: newDamageData.id_user,
      id_detail_aset: newDamageData.id_detail_aset,
      perihal: newDamageData.perihal,
      deskripsi: newDamageData.deskripsi,
      image: newDamageData.image,
    },
  });

  return damage;
};

const editDamegeById = async (id, newDamageData) => {
  const damage = await prisma.laporan_Kerusakan.update({
    where: {
      id: id,
    },
    data: {
      perihal: newDamageData.perihal,
      deskripsi: newDamageData.deskripsi,
      image: newDamageData.image,
      approved_by: newDamageData.approved_by,
      approved_date: newDamageData.approved_date,
      status: newDamageData.status,
      keterangan: newDamageData.keterangan,
    },
  });
  return damage;
};

const deleteDamageById = async (id) => {
  const damage = await prisma.laporan_Kerusakan.delete({
    where: {
      id: id,
    },
  });
  return damage;
};

module.exports = {
  findAllDamage,
  findDamageById,
  findDamageByIdUser,
  insertDamage,
  editDamegeById,
  deleteDamageById,
};
