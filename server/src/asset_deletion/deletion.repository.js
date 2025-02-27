const prisma = require('../../db/index');

const findAllDeletion = async () => {
  const listDeletions = await prisma.penghapusan_Nilai_aset.findMany({
    include: {
      Detail_Penghapusan_Nilai_Aset: true, // Ambil detail aset yang terkait
    },
  });

  // Mengubah format respons untuk mencakup 'items' sebagai jumlah detail aset
  const formattedResponse = listDeletions.map((deletion) => ({
    id: deletion.id, // ID penghapusan
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
      id: id,
    },
    include: {
      Detail_Penghapusan_Nilai_Aset: {
        include: {
          detail_aset: {
            select: {
              kode_detail: true,
              harga_satuan: true,
              tahun_perolehan: true,
              aset: {
                select: {
                  nama_barang: true,
                  image: true,
                },
              },
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
      title: newDeletionData.title,
      alasan_penghapusan: newDeletionData.alasan_penghapusan,
      Detail_Penghapusan_Nilai_Aset: {
        create: newDeletionData.kode_detail.map((kode_detail) => ({
          detail_aset: { connect: { kode_detail: kode_detail } }, // Menghubungkan ke tabel Detail_Aset
        })),
      },
    },
  });

  return deletion;
};

const updateDeletionStatus = async (
  id,
  status,
  keterangan,
  bukti_penghapusan
) => {
  const deletion = await prisma.penghapusan_Nilai_aset.update({
    where: {
      id: id,
    },
    data: {
      status: status,
      keterangan: keterangan,
      bukti_penghapusan: bukti_penghapusan,
    },
  });
  return deletion;
};

const deleteDeleteionById = async (id) => {
  const deletion = await prisma.penghapusan_Nilai_aset.delete({
    where: {
      id: id,
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
