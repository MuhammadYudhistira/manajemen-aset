"use client";
import { useFetchAset } from "@/hooks/aset/useFetchAset";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import React from "react";
import { Skeleton } from "@nextui-org/react";

const StatsAset = () => {
  const { data: aset, isLoading } = useFetchAset();

  if (isLoading) {
    return (
      <div className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
        <div className="flex w-full items-center gap-3 rounded-xl border bg-white p-6">
          <div>
            <Skeleton className="flex h-12 w-12 rounded-full" />
          </div>
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
        <div className="flex w-full items-center gap-3 rounded-xl border bg-white p-6">
          <div>
            <Skeleton className="flex h-12 w-12 rounded-full" />
          </div>
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
        <div className="flex w-full items-center gap-3 rounded-xl border bg-white p-6">
          <div>
            <Skeleton className="flex h-12 w-12 rounded-full" />
          </div>
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
        <div className="flex w-full items-center gap-3 rounded-xl border bg-white p-6">
          <div>
            <Skeleton className="flex h-12 w-12 rounded-full" />
          </div>
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
      <article className="flex items-center gap-4 rounded-xl border bg-white p-6">
        <span className="rounded-full bg-blue-50 p-3">
          <Inventory2OutlinedIcon />
        </span>

        <div>
          <p className="text-2xl font-medium text-gray-900">
            {aset?.count.all}
          </p>
          <p className="text-sm text-gray-500">Jumlah Aset</p>
        </div>
      </article>
      <article className="flex items-center gap-4 rounded-xl border bg-white p-6">
        <span className="rounded-full bg-blue-50 p-3">
          <CheckOutlinedIcon />
        </span>

        <div>
          <p className="text-2xl font-medium text-gray-900">
            {aset?.count.available}
          </p>
          <p className="text-sm text-gray-500">Aktif</p>
        </div>
      </article>
      <article className="flex items-center gap-4 rounded-xl border bg-white p-6">
        <span className="rounded-full bg-blue-50 p-3">
          <CloseOutlinedIcon />
        </span>

        <div>
          <p className="text-2xl font-medium text-gray-900">
            {aset?.count.damaged}
          </p>
          <p className="text-sm text-gray-500">Rusak</p>
        </div>
      </article>
      <article className="flex items-center gap-4 rounded-xl border bg-white p-6">
        <span className="rounded-full bg-blue-50 p-3">
          <BuildOutlinedIcon />
        </span>

        <div>
          <p className="text-2xl font-medium text-gray-900">
            {aset?.count.inactive}
          </p>
          <p className="text-sm text-gray-500">Tidak Aktif</p>
        </div>
      </article>
    </div>
  );
};

export default StatsAset;
