const prisma = require("../../db/index");

const findAllRepair = async () => {
  const repairs = await prisma.perbaikan.findMany({
    include: {
      detail_aset: {
        select: {
          kode_barang: true,
          aset: {
            select: {
              nama_barang: true,
            },
          },
        },
      },
      laporan_kerusakan: {
        select: {
          perihal: true,
        },
      },
    },
  });
  return repairs;
};

const findRepairById = async (id) => {
  const repair = await prisma.perbaikan.findUnique({
    where: {
      id: id,
    },
    include: {
      laporan_kerusakan: {
        select: {
          perihal: true,
          deskripsi: true,
          createdAt: true,
        },
      },
      detail_aset: {
        select: {
          kode_barang: true,
          aset: {
            select: {
              nama_barang: true,
            },
          },
        },
      },
      user: {
        select: {
          nama: true,
          nip: true,
        },
      },
    },
  });
  return repair;
};

const findRepairsByStatus = async (status) => {
  const repairs = await prisma.perbaikan.findMany({
    where: {
      status: status,
    },
    include: {
      laporan_kerusakan: {
        select: {
          perihal: true,
          deskripsi: true,
          createdAt: true,
        },
      },
      detail_aset: {
        select: {
          kode_barang: true,
          aset: {
            select: {
              nama_barang: true,
            },
          },
        },
      },
    },
  });

  return repairs;
};

const insertRepair = async (newRepairData) => {
  const repair = await prisma.perbaikan.create({
    data: {
      id_laporan_kerusakan: newRepairData.id_laporan_kerusakan,
      id_detail_aset: newRepairData.id_detail_aset,
      id_requested_by: newRepairData.id_requested_by,
      hal: newRepairData.hal,
      biaya_perbaikan: newRepairData.biaya_perbaikan,
      nomor_rekening: newRepairData.nomor_rekening,
    },
  });

  return repair;
};

const updateRepairById = async (id, newRepairData) => {
  const repair = await prisma.perbaikan.update({
    where: {
      id: id,
    },
    data: {
      id_laporan_kerusakan: newRepairData.id_laporan_kerusakan,
      id_detail_aset: newRepairData.id_detail_aset,
      hal: newRepairData.hal,
      biaya_perbaikan: newRepairData.biaya_perbaikan,
      nomor_rekening: newRepairData.nomor_rekening,
      approved_by: newRepairData.approved_by,
      approved_date: newRepairData.approved_date,
      keterangan: newRepairData.keterangan,
      status: newRepairData.status,
      berita_acara: newRepairData.berita_acara,
      faktur: newRepairData.faktur,
      kuitansi: newRepairData.kuitansi,
    },
  });
  return repair;
};

const deleteRepairById = async (id) => {
  const repair = await prisma.perbaikan.delete({
    where: {
      id: id,
    },
  });

  return repair;
};

module.exports = {
  findAllRepair,
  findRepairById,
  findRepairsByStatus,
  insertRepair,
  deleteRepairById,
  updateRepairById,
};
