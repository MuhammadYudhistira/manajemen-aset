const bcrypt = require("bcrypt");

async function createUsers() {
  const user = [
    {
      nip: "admin",
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
      nama: "Muhammad Yudhistira",
      password: await bcrypt.hash("Yudhis123", 10),
      alamat: "Padang",
      jenis_kelamin: "Pria",
      no_hp: "08123",
      role: "ADMIN",
      image: "user-image/1720983266680_Yudis%201%20(with%20background).jpg",
    },
    {
      nip: "196409301986021002",
      nama: "H. Raflis, SH,MM",
      password: await bcrypt.hash("sekwan123", 10),
      alamat: "Padang",
      jenis_kelamin: "Pria",
      no_hp: "08123",
      role: "SEKWAN",
      image: "user-image/1722187495385_Raflis, SH.jpg",
    },
    {
      nip: "198506292009021002",
      nama: "Udlil Iman Zul, S.T.",
      password: await bcrypt.hash("head123", 10),
      alamat: "Padang",
      jenis_kelamin: "Pria",
      no_hp: "08123",
      role: "KEPALA_BAGIAN",
      image: "user-image/1721747052688_Udlil Iman Zul, S.T.jpg",
    },
    {
      nip: "197607072008011001",
      nama: "Indra Wahyudi",
      password: await bcrypt.hash("indra123", 10),
      alamat: "Padang",
      jenis_kelamin: "Pria",
      no_hp: "08123",
      role: "STAFF",
      image: "user-image/1722131486301_profile3.jpg",
    },
  ];

  return user;
}

module.exports = { createUsers };
