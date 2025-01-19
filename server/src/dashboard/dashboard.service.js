const {
  nilaiAset: getNilaiAset,
  jumlahAset: getJumlahAset,
  CountDashboard: getCountDashboard,
  listUsers: getlistUsers,
  listAset: getListAset,
  countDashboardHead,
  listDamges,
  countDashboardSekwan,
  listPerbaikan,
} = require('./dashboard.repository');

const dashboardAdmin = async () => {
  const asetNilai = await getNilaiAset();
  const totalAsetData = await getJumlahAset();
  const totalNilaiAset = await getCountDashboard();
  const listUsers = await getlistUsers();
  const listAset = await getListAset();

  const data = {
    count: totalNilaiAset,
    nilaiAset: asetNilai,
    totalAset: totalAsetData,
    listUsers,
    listAset,
  };

  return data;
};

const dashboardHead = async () => {
  const count = await countDashboardHead();
  const listDamages = await listDamges();
  const data = {
    count,
    listDamages,
  };

  return data;
};

const dashboardSekwan = async () => {
  const count = await countDashboardSekwan();
  const listRepairs = await listPerbaikan();
  const data = {
    count,
    listRepairs,
  };

  return data;
};

module.exports = { dashboardAdmin, dashboardHead, dashboardSekwan };
