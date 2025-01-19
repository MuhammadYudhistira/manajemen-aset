"use client";
import Dropzone from "@/components/(input)/Dropzone";
import { useFetchDetailAset } from "@/hooks/aset/useFetchDetailAset";
import { useFetchRuangan } from "@/hooks/ruangan/useFetchRuangan";
import axios from "@/libs/axios";
import { parseDate } from "@internationalized/date";
import { DatePicker, Spinner } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CreateDetailAsetForm = ({ kode }) => {
  const { data: lokasi } = useFetchRuangan();
  const { data: aset } = useFetchDetailAset(kode)

  const [image, setImage] = useState([]);
  const fileAccept = { "image/png": [], "image/jpg": [], "image/jpeg": [] };

  const [date, setDate] = useState();
  const today = parseDate(new Date().toISOString().split("T")[0]);

  const handleChangeDate = (newDate) => {
    const formatDate = new Date(newDate);
    setDate(formatDate);
  };

  const {
    mutate: createDetailAset,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async ({ kode, body }) => {
      const response = await axios.post(`/aset/${kode}/detail-aset`, body);
      return response;
    },
    onSuccess: () => {
      toast.success("Berhasil menambahkan data Detail Aset");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
    },
  });

  const formik = useFormik({
    initialValues: {
      kode_barang: kode,
      nomor_pengadaan: "",
      nomor_rangka: "",
      nomor_mesin: "",
      nomor_polisi: "",
      nomor_bpkb: "",
      id_lokasi: "",
    },
    onSubmit: () => {
      const {
        kode_barang,
        nomor_pengadaan,
        nomor_bpkb,
        nomor_mesin,
        nomor_polisi,
        nomor_rangka,
        id_lokasi,
        merk,
        ukuran,
        harga_satuan,
      } = formik.values;
      const formData = new FormData();
      formData.append("kode_barang", kode_barang);
      formData.append("id_lokasi", id_lokasi);
      formData.append("merk", merk);
      formData.append("ukuran", ukuran);
      formData.append("tahun_perolehan", date);
      formData.append("harga_satuan", harga_satuan);
      formData.append("nomor_bpkb", nomor_bpkb);
      formData.append("nomor_mesin", nomor_mesin);
      formData.append("nomor_polisi", nomor_polisi);
      formData.append("nomor_rangka", nomor_rangka);
      formData.append("nomor_pengadaan", "11");
      for (let i = 0; i < image.length; i++) {
        formData.append(`image`, image[i]);
      }
      createDetailAset({ kode, body: formData });

      // Melihat isi formData
      for (let pair of formData.entries()) {
        if (pair[1] instanceof File) {
          console.log(pair[0] + ': ' + pair[1].name);
        } else {
          console.log(pair[0] + ': ' + pair[1]);
        }
      }
    },
  });

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  if (isSuccess) {
    redirect(`/admin/aset/${kode}`);
  }

  return (
    <form className="w-full space-y-2" onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Kode Barang</span>
          </div>
          <input
            type="text"
            placeholder="Kode Barang"
            name="kode_barang"
            value={kode}
            className="input bg-blue-50 text-sm text-black"
            disabled
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
            onChange={handleFormInput}
            className="input bg-blue-50 text-sm text-black"
            required
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Ukuran</span>
          </div>
          <input
            type="text"
            placeholder="Ukuran"
            name="ukuran"
            onChange={handleFormInput}
            className="input bg-blue-50 text-sm text-black"
            required
          />
        </label>
        {/* <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Nomor Pengadaan</span>
          </div>
          <input
            type="text"
            placeholder="Nomor Pengadaan"
            name="nomor_pengadaan"
            onChange={handleFormInput}
            className="input bg-blue-50 text-sm text-black"
          />
        </label> */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Harga Satuan</span>
          </div>
          <input
            type="number"
            placeholder="Harga Satuan"
            name="harga_satuan"
            onChange={handleFormInput}
            className="input bg-blue-50 text-sm text-black"
            required
          />
        </label>
        {aset?.jenis_barang === 'Kendaraan' && (
          <>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Nomor Rangka</span>
              </div>
              <input
                type="text"
                placeholder="Nomor Rangka"
                name="nomor_rangka"
                onChange={handleFormInput}
                className="input bg-blue-50 text-sm text-black"
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Nomor Mesin</span>
              </div>
              <input
                type="text"
                placeholder="Nomor Mesin"
                name="nomor_mesin"
                onChange={handleFormInput}
                className="input bg-blue-50 text-sm text-black"
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Nomor Polisi</span>
              </div>
              <input
                type="text"
                placeholder="Nomor Polisi"
                name="nomor_polisi"
                onChange={handleFormInput}
                className="input bg-blue-50 text-sm text-black"
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Nomor BPKB</span>
              </div>
              <input
                type="text"
                placeholder="Nomor BPKB"
                name="nomor_bpkb"
                onChange={handleFormInput}
                className="input bg-blue-50 text-sm text-black"
              />
            </label>
          </>
        )}

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Ruangan</span>
          </div>
          <select
            className="select bg-blue-50 text-sm"
            name="id_lokasi"
            onChange={handleFormInput}
          >
            <option defaultValue={""} hidden>
              Ruangan
            </option>
            {lokasi?.map((lokasi, index) => {
              return (
                <option value={lokasi.id} key={index}>
                  {lokasi.nama_lokasi}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <DatePicker
        maxValue={today}
        name="tahun_perolehan"
        onChange={handleChangeDate}
        className="text-black"
        labelPlacement="outside"
        showMonthAndYearPickers
        label="Tahun perolehan"
        color={"primary"}
      />
      <div className="label">
        <span className="label-text">Gambar Barang</span>
      </div>
      <Dropzone
        files={image}
        setFiles={setImage}
        maxFiles={4}
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

export default CreateDetailAsetForm;
