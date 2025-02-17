"use client";
import React, { useState } from "react";
import { DatePicker, Spinner } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import Dropzone from "../(input)/Dropzone";
import { useFormik } from "formik";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useCreateAset } from "@/hooks/aset/useCreateAset";

const CreateAsetForm = () => {
  const [image, setImage] = useState([]);
  const [date, setDate] = useState();
  const today = parseDate(new Date().toISOString().split("T")[0]);
  const fileAccept = { "image/png": [], "image/jpg": [], "image/jpeg": [] };

  const handleChangeDate = (newDate) => {
    const formatDate = new Date(newDate);
    setDate(formatDate);
  };

  const formik = useFormik({
    initialValues: {
      nama_barang: "",
      merk: "",
      deskripsi: "",
      ukuran: "",
      harga_satuan: "",
      jumlah_barang: "",
    },
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
      createProduct(formData);
    },
  });

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
    if (event.target.name === "kode_barang") {
      formik.setFieldValue(event.target.name, `1.3.2.${event.target.value}`);
    }
  };

  const {
    mutate: createProduct,
    isSuccess,
    isPending,
  } = useCreateAset({
    onSuccess: () => {
      toast.success("berhasil menambahkan aset");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.data.message);
    },
  });

  if (isSuccess) {
    redirect("/admin/aset");
  }

  return (
    <form className="w-full space-y-2" onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 gap-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Nama Barang</span>
          </div>
          <input
            type="text"
            placeholder="Nama Barang"
            name="nama_barang"
            onChange={handleFormInput}
            className="input bg-blue-50 text-sm text-black"
            required
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Kode Barang</span>
          </div>
          <div className="flex w-full items-center">
            <div className="rounded-l-lg bg-blue-50 py-4 pl-4 text-center text-sm text-black">
              1.3.2.
            </div>
            <input
              type="text"
              placeholder="Kode Barang"
              name="kode_barang"
              onChange={handleFormInput}
              className="w-full rounded-r-lg bg-blue-50 py-4 text-sm text-black focus:outline-none"
              required
            />
          </div>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Jenis Barang</span>
          </div>
          <select
            className="select bg-blue-50 text-sm"
            name="jenis_barang"
            onChange={handleFormInput}
            required
          >
            <option defaultValue={""} hidden>
              Jenis Barang
            </option>
            <option value={"Peralatan"}>Peralatan</option>
            <option value={"Kendaraan"}>Kendaraan</option>
          </select>
        </label>

      </div>
      {/* <DatePicker
        maxValue={today}
        name="tahun_perolehan"
        onChange={handleChangeDate}
        className="text-black"
        labelPlacement="outside"
        showMonthAndYearPickers
        label="Tahun perolehan"
        color={isError ? "danger" : "primary"}
      /> */}
      <div className="label">
        <span className="label-text">Gambar Barang</span>
      </div>
      <Dropzone
        files={image}
        setFiles={setImage}
        maxFiles={1}
        accept={fileAccept}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn mt-4 bg-black text-white hover:border-black hover:bg-white hover:text-black"
        >
          {isPending ? <Spinner /> : "Tambah Aset"}
        </button>
      </div>
    </form>
  );
};

export default CreateAsetForm;
