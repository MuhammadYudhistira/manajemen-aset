const { insertRepairingImage } = require("./repairing_image.repository");

const createRepairingImages = async (newImagesData) => {
  const imageData = newImagesData.image.map((img) => ({
    id_perbaikan: newImagesData.id_perbaikan,
    link: img,
  }));

  const images = await insertRepairingImage(imageData);
  return images;
};

module.exports = { createRepairingImages };
