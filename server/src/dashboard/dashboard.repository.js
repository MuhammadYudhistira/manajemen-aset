const prisma = require('../../db/index');

const nilaiAset = async () => {
  const result = await prisma.detail_Pengadaan.findMany({
    select: {
      harga_satuan: true,
      pengadaan: {
        select: {
          tanggal_penerimaan: true,
        },
      },
    },
  });

  // Mengelompokkan berdasarkan tahun dari tanggal_penerimaan
  const groupedByYear = result.reduce((acc, detail) => {
    const year = detail.pengadaan?.tanggal_penerimaan
      ? new Date(detail.pengadaan.tanggal_penerimaan).getFullYear().toString()
      : 'Unknown';

    if (!acc[year]) {
      acc[year] = 0;
    }
    acc[year] += detail.harga_satuan ?? 0;
    return acc;
  }, {});

  // Format hasil menjadi array
  return Object.entries(groupedByYear).map(([tahun, nilaiAset]) => ({
    tahun,
    nilaiAset,
  }));
};

const jumlahAset = async () => {
  const allDetails = await prisma.detail_Pengadaan.findMany({
    select: {
      id: true,
      pengadaan: {
        select: {
          tanggal_penerimaan: true,
        },
      },
    },
    where: {
      status: {
        notIn: ['Inactive', 'Deletion_Accepted'], // Filter status
      },
    },
  });

  // Mengelompokkan berdasarkan tahun penerimaan
  const groupedByYear = allDetails.reduce((acc, detail) => {
    const year = detail.pengadaan?.tanggal_penerimaan
      ? new Date(detail.pengadaan.tanggal_penerimaan).getFullYear()
      : 'Unknown'; // Cegah error jika `tanggal_penerimaan` null

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
  const asets = await prisma.detail_Pengadaan.findMany({
    take: 5,
    where: {
      status: {
        notIn: ['Inactive', 'Deletion_Accepted'], // Filter status
      },
    },
    orderBy: {
      pengadaan: {
        tanggal_penerimaan: 'desc',
      },
    },
    select: {
      id: true,
      barang: {
        select: {
          kode_barang: true,
          nama_barang: true,
          image: true,
        },
      },
      pengadaan: {
        select: {
          tanggal_penerimaan: true,
        },
      },
    },
  });
  return asets;
};

const totalAset = async () => {
  const total = await prisma.detail_Pengadaan.aggregate({
    _sum: {
      harga_satuan: true, // Total nilai aset dari harga_satuan
    },
    _count: {
      id: true, // Total jumlah aset berdasarkan kode_detail
    },
    where: {
      status: {
        notIn: ['Inactive', 'Deletion_Accepted'], // Filter status
      },
    },
  });

  return {
    totalNilaiAset: total._sum.harga_satuan || 0, // Pastikan nilai tidak undefined
    totalJumlahAset: total._count.id || 0,
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
    totalAset: totalAsets.totalJumlahAset,
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
    totalAset: totalAsets.totalJumlahAset,
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
