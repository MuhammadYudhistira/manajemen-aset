const prisma = require('../../db/index');

const findAllDeletion = async () => {
  const listDeletions = await prisma.penghapusan_Nilai_aset.findMany({
    include: {
      Detail_Penghapusan_Nilai_Aset: true,
    },
  });

  // Mengubah format respons untuk mencakup 'items' sebagai jumlah detail aset
  const formattedResponse = listDeletions.map((deletion) => ({
    id: deletion.no_penghapusan, // ID penghapusan
    title: deletion.title, // Judul penghapusan
    alasan_penghapusan: deletion.alasan_penghapusan, // Alasan penghapusan
    items: deletion.Detail_Penghapusan_Nilai_Aset.length, // Jumlah detail aset
    status: deletion.status, // Status penghapusan
    createdAt: deletion.createdAt, // Tanggal dibuat
    updatedAt: deletion.updatedAt, // Tanggal diperbarui
  }));

  return formattedResponse;
};

const findDeletionById = async (id) => {
  const Deletion = await prisma.penghapusan_Nilai_aset.findUnique({
    where: {
      no_penghapusan: id,
    },
    include: {
      Detail_Penghapusan_Nilai_Aset: {
        include: {
          detail_pengadaan: {
            include: {
              barang: {
                select: {
                  nama_barang: true,
                  image: true,
                  jenis_barang: true,
                },
              },
              lokasi: {
                select: {
                  nama_lokasi: true,
                },
              },
              pengadaan: true,
            },
          },
        },
      },
    },
  });
  return Deletion;
};

const insertDeletion = async (newDeletionData) => {
  const deletion = await prisma.penghapusan_Nilai_aset.create({
    data: {
      no_penghapusan: newDeletionData.no_penghapusan,
      title: newDeletionData.title,
      alasan_penghapusan: newDeletionData.alasan_penghapusan,
      Detail_Penghapusan_Nilai_Aset: {
        createMany: {
          data: newDeletionData.kode_detail.map((item) => ({
            id: newDeletionData.no_penghapusan + '.' + item,
            kode_detail: item,
          })),
        },
      },
    },
  });

  await prisma.detail_Pengadaan.updateMany({
    where: {
      id: {
        in: newDeletionData.kode_detail,
      },
    },
    data: {
      status: 'Request_Deletion',
      keterangan: 'Diajukan untuk penghapusan nilai',
    },
  });

  return deletion;
};

const updateDeletionStatus = async (
  id,
  status,
  keterangan,
  bukti_penghapusan,
  kode_detail,
  keterangan_aset
) => {
  const deletion = await prisma.penghapusan_Nilai_aset.update({
    where: {
      no_penghapusan: id,
    },
    data: {
      status: status,
      keterangan: keterangan,
      bukti_penghapusan: bukti_penghapusan,
    },
  });

  await prisma.detail_Pengadaan.updateMany({
    where: {
      id: {
        in: JSON.parse(kode_detail),
      },
    },
    data: {
      status: keterangan_aset.status,
      keterangan: keterangan_aset.keterangan,
    },
  });

  return deletion;
};

const deleteDeleteionById = async (id) => {
  const deletion = await prisma.penghapusan_Nilai_aset.delete({
    where: {
      no_penghapusan: id,
    },
  });

  return deletion;
};

module.exports = {
  insertDeletion,
  findAllDeletion,
  findDeletionById,
  updateDeletionStatus,
  deleteDeleteionById,
};
