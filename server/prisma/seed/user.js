const bcrypt = require("bcrypt");

async function createUsers() {
  const user = [
    {
      nip: "1",
      nama: "Admin",
      password: await bcrypt.hash("Admin123", 10),
      alamat: "Padang",
      jenis_kelamin: "Pria",
      no_hp: "123",
      role: "ADMIN",
      image: "user-image/1720327777056_profile.jpg",
    },
    {
      nip: "2011523003",
      nama: "Yudhis",
      password: await bcrypt.hash("Yudhis123", 10),
      alamat: "Padang",
      jenis_kelamin: "Pria",
      no_hp: "08123",
      role: "ADMIN",
      image: "user-image/1720983266680_Yudis%201%20(with%20background).jpg",
    },
    {
      nip: "2011522025",
      nama: "Aini Izzathy",
      password: await bcrypt.hash("Aini123", 10),
      alamat: "Padang",
      jenis_kelamin: "Wanita",
      no_hp: "08123",
      role: "STAFF",
      image:
        "user-image/1720597452821_WhatsApp%20Image%202023-04-17%20at%2016.53.19.jpg",
    },
  ];

  return user;
}

module.exports = { createUsers };
