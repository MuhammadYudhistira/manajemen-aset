const prisma = require("../../db/index");

const insertRepairingImage = async (data) => {
  const RepairingImage = prisma.perbaikan_Images.createMany({
    data,
  });

  return RepairingImage;
};

module.exports = { insertRepairingImage };
