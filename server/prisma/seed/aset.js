function createAssets() {
  const assets = [
    {
      nama_barang: "Macbook Pro 14 2024",
      merk: "Apple",
      deskripsi:
        "BERTENAGA SUPER BERKAT M3 — Dengan CPU 8-core dan GPU 10-core yang menggunakan ray tracing yang dipercepat perangkat keras, chip Apple M3 dapat membantu Anda melakukan multitasking sehari-hari dengan cepat dan mengerjakan proyek profesional, seperti mengedit ribuan foto atau video 4K.\
KEKUATAN BATERAI HINGGA 22 JAM (1)— Lakukan lebih banyak hal sepanjang hari berkat desain Apple silicon yang hemat energi. MacBook Pro menghadirkan performa yang sama-sama mengagumkan, saat tersambung ke daya atau menggunakan baterai.",
      tahun_perolehan: new Date("2022-02-02"),
      ukuran: "Space Gray 1TB",
      harga_satuan: 28000000,
      jumlah_barang: 2,
      nilai_perolehan: 56000000,
      image: "aset-image/1719679172719_macbook-air-2023-primary.jpeg",
    },
    {
      nama_barang: "Meja Rapat",
      merk: "IKEA",
      deskripsi: "Meja rapat di ruang sidang",
      tahun_perolehan: new Date("2022-02-02"),
      ukuran: "100CM",
      harga_satuan: 10000000,
      jumlah_barang: 2,
      nilai_perolehan: 2000000,
      image: "aset-image/1719913887949_Meja-rapat.jpg",
    },
    {
      nama_barang: "Videotron",
      merk: "Led Master",
      deskripsi: "Videotron outdoor kantor DPRD Provinsi Sumbar",
      tahun_perolehan: new Date("2019-01-01"),
      ukuran: "4x6",
      harga_satuan: 846351968,
      jumlah_barang: 1,
      nilai_perolehan: 846351968,
      image: "aset-image/1722131236935_Videotron.jpg",
    },
    {
      nama_barang: "Mini Bus",
      merk: "Toyota All New Avanza",
      deskripsi:
        "Toyota All New Avanza adalah MPV (Multi-Purpose Vehicle) modern yang dirancang untuk memenuhi kebutuhan keluarga dan gaya hidup urban. Dikenal sebagai mobil yang praktis dan andal, All New Avanza hadir dengan desain eksterior yang lebih sporty dan aerodinamis, memberikan kesan dinamis dan elegan di jalan.",
      tahun_perolehan: new Date("2014-01-01"),
      ukuran: "1495cc",
      harga_satuan: 178700000,
      jumlah_barang: 1,
      nilai_perolehan: 178700000,
      image: "aset-image/1723688065740_minibus.jpg",
    },
    {
      nama_barang: "Toyota Camry",
      merk: "2,4 G A/T",
      deskripsi:
        "Toyota Camry adalah sedan premium yang sangat cocok digunakan oleh perusahaan yang membutuhkan kendaraan dengan citra profesional dan performa tinggi. ",
      tahun_perolehan: new Date("2014-01-01"),
      ukuran: "2.500",
      harga_satuan: 567800000,
      jumlah_barang: 1,
      nilai_perolehan: 567800000,
      image: "aset-image/1723688682445_camry.jpg",
    },
  ];

  return assets;
}

module.exports = { createAssets };
