const prisma = require("../../db/index");

const nilaiAset = async () => {
  const result = await prisma.aset.groupBy({
    by: ["tahun_perolehan"],
    _sum: {
      nilai_perolehan: true,
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
    select: {
      kode_barang: true,
      createdAt: true,
      aset: {
        select: {
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

module.exports = {
  nilaiAset,
  jumlahAset,
  CountDashboard,
  listUsers,
  listAset,
  countDashboardHead,
};
