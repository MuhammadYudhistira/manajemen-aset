"use client"
import AreaCharts from "@/components/(charts)/AreaChart";
import BarCharts from "@/components/(charts)/BarCharts";
import { useFetchDashboardAdmin } from "@/hooks/dashboard/useFetchDashboardAdmin";
import { formatRupiah } from "@/libs/formatRupiah";
import { Spinner } from "@nextui-org/react";
import moment from "moment";
import "moment/locale/id"
import Image from "next/image";
import { Link } from 'next-view-transitions'

const page = () => {

  const { data, isLoading } = useFetchDashboardAdmin()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    )
  }
  return (
    <>
      <section className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <article className="flex items-center gap-4 rounded-xl border bg-white p-6 overflow-hidden">
          <span className="rounded-full bg-blue-50 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </span>
          <div>
            <p className="text-sm md:text-medium font-semibold text-gray-900 truncate">
              {formatRupiah(data?.count.totalNilaiAset)}
            </p>
            <p className="text-sm text-gray-500">Nilai Aset</p>
          </div>
        </article>
        <article className="flex items-center gap-4 rounded-xl border bg-white p-6">
          <span className="rounded-full bg-blue-50 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </span>

          <div>
            <p className="text-sm md:text-medium font-semibold text-gray-900">{data?.count.totalAset}</p>

            <p className="text-sm text-gray-500">Total Aset</p>
          </div>
        </article>
        <article className="flex items-center gap-4 rounded-xl border bg-white p-6">
          <span className="rounded-full bg-blue-50 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </span>

          <div>
            <p className="text-sm md:text-medium font-semibold text-gray-900">{data?.count.totalUser}</p>

            <p className="text-sm text-gray-500">Total User</p>
          </div>
        </article>
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="flex w-full flex-col rounded-xl border bg-white p-5 lg:col-span-2 gap-5">
          <h3 className="text-sm/tight sm:text-medium font-semibold">Nilai Aset</h3>
          <AreaCharts data={data?.nilaiAset} xAxis={"tahun"} yAxis={"nilaiAset"} />
        </div>
        <div className="w-full space-y-5 rounded-xl border bg-white p-5">
          <h3 className="text-sm/tight sm:text-medium font-semibold">Aset Terbaru</h3>
          {data?.listAset.map((aset) => {
            return (
              <Link href={`/admin/aset/${aset.aset.id}/detail-aset/${aset.id}`} className="flex items-center gap-4">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${aset.aset.image}`}
                  alt="profil"
                  width={500} height={500}
                  className="size-10 rounded-full object-cover"
                />

                <div>
                  <h3 className="text-sm/tight sm:text-medium font-medium text-gray-900">
                    {aset.aset.nama_barang}
                  </h3>
                  <p className="mt-0.5 text-sm/tight text-gray-400">{moment(aset.createdAt).format("DD MMMM YYYY")}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="w-full space-y-5 rounded-xl border bg-white p-5">
          <h3 className="text-sm/tight sm:text-medium font-semibold">User Terbaru</h3>
          {data?.listUsers.map((user) => {
            return (
              <div className="flex items-center gap-4">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${user.image}`}
                  alt="profil"
                  width={500} height={500}
                  className="size-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-sm/tight sm:text-medium font-medium text-gray-900">
                    {user.nama}
                  </h3>

                  <p className="mt-0.5 text-sm/tight text-gray-700 lowercase first-letter:uppercase">{user.role === "KEPALA_BAGIAN" ? "Kepala Bagian" : user.role}</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex w-full flex-col rounded-xl border bg-white p-5 lg:col-span-2 gap-5 min-h-64">
          <h3 className="text-sm/tight sm:text-medium font-semibold">Jumlah Aset</h3>
          <BarCharts data={data?.totalAset} xAxis={"tahun"} yAxis={"totalAset"} />
        </div>
      </section>
    </>
  );
};

export default page;
