"use client";
import { useFetchListBarang } from "@/hooks/barang/useFetchListBarang";
import { useCreatePengadaan } from "@/hooks/pengadaan/useCreatePengadaan";
import { useCreatePengajuan } from "@/hooks/pengajuan/useCreatePengajuan";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CreatePengajuanForm = () => {
  const { data: barang } = useFetchListBarang();

  const { mutate: createPengadaan, isSuccess, isPending } = useCreatePengajuan({
    onSuccess: () => {
      toast.success("Berhasil menambahkan pengajuan");
    },
    onError: (error) => {
      const response = JSON.parse(error.request.response);
      toast.error(response.message);
    },
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      unit_pengajuan: "",
      detail_pengajuan: [],
    },
    onSubmit: (values) => {
      console.log("Submitted Values:", values);
      if (values.detail_pengajuan.length === 0) {
        toast.error("Pilih barang terlebih dahulu");
        return;
      }
      createPengadaan(values)
    },
  });

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const handleCheckboxChange = (event, item) => {
    const isChecked = event.target.checked;
    formik.setFieldValue(
      "detail_pengajuan",
      isChecked
        ? [...formik.values.detail_pengajuan, { kode_barang: item.kode_barang, nama_barang: item.nama_barang, jumlah_barang: 1 }]
        : formik.values.detail_pengajuan.filter((barang) => barang.kode_barang !== item.kode_barang)
    );
  };

  const handleQuantityChange = (event, kode_barang) => {
    const newQuantity = parseInt(event.target.value, 10) || 1;
    formik.setFieldValue(
      "detail_pengajuan",
      formik.values.detail_pengajuan.map((barang) =>
        barang.kode_barang === kode_barang ? { ...barang, jumlah_barang: newQuantity } : barang
      )
    );
  };

  if (isSuccess) {
    redirect(`/staff/usulan`);
  }

  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <div className='bg-white p-5 rounded-lg border space-y-2'>
          <h3 className='text-xl font-semibold'>Request Detail</h3>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Request Title</span>
            </div>
            <input
              type="text"
              placeholder="e.g. Laptop Baru Untuk Unit IT"
              name="title"
              onChange={handleFormInput}
              value={formik.values.title}
              className="input bg-blue-50 text-sm text-black"
              required
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Unit</span>
            </div>
            <select
              className="select bg-blue-50 text-sm"
              name="unit_pengajuan"
              onChange={handleFormInput}
              value={formik.values.unit_pengajuan}
              required
            >
              <option value="" hidden>Pilih Unit</option>
              <option value="Komisi 1">Komisi 1</option>
              <option value="Komisi 2">Komisi 2</option>
              <option value="Komisi 3">Komisi 3</option>
              <option value="Komisi 4">Komisi 4</option>
              <option value="Komisi 5">Komisi 5</option>
              <option value="Umum dan Keuangan">Umum dan Keuangan</option>
              <option value="Persidangan dan Perundang-undangan">Persidangan dan Perundang-undangan</option>
              <option value="Fasilitasi Penganggaran dan Pengawasan">Fasilitasi Penganggaran dan Pengawasan</option>
            </select>
          </label>
        </div>
        <div className='bg-white p-5 rounded-lg border space-y-2'>
          <h3 className='text-xl font-semibold'>Pilih Barang</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {barang?.map((item) => (
              <fieldset key={item.kode_barang}>
                <div className="space-y-2">
                  <label htmlFor={item.kode_barang} className="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50">
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheckboxChange(e, item)}
                      checked={formik.values.detail_pengajuan.some((barang) => barang.kode_barang === item.kode_barang)}
                      className="size-4 rounded-sm border-gray-300"
                      id={item.kode_barang}
                    />
                    <div>
                      <strong className="font-medium text-gray-900">{item.nama_barang}</strong>
                      <p className="mt-1 text-xs text-gray-700">Kode Barang : {item.kode_barang}</p>
                      <p className="mt-1 text-xs text-gray-700">Jenis Barang: {item.jenis_barang}</p>
                    </div>
                    {formik.values.detail_pengajuan.some((barang) => barang.kode_barang === item.kode_barang) && (
                      <label className="form-control w-10 ml-5">
                        <div className="label">
                          <span className="label-text text-xs">Qty</span>
                        </div>
                        <input
                          type="number"
                          min="1"
                          value={formik.values.detail_pengajuan.find((barang) => barang.kode_barang === item.kode_barang)?.jumlah_barang || 1}
                          onChange={(e) => handleQuantityChange(e, item.kode_barang)}
                          className="input input-xs bg-blue-50 text-xs text-black mt-2"
                        />
                      </label>
                    )}
                  </label>
                </div>
              </fieldset>
            ))}
          </div>
        </div>
        <div className="flex justify-end items-center">
          <button type="submit" className="w-full btn bg-black text-white">Create Request</button>
        </div>
        {formik.values.detail_pengajuan.length !== 0 && (
          <div className="bg-white p-5 rounded-lg border space-y-2">
            <h3 className="text-xl font-semibold">Selected Barang</h3>
            {formik.values.detail_pengajuan.map((barang) => {
              return (
                <div key={barang.kode_barang} className="flex gap-8 items-center justify-between">
                  <p className="text-sm">{barang.nama_barang} ({barang.kode_barang})</p>
                  <p className="text-sm text-gray-500">Quantity: {barang.jumlah_barang}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </form>
  );
};

export default CreatePengajuanForm;