"use client";
import Dropzone from "@/components/(input)/Dropzone";
import { useFetchRuangan } from "@/hooks/ruangan/useFetchRuangan";
import axios from "@/libs/axios";
import { Spinner } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CreateDetailAsetForm = ({ id }) => {
  const { data: ruangans } = useFetchRuangan();

  const [image, setImage] = useState([]);
  const fileAccept = { "image/png": [], "image/jpg": [], "image/jpeg": [] };

  const {
    mutate: createDetailAset,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async ({ id, body }) => {
      const response = await axios.post(`/aset/${id}/detail-aset`, body);
      console.log(response);
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
      kode_barang: "",
      nomor_rangka: "",
      nomor_mesin: "",
      nomor_polisi: "",
      nomor_bpkb: "",
      keterangan: "",
      id_ruangan: "",
      id_aset: id,
    },
    onSubmit: () => {
      const {
        id_aset,
        id_ruangan,
        kode_barang,
        nomor_bpkb,
        nomor_mesin,
        nomor_polisi,
        nomor_rangka,
        keterangan,
      } = formik.values;
      const formData = new FormData();
      formData.append("id_aset", id_aset);
      formData.append("id_ruangan", id_ruangan);
      formData.append("kode_barang", kode_barang);
      formData.append("nomor_bpkb", nomor_bpkb);
      formData.append("nomor_mesin", nomor_mesin);
      formData.append("nomor_polisi", nomor_polisi);
      formData.append("nomor_rangka", nomor_rangka);
      formData.append("keterangan", keterangan);
      for (let i = 0; i < image.length; i++) {
        formData.append(`image`, image[i]);
      }
      createDetailAset({ id, body: formData });
      //Melihat isi formData
      // for (let pair of formData.entries()) {
      //     // Jika pair[1] adalah objek File, tampilkan nama filenya
      //     if (pair[1] instanceof File) {
      //         console.log(pair[0] + ': ' + pair[1].name);
      //     } else {
      //         console.log(pair[0] + ': ' + pair[1]);
      //     }
      // }
    },
  });

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
    if (event.target.name === "kode_barang") {
      formik.setFieldValue(event.target.name, `1.3.2.${event.target.value}`);
    }
  };

  if (isSuccess) {
    redirect(`/admin/aset/${id}`);
  }

  return (
    <form className="w-full space-y-2" onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
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
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Ruangan</span>
          </div>
          <select
            className="select bg-blue-50 text-sm"
            name="id_ruangan"
            onChange={handleFormInput}
          >
            <option defaultValue={""} hidden>
              Ruangan
            </option>
            {ruangans?.map((ruangan, index) => {
              return (
                <option value={ruangan.id} key={index}>
                  {ruangan.nama_ruangan}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Keterangan</span>
        </div>
        <textarea
          type="text"
          placeholder="Keterangan"
          name="keterangan"
          onChange={handleFormInput}
          className="input textarea bg-blue-50 text-sm text-black"
        />
      </label>
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
