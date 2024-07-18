function createAssets() {
  const assets = [
    {
      nama_barang: "Macbook Pro 14 2024",
      merk: "Apple",
      deskripsi:
        "BERTENAGA SUPER BERKAT M3 — Dengan CPU 8-core dan GPU 10-core yang menggunakan ray tracing yang dipercepat perangkat keras, chip Apple M3 dapat membantu Anda melakukan multitasking sehari-hari dengan cepat dan mengerjakan proyek profesional, seperti mengedit ribuan foto atau video 4K.\
KEKUATAN BATERAI HINGGA 22 JAM (1)— Lakukan lebih banyak hal sepanjang hari berkat desain Apple silicon yang hemat energi. MacBook Pro menghadirkan performa yang sama-sama mengagumkan, saat tersambung ke daya atau menggunakan baterai.\
PENYIMPANAN DAN MEMORI TERINTEGRASI YANG RESPONSIF — Memori terintegrasi hingga 24 GB menjadikan segala yang Anda lakukan terasa cepat dan lancar. Penyimpanan SSD super cepat hingga 2 TB membuka aplikasi dan file dalam sekejap (2)\
LAYAR PRO CEMERLANG — Layar Liquid Retina XDR 14,2 inci (3) dilengkapi Extreme Dynamic Range, kecerahan berkelanjutan 1.000 nit untuk konten HDR yang menakjubkan, kecerahan hingga 600 nit untuk konten SDR, dan mode referensi pro untuk bekerja maksimal di mana saja.\
SEPENUHNYA KOMPATIBEL — Semua aplikasi pro Anda berjalan sangat cepat — termasuk Adobe Creative Cloud, Apple Xcode, Microsoft 365, Medivis SurgicalAR, dan banyak aplikasi iPhone dan iPad favorit Anda.(4) Dan dengan macOS, bekerja dan bermain di Mac menjadi semakin andal. Tingkatkan penampilan Anda dalam panggilan video. Mampu mengakses informasi dengan cara baru. Dan temukan lebih banyak cara mempersonalisasi Mac.\
KAMERA DAN AUDIO CANGGIH — Tampil menawan dan terdengar menakjubkan dengan kamera FaceTime HD 1080p, deretan tiga mikrofon berkualitas studio, dan sistem suara enam speaker dengan Audio Spasial.\
HUBUNGKAN SEMUANYA — MacBook Pro ini dilengkapi port pengisian daya MagSafe, dua port Thunderbolt/USB 4, slot kartu SDXC, port HDMI, dan jek headphone. Nikmati konektivitas nirkabel cepat dengan Wi-Fi 6E (5) dan Bluetooth 5.3. Mendukung satu layar eksternal.\
MAGIC KEYBOARD DENGAN TOUCH ID — Magic Keyboard dengan lampu latar dilengkapi dengan baris tombol fungsi penuh dan Touch ID, agar Anda dapat membuka kunci Mac dan masuk ke berbagai aplikasi dan situs web dengan cepat, mudah, dan aman.\
KEAMANAN CANGGIH — Setiap Mac dilengkapi dengan enkripsi, perlindungan virus yang tangguh, dan sistem firewall yang andal. Dan pembaruan keamanan gratis membantu melindungi Mac Anda.\
BEKERJA DENGAN SEMUA PERANGKAT APPLE ANDA — Anda bisa melakukan banyak hal mengagumkan saat menggunakan perangkat Apple bersamaan. Salin sesuatu di iPhone dan tempelkan ke MacBook Pro. Gunakan MacBook Pro Anda untuk menjawab panggilan FaceTime atau mengirim teks dengan Pesan. (6) Dan itu baru awalnya saja.\
DIBUAT UNTUK LEBIH TAHAN LAMA — Penutup unibody terbuat dari aluminium sepenuhnya yang sangat tahan lama dan tersedia dalam warna Abu-abu dan Perak. Pembaruan perangkat lunak gratis menjaga semuanya berjalan lancar selama bertahun-tahun mendatang.",
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
  ];

  return assets;
}

module.exports = { createAssets };
