const prisma = require('../../db/index');

const nilaiAset = async () => {
  const result = await prisma.detail_Aset.groupBy({
    by: ['tahun_perolehan'],
    _sum: {
      harga_satuan: true,
    },
    orderBy: {
      tahun_perolehan: 'asc',
    },
  });

  return result.map((item) => ({
    tahun: new Date(item.tahun_perolehan).getFullYear().toString(),
    nilaiAset: item._sum.harga_satuan,
  }));
};

const jumlahAset = async () => {
  const allDetails = await prisma.detail_Aset.findMany({
    select: {
      tahun_perolehan: true,
      kode_detail: true,
    },
    where: {
      status: {
        notIn: ['Inactive', 'Deletion_Accepted'], // Filter status
      },
    },
  });

  // Mengelompokkan berdasarkan tahun
  const groupedByYear = allDetails.reduce((acc, detail) => {
    const year = detail.tahun_perolehan.getFullYear();
    if (!acc[year]) {
      acc[year] = 0;
    }
    acc[year] += 1;
    return acc;
  }, {});

  // Format hasil menjadi array
  return Object.entries(groupedByYear).map(([tahun, totalAset]) => ({
    tahun,
    totalAset,
  }));
};

const listUsers = async () => {
  const users = await prisma.user.findMany({
    take: 3,
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      nip: true,
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
    where: {
      status: {
        notIn: ['Inactive', 'Deletion_Accepted'], // Filter status
      },
    },
    orderBy: {
      tahun_perolehan: 'desc',
    },
    select: {
      kode_detail: true,
      tahun_perolehan: true,
      aset: {
        select: {
          kode_barang: true,
          nama_barang: true,
          image: true,
        },
      },
    },
  });
  return asets;
};

const totalAset = async () => {
  const total = await prisma.detail_Aset.aggregate({
    _sum: {
      harga_satuan: true, // Total nilai aset dari harga_satuan
    },
    _count: {
      kode_detail: true, // Total jumlah aset berdasarkan kode_detail
    },
    where: {
      status: {
        notIn: ['Inactive', 'Deletion_Accepted'], // Filter status
      },
    },
  });

  return {
    totalNilaiAset: total._sum.harga_satuan || 0, // Pastikan nilai tidak undefined
    totalJumlahAset: total._count.kode_detail || 0,
  };
};

const CountDashboard = async () => {
  const { totalNilaiAset, totalJumlahAset } = await totalAset();
  const totalUser = await prisma.user.count(); // Total user diambil langsung dari model user

  return {
    totalNilaiAset,
    totalJumlahAset,
    totalUser,
  };
};

const countDashboardHead = async () => {
  const reported = await prisma.laporan_Kerusakan.count({
    where: {
      status: 'Reported',
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
      status: 'Reported',
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
