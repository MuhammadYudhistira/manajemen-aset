-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `nip` VARCHAR(18) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `no_hp` VARCHAR(18) NOT NULL,
    `role` ENUM('ADMIN', 'SEKWAN', 'KEPALA_BAGIAN', 'STAFF', 'GUEST') NOT NULL DEFAULT 'GUEST',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_nip_key`(`nip`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ruangan` (
    `id` VARCHAR(191) NOT NULL,
    `nama_ruangan` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asets` (
    `id` VARCHAR(191) NOT NULL,
    `nama_barang` VARCHAR(100) NOT NULL,
    `merk` VARCHAR(100) NULL,
    `tahun_perolehan` DATETIME(3) NOT NULL,
    `ukuran` VARCHAR(100) NULL,
    `harga_satuan` INTEGER NOT NULL,
    `jumlah_barang` INTEGER NOT NULL,
    `nilai_perolehan` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detail_aset` (
    `id` VARCHAR(191) NOT NULL,
    `kode_barang` VARCHAR(100) NULL,
    `nomor_rangka` VARCHAR(100) NULL,
    `nomor_mesin` VARCHAR(100) NULL,
    `nomor_polisi` VARCHAR(100) NULL,
    `nomor_bpkb` VARCHAR(100) NULL,
    `status` ENUM('Available', 'Inactive', 'Damaged', 'Under_Maintenance', 'Lost') NOT NULL DEFAULT 'Available',
    `keterangan` VARCHAR(191) NULL,
    `id_aset` VARCHAR(191) NOT NULL,
    `id_ruangan` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detail_aset_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `link` VARCHAR(191) NOT NULL,
    `id_detail_aset` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `penanggung_jawab` (
    `id` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `id_detail_aset` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `laporan_kerusakan` (
    `id` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `bukti_kerusakan` VARCHAR(191) NOT NULL,
    `approved_by` VARCHAR(100) NULL,
    `approved_date` DATETIME(3) NULL,
    `status` ENUM('Reported', 'Approved', 'Rejected') NOT NULL DEFAULT 'Reported',
    `keterangan` VARCHAR(191) NULL,
    `id_pelapor` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `perbaikan` (
    `id` VARCHAR(191) NOT NULL,
    `bagian_kerusakan` VARCHAR(191) NOT NULL,
    `biaya_perbaikan` INTEGER NOT NULL,
    `approved_by` VARCHAR(100) NULL,
    `approved_date` DATETIME(3) NULL,
    `faktur` VARCHAR(191) NULL,
    `kuitansi` VARCHAR(191) NULL,
    `berita_acara` VARCHAR(191) NULL,
    `status` ENUM('Reported', 'Approved', 'Rejected', 'In_progress', 'Completed') NOT NULL,
    `keterangan` VARCHAR(191) NULL,
    `id_laporan_kerusakan` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `perbaikan_images` (
    `id` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `id_perbaikan` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `detail_aset` ADD CONSTRAINT `detail_aset_id_aset_fkey` FOREIGN KEY (`id_aset`) REFERENCES `asets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_aset` ADD CONSTRAINT `detail_aset_id_ruangan_fkey` FOREIGN KEY (`id_ruangan`) REFERENCES `ruangan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_aset_images` ADD CONSTRAINT `detail_aset_images_id_detail_aset_fkey` FOREIGN KEY (`id_detail_aset`) REFERENCES `detail_aset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penanggung_jawab` ADD CONSTRAINT `penanggung_jawab_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penanggung_jawab` ADD CONSTRAINT `penanggung_jawab_id_detail_aset_fkey` FOREIGN KEY (`id_detail_aset`) REFERENCES `detail_aset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `laporan_kerusakan` ADD CONSTRAINT `laporan_kerusakan_id_pelapor_fkey` FOREIGN KEY (`id_pelapor`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `perbaikan` ADD CONSTRAINT `perbaikan_id_laporan_kerusakan_fkey` FOREIGN KEY (`id_laporan_kerusakan`) REFERENCES `laporan_kerusakan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `perbaikan_images` ADD CONSTRAINT `perbaikan_images_id_perbaikan_fkey` FOREIGN KEY (`id_perbaikan`) REFERENCES `perbaikan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
