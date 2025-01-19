"use client";
import React, { useState } from "react";
import { DatePicker, Spinner } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import Dropzone from "../(input)/Dropzone";
import { useFormik } from "formik";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useFetchDetailAset } from "@/hooks/aset/useFetchDetailAset";
import Image from "next/legacy/image";
import { useEditAset } from "@/hooks/aset/useEditAset";

const EditAsetForm = ({ kode }) => {
  const { data: aset, isLoading } = useFetchDetailAset(kode);
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

  // const dateString = new Date(aset?.tahun_perolehan);
  // const dateObject = moment(dateString).format("MM-DD-YYYY");
  // const defaultDate = moment(dateString).format("YYYY-MM-DD");

  const [image, setImage] = useState([]);
  // const [date, setDate] = useState(null);
  // const today = parseDate(new Date().toISOString().split("T")[0]);

  const fileAccept = { "image/png": [], "image/jpg": [], "image/jpeg": [] };

  // const handleChangeDate = (newDate) => {
  //   console.log(newDate)
  //   const formatDate = new Date(newDate);
  //   setDate(formatDate);
  // };

  const formik = useFormik({
    initialValues: {
      nama_barang: aset?.nama_barang || "",
      jenis_barang: aset?.jenis_barang || "",
      kode_barang: aset?.kode_barang || "",
    },
    enableReinitialize: true,
    onSubmit: () => {
      const {
        nama_barang,
        kode_barang,
        jenis_barang,
      } = formik.values;
      const formData = new FormData();
      formData.append("nama_barang", nama_barang);
      formData.append("kode_barang", kode_barang);
      formData.append("jenis_barang", jenis_barang);
      for (let i = 0; i < image.length; i++) {
        formData.append("image", image[i]);
      }
      let object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });
      console.log(object);

      editAset({ kode: aset?.kode_barang, body: formData });
    },
  });

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  if (isSuccess) {
    redirect(`/admin/aset/${kode}`);
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <form className="w-full space-y-2" onSubmit={formik.handleSubmit}>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Kode Barang</span>
        </div>
        <input
          type="text"
          placeholder="Merk"
          name="kode_barang"
          value={formik.values.kode_barang}
          onChange={handleFormInput}
          className="input bg-blue-50 text-sm text-black"
          required
          disabled
        />
      </label>
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
          <span className="label-text">Jenis Aset</span>
        </div>
        <select
          className="select bg-blue-50 text-sm"
          name="jenis_barang"
          value={formik.values.jenis_barang}
          onChange={handleFormInput}
          required
        >
          <option defaultValue={""} hidden>
            Jenis Aset
          </option>
          <option value={"Peralatan"}>Peralatan</option>
          <option value={"Kendaraan"}>Kendaraan</option>
        </select>
      </label>
      {/* <DatePicker
        maxValue={today}
        defaultValue={parseDate(defaultDate)}
        name="tahun_perolehan"
        onChange={handleChangeDate}
        className="z-0"
        labelPlacement="outside"
        showMonthAndYearPickers
        label={`Tahun perolehan`}
        color="primary"
      /> */}
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
