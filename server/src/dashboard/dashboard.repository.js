const prisma = require("../../db/index");

const nilaiAset = async () => {
  const result = await prisma.aset.groupBy({
    by: ["tahun_perolehan"],
    _sum: {
      nilai_perolehan: true,
    },
    orderBy: {
      tahun_perolehan: "asc",
    },
  });

  return result.map((item) => ({
    tahun: new Date(item.tahun_perolehan).getFullYear().toString(),
    nilaiAset: item._sum.nilai_perolehan,
  }));
};

const jumlahAset = async () => {
  const result = await prisma.aset.groupBy({
    by: ["tahun_perolehan"],
    _sum: {
      jumlah_barang: true,
    },
    orderBy: {
      tahun_perolehan: "asc",
    },
  });

  return result.map((item) => ({
    tahun: new Date(item.tahun_perolehan).getFullYear().toString(),
    totalAset: item._sum.jumlah_barang,
  }));
};

const listUsers = async () => {
  const users = await prisma.user.findMany({
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      nama: true,
      image: true,
      role: true,
    },
  });

  return users;
};

const listAset = async () => {
  const asets = await prisma.detail_Aset.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      kode_barang: true,
      createdAt: true,
      aset: {
        select: {
          id: true,
          nama_barang: true,
          image: true,
        },
      },
    },
  });
  return asets;
};

const totalAset = async () => {
  const total = await prisma.aset.aggregate({
    _sum: {
      nilai_perolehan: true,
      jumlah_barang: true,
    },
    where: {
      Detail_Aset: {
        some: {
          status: {
            not: "Inactive",
          },
        },
      },
    },
  });
  return total;
};

const CountDashboard = async () => {
  const total = await totalAset();
  const totalUser = await prisma.user.count();

  return (count = {
    totalNilaiAset: total._sum.nilai_perolehan,
    totalAset: total._sum.jumlah_barang,
    totalUser: totalUser,
  });
};

const countDashboardHead = async () => {
  const reported = await prisma.laporan_Kerusakan.count({
    where: {
      status: "Reported",
    },
  });

  const totalAsets = await totalAset();
  const total = await prisma.laporan_Kerusakan.count();

  return (count = {
    total,
    reported: reported,
    totalAset: totalAsets._sum.jumlah_barang,
  });
};

const countDashboardSekwan = async () => {
  const reported = await prisma.perbaikan.count({
    where: {
      status: "Reported",
    },
  });

  const totalAsets = await totalAset();
  const total = await prisma.perbaikan.count();

  return (count = {
    total,
    reported: reported,
    totalAset: totalAsets._sum.jumlah_barang,
  });
};

const listDamges = async () => {
  const damages = await prisma.laporan_Kerusakan.findMany({
    take: 5,
  });

  return damages;
};

const listPerbaikan = async () => {
  const repairs = await prisma.perbaikan.findMany({
    take: 5,
  });

  return repairs;
};

module.exports = {
  nilaiAset,
  jumlahAset,
  CountDashboard,
  listUsers,
  listAset,
  countDashboardHead,
  listDamges,
  countDashboardSekwan,
  listPerbaikan,
};
