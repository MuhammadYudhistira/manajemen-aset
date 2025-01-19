const prisma = require('../../db/index');

const findAllKendaraan = async () => {
  const kendaraan = await prisma.aset_Kendaraan.findMany();
  return kendaraan;
};

const findKendaraanByKodeDetail = async (kode_detail) => {
  return await prisma.aset_Kendaraan.findUnique({
    where: { kode_detail: kode_detail },
  });
};

const insertKendaraan = async (newKendaraanData) => {
  const kendaraan = await prisma.aset_Kendaraan.create({
    data: {
      kode_detail: newKendaraanData.kode_detail,
      nomor_bpkb: newKendaraanData.nomor_bpkb,
      nomor_mesin: newKendaraanData.nomor_mesin,
      nomor_polisi: newKendaraanData.nomor_polisi,
      nomor_rangka: newKendaraanData.nomor_rangka,
    },
  });

  return kendaraan;
};

const updateKendaraanByKodeDetail = async (kode_detail, newKendaraanData) => {
  const kendaraan = await prisma.aset_Kendaraan.update({
    where: {
      kode_detail: kode_detail,
    },
    data: {
      kode_detail: newKendaraanData.kode_detail,
      nomor_bpkb: newKendaraanData.nomor_bpkb,
      nomor_mesin: newKendaraanData.nomor_mesin,
      nomor_polisi: newKendaraanData.nomor_polisi,
      nomor_rangka: newKendaraanData.nomor_rangka,
    },
  });
  return kendaraan;
};

const deleteKendaraanByKodeDetail = async (kode_detail) => {
  const kendaraan = await prisma.aset_Kendaraan.delete({
    where: {
      kode_detail: kode_detail,
    },
  });
  return kendaraan;
};

module.exports = {
  findAllKendaraan,
  findKendaraanByKodeDetail,
  insertKendaraan,
  updateKendaraanByKodeDetail,
  deleteKendaraanByKodeDetail,
};
