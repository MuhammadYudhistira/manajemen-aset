"use client"
import AreaCharts from "@/components/(charts)/AreaChart";
import BarCharts from "@/components/(charts)/BarCharts";
import { useFetchDashboardAdmin } from "@/hooks/dashboard/useFetchDashboardAdmin";
import { useFetchDashboardHead } from "@/hooks/dashboard/useFetchDashboardHead";
import { Spinner } from "@nextui-org/react";
import moment from "moment";
import Link from "next/link";
import React from "react";

const page = () => {

  const { data: dataHead, isLoading } = useFetchDashboardHead()
  const { data } = useFetchDashboardAdmin()

  if (isLoading) {
    return (
      <Spinner />
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
            <p className="text-xl font-medium text-gray-900 truncate">
              {dataHead?.count.totalAset}
            </p>
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
            <p className="text-xl font-medium text-gray-900">{dataHead?.count.total}</p>

            <p className="text-sm text-gray-500">Laporan Kerusakan</p>
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
            <p className="text-xl font-medium text-gray-900">{dataHead?.count.reported}</p>

            <p className="text-sm text-gray-500">Belum diulas</p>
          </div>
        </article>
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8">
        <div className="flex w-full flex-col rounded-xl border bg-white p-5 lg:col-span-3 gap-5 min-h-64">
          <h3 className="font-bold">Jumlah Aset</h3>
          <BarCharts data={data?.totalAset} xAxis={"tahun"} yAxis={"totalAset"} />
        </div>
        <div className="flex w-full flex-col rounded-xl border bg-white p-5 lg:col-span-2 gap-5 min-h-64">
          <div>
            <h3 className="font-bold">Laporan Kerusakan Terbaru</h3>
          </div>
          {dataHead?.listDamages?.map((damage) => {
            return (
              <Link href={`/head/laporan_kerusakan/${damage.id}`} key={damage.id}>
                <p className="text-sm font-medium capitalize">{damage?.perihal}</p>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-400 font-medium">{moment(damage?.createdAt).format("DD-MM-YYYY")}</p>
                  {damage.status === "Reported" && (
                    <span className="inline-flex items-center justify-center rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700">
                      <p className="whitespace-nowrap text-xs">{damage.status}</p>
                    </span>
                  )}

                  {damage.status === "Approved" && (
                    <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                      <p className="whitespace-nowrap text-xs">{damage.status}</p>
                    </span>
                  )}

                  {damage.status === "Rejected" && (
                    <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                      <p className="whitespace-nowrap text-xs">{damage.status}</p>
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </section>
      <section className="grid grid-cols-1">
        <div className="flex w-full flex-col rounded-xl border bg-white p-5">
          <h3 className="font-bold">Nilai Aset</h3>
          <AreaCharts data={data?.nilaiAset} xAxis={"tahun"} yAxis={"nilaiAset"} />
        </div>
      </section>
    </>
  )
};

export default page;
