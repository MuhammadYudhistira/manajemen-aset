"use client";
import React, { useState } from "react";
import { DatePicker, Spinner } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import Dropzone from "../(input)/Dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useFetchDetailAset } from "@/hooks/aset/useFetchDetailAset";
import Image from "next/legacy/image";
import { useEditAset } from "@/hooks/aset/useEditAset";
import moment from "moment";

const EditAsetForm = ({ id }) => {
  const { data: aset, isLoading } = useFetchDetailAset(id);
  const {
    mutate: editAset,
    isPending,
    isSuccess,
  } = useEditAset({
    onSuccess: () => {
      toast.success("berhasil mengupdate Data");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const dateString = new Date(aset?.tahun_perolehan);
  const dateObject = moment(dateString).format("MM-DD-YYYY");

  const [image, setImage] = useState([]);
  const [date, setDate] = useState(dateObject || null);
  const today = parseDate(new Date().toISOString().split("T")[0]);
  const fileAccept = { "image/png": [], "image/jpg": [], "image/jpeg": [] };

  const handleChangeDate = (newDate) => {
    const formatDate = new Date(newDate);
    setDate(formatDate);
  };

  const formik = useFormik({
    initialValues: {
      nama_barang: aset?.nama_barang || "",
      merk: aset?.merk || "",
      deskripsi: aset?.deskripsi || "",
      ukuran: aset?.ukuran || "",
      harga_satuan: aset?.harga_satuan || "",
      jumlah_barang: aset?.jumlah_barang || "",
    },
    enableReinitialize: true,
    onSubmit: () => {
      console.log(formik.values);
      const {
        nama_barang,
        deskripsi,
        merk,
        harga_satuan,
        jumlah_barang,
        ukuran,
      } = formik.values;
      const formData = new FormData();
      formData.append("nama_barang", nama_barang);
      formData.append("deskripsi", deskripsi);
      formData.append("merk", merk);
      formData.append("harga_satuan", harga_satuan);
      formData.append("jumlah_barang", jumlah_barang);
      formData.append("ukuran", ukuran);
      formData.append("tahun_perolehan", date);
      for (let i = 0; i < image.length; i++) {
        formData.append("image", image[i]);
      }
      // let object = {};
      // formData.forEach(function (value, key) {
      //     object[key] = value;
      // });
      // console.log(object);

      editAset({ id, body: formData });
    },
  });

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  if (isSuccess) {
    redirect(`/admin/aset/${id}`);
  }

  return (
    <form className="w-full space-y-2" onSubmit={formik.handleSubmit}>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Nama Barang</span>
        </div>
        <input
          type="text"
          placeholder="Nama Barang"
          name="nama_barang"
          value={formik.values.nama_barang}
          onChange={handleFormInput}
          className="input bg-blue-50 text-sm text-black"
          required
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Merk</span>
        </div>
        <input
          type="text"
          placeholder="Merk"
          name="merk"
          value={formik.values.merk}
          onChange={handleFormInput}
          className="input bg-blue-50 text-sm text-black"
          required
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Deskripsi</span>
        </div>
        <textarea
          type="text"
          placeholder="Deskripsi"
          name="deskripsi"
          value={formik.values.deskripsi}
          onChange={handleFormInput}
          className="input textarea bg-blue-50 text-sm text-black"
          required
        />
      </label>
      <DatePicker
        maxValue={today}
        name="tahun_perolehan"
        onChange={handleChangeDate}
        className="z-0"
        labelPlacement="outside"
        showMonthAndYearPickers
        label={`Tahun perolehan : ${dateObject}`}
        color="primary"
      />
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Ukuran</span>
        </div>
        <input
          type="text"
          placeholder="Ukuran"
          name="ukuran"
          value={formik.values.ukuran}
          onChange={handleFormInput}
          className="input bg-blue-50 text-sm text-black"
          required
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Harga Satuan</span>
        </div>
        <input
          type="number"
          placeholder="harga_satuan"
          name="harga_satuan"
          value={formik.values.harga_satuan}
          onChange={handleFormInput}
          className="input bg-blue-50 text-sm text-black"
          required
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Jumlah Barang</span>
        </div>
        <input
          type="number"
          placeholder="Jumlah Barang"
          name="jumlah_barang"
          value={formik.values.jumlah_barang}
          onChange={handleFormInput}
          className="input bg-blue-50 text-sm text-black"
          required
        />
      </label>
      <div className="flex flex-col gap-3">
        <span className="label-text">Gambar Barang</span>
        {aset?.image ? (
          <div className="relative mb-2 w-[150px] rounded-md shadow-lg">
            <Image
              alt={aset?.nama_barang || "aset"}
              src={aset?.image}
              width={150}
              height={150}
              priority
              className="h-auto w-auto rounded-lg object-cover object-top"
            />
          </div>
        ) : null}
      </div>
      <Dropzone
        files={image}
        setFiles={setImage}
        maxFiles={1}
        accept={fileAccept}
        maxSize={1024 * 1024 * 5}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn mt-4 bg-black text-white hover:border-black hover:bg-white hover:text-black"
        >
          {isPending ? <Spinner /> : "Edit Aset"}
        </button>
      </div>
    </form>
  );
};

export default EditAsetForm;
