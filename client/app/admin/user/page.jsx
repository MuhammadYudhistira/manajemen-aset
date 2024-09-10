"use client"
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import Face3OutlinedIcon from "@mui/icons-material/Face3Outlined";
import FaceOutlinedIcon from "@mui/icons-material/FaceOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";

import Link from "next/link";
import GridUser from "@/components/(user)/GridUser";
import { useFetchUser } from "@/hooks/user/useFetchUser";
import { Suspense, useState } from "react";
import { Spinner } from "@nextui-org/react";

const page = () => {
  const { data, isLoading } = useFetchUser();

  const [filter, setFilter] = useState('latest');
  const [filterRole, setFilterRole] = useState('')
  const [search, setSearch] = useState('');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterRoleChange = (e) => {
    setFilterRole(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filterAndSearchUsers = (users, filter, search, filterRole) => {
    if (!users) return [];

    let filteredUsers = [...users];

    // Filter berdasarkan nama
    if (search) {
      filteredUsers = filteredUsers.filter((user) =>
        user.nama.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter berdasarkan role
    if (filterRole) {
      filteredUsers = filteredUsers.filter((user) =>
        user.role === filterRole
      );
    }

    // Urutkan berdasarkan filter
    if (filter === 'latest') {
      filteredUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filter === 'oldest') {
      filteredUsers.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    return filteredUsers;
  };

  const filteredUsers = filterAndSearchUsers(data?.users, filter, search, filterRole);

  return (
    <>
      <div className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
        <article className="flex items-center gap-4 rounded-xl border bg-white p-6">
          <span className="rounded-full bg-blue-50 p-3">
            <GroupsOutlinedIcon className="text-3xl" />
          </span>
          <p className="p-4 pt-2"></p>
          <div>
            <p className="text-2xl font-medium text-gray-900">{data?.count?.allUser}</p>
            <p className="text-sm text-gray-500">Jumlah User</p>
          </div>
        </article>
        <article className="flex items-center gap-4 rounded-xl border bg-white p-6">
          <span className="rounded-full bg-blue-50 p-3">
            <AccountBoxOutlinedIcon className="text-3xl" />
          </span>
          <div>
            <p className="text-2xl font-medium text-gray-900">{data?.count?.Pj}</p>
            <p className="text-sm text-gray-500">Penanggung Jawab</p>
          </div>
        </article>
        <article className="flex items-center gap-4 rounded-xl border bg-white p-6">
          <span className="rounded-full bg-blue-50 p-3">
            <FaceOutlinedIcon className="text-3xl" />
          </span>
          <div>
            <p className="text-2xl font-medium text-gray-900">{data?.count?.Pria}</p>
            <p className="text-sm text-gray-500">Male</p>
          </div>
        </article>
        <article className="flex items-center gap-4 rounded-xl border bg-white p-6">
          <span className="rounded-full bg-blue-50 p-3">
            <Face3OutlinedIcon className="text-3xl" />
          </span>

          <div>
            <p className="text-2xl font-medium text-gray-900">{data?.count?.Wanita}</p>
            <p className="text-sm text-gray-500">Female</p>
          </div>
        </article>
      </div>
      <div className="flex gap-4">
        <div className="flex w-full flex-1 flex-col gap-4 lg:flex-row">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Nama User"
            className="input input-md input-bordered w-full lg:max-w-xs"
          />
          <select
            value={filterRole}
            onChange={handleFilterRoleChange}
            aria-label="role"
            className="select select-bordered w-full lg:max-w-xs">
            <option value={""}>All</option>
            <option value={"ADMIN"}>Admin</option>
            <option value={"SEKWAN"}>Sekretaris</option>
            <option value={"KEPALA_BAGIAN"}>Kepala Bagian</option>
            <option value={"STAFF"}>Staff</option>
          </select>
          <select
            value={filter}
            onChange={handleFilterChange}
            aria-label="order"
            className="select select-bordered w-full lg:max-w-xs">
            <option value="latest">Terbaru</option>
            <option value="oldest">Terlama</option>
          </select>
          <Link href={"/admin/user/create"} className="btn bg-white text-black">
            <AddCircleOutlineOutlinedIcon /> Tambah User
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:gap-4 xl:grid-cols-4">
        <Suspense fallback={<Spinner />}>
          <GridUser data={filteredUsers} isLoading={isLoading} />
        </Suspense>
      </div>
    </>
  );
};

export default page;
