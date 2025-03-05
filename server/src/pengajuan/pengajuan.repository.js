const prisma = require('../../db/index');

const findAllPengajuan = async () => {
  const pengajuan = await prisma.pengajuan.findMany({
    include: {
      Detail_Pengajuan: {
        select: {
          Barang: {
            select: {
              nama_barang: true,
              kode_barang: true,
            },
          },
          jumlah_barang: true,
        },
      },
      user: {
        select: {
          nama: true,
        },
      },
    },
  });
  return pengajuan;
};

const findPengajuanByNip = async (nip) => {
  const pengajuan = await prisma.pengajuan.findMany({
    where: {
      nip_pengusul: nip,
    },
    include: {
      Detail_Pengajuan: {
        select: {
          Barang: {
            select: {
              nama_barang: true,
              kode_barang: true,
            },
          },
          jumlah_barang: true,
        },
      },
    },
    orderBy: {
      tanggal_pengajuan: 'desc',
    },
  });
  return pengajuan;
};

const findPengajuanByNo = async (no) => {
  const pengajuan = await prisma.pengajuan.findUnique({
    where: {
      no_pengajuan: no,
    },
    include: {
      Detail_Pengajuan: {
        select: {
          Barang: {
            select: {
              nama_barang: true,
              kode_barang: true,
              jenis_barang: true,
            },
          },
          jumlah_barang: true,
        },
      },
    },
  });

  return pengajuan;
};

const findPengajuanByStatus = async (status) => {
  const pengajuan = await prisma.pengajuan.findMany({
    where: {
      status: status,
    },
    include: {
      user: {
        select: {
          nama: true,
          image: true,
        },
      },
      Detail_Pengajuan: {
        include: {
          Barang: true,
        },
      },
    },
  });

  return pengajuan;
};

const insertPengajuan = async (newPengajuanData) => {
  const pengajuan = await prisma.pengajuan.create({
    data: {
      no_pengajuan: newPengajuanData.no_pengajuan,
      nip_pengusul: newPengajuanData.nip_pengusul,
      title: newPengajuanData.title,
      unit_pengajuan: newPengajuanData.unit_pengajuan,
      tanggal_pengajuan: new Date(newPengajuanData.tanggal_pengajuan),

      Detail_Pengajuan: {
        createMany: {
          data: newPengajuanData.detail_pengajuan.map((item) => ({
            id: newPengajuanData.no_pengajuan + '.' + item.kode_barang,
            kode_barang: item.kode_barang,
            jumlah_barang: item.jumlah_barang,
          })),
        },
      },
    },
    include: {
      Detail_Pengajuan: true,
    },
  });

  return pengajuan;
};

const cancelPengajuan = async (no) => {
  const pengajuan = await prisma.pengajuan.update({
    where: {
      no_pengajuan: no,
    },
    data: {
      status: 'Cancelled',
    },
  });

  return pengajuan;
};

module.exports = {
  findAllPengajuan,
  findPengajuanByNo,
  insertPengajuan,
  cancelPengajuan,
  findPengajuanByNip,
  findPengajuanByStatus,
};
