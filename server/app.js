const express = require('express');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');

const authController = require('./src/auth/auth.controller');
const asetController = require('./src/asset/aset.controller');
const lokasiController = require('./src/lokasi/lokasi.controller');
const penanggungJawabController = require('./src/custodian/custodian.controller');
const laporanKerusakanController = require('./src/damage_report/damage.controller');
const laporanPerbaikanController = require('./src/repair_report/repair.controller');
const perbaikanImagesController = require('./src/repairing_image/repairing_image.controller');
const UserController = require('./src/user/user.controller');
const detailAsetController = require('./src/detail_aset/detail_aset.router');
const dashboardController = require('./src/dashboard/dahsboard.controller');
const deletionController = require('./src/asset_deletion/deletion.controller');
const kendaraanController = require('./src/aset_kendaraan/kendaraan.controller');
const pengadaanController = require('./src/pengadaan/pengadaan.controller');
const pengajuanController = require('./src/pengajuan/pengajuan.controller');
const dpController = require('./src/detail_pengadaan/dp.controller');
const barangController = require('./src/barang/barang.controller');
const { authMiddleware } = require('./src/middleware/authMiddleware');

const app = express();
const port = process.env.PORT;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ['https://manajemen-aset.yudhistira.site', 'http://localhost:3000'],
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.status(200).json({
    data: 'Welcome to the API',
  });
});

app.use('/api/auth', authController);
app.use('/api/aset', asetController);
app.use('/api/lokasi', lokasiController);
app.use('/api/penanggung-jawab', penanggungJawabController);
app.use('/api/laporan-kerusakan', authMiddleware, laporanKerusakanController);
app.use('/api/laporan-perbaikan', authMiddleware, laporanPerbaikanController);
app.use('/api/perbaikan-images', authMiddleware, perbaikanImagesController);
app.use('/api/user', UserController);
app.use('/api/detail-aset', detailAsetController);
app.use('/api/aset-kendaraan', kendaraanController);
app.use('/api/pengadaan', pengadaanController);
app.use('/api/pengajuan', authMiddleware, pengajuanController);
app.use('/api/dashboard', dashboardController);
app.use('/api/deletion', deletionController);
app.use('/api/detail-pengadaan', dpController);
app.use('/api/barang', barangController);

app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
