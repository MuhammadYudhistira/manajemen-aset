"use client";
import DropzoneFile from "@/components/(input)/DropzoneFile";
import { useFetchAset } from "@/hooks/aset/useFetchAset";
import { useCreatePengadaan } from "@/hooks/pengadaan/useCreatePengadaan";
import { useFetchRuangan } from "@/hooks/ruangan/useFetchRuangan";
import { parseDate } from "@internationalized/date";
import { DatePicker, Spinner } from "@nextui-org/react";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import { Router } from "next/router";
import React, { useState } from "react";
import { toast } from "sonner";

const InputPengadaan = () => {
  const [dokumen_pengadaan, setDokumen_pengadaan] = useState([]);
  const fileAccept = { "application/pdf": [] };

  const [date, setDate] = useState();
  const today = parseDate(new Date().toISOString().split("T")[0]);

  const { data: lokasi } = useFetchRuangan()
  const { data: asets } = useFetchAset()

  const { mutate: createPengadaan, isSuccess, isPending } = useCreatePengadaan({
    onSuccess: () => {
      toast.success("berhasil menambahkan aset");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Tahun perolehan harus ditambahkan");
    },
  });

  const handleChangeDate = (newDate) => {
    const formatDate = new Date(newDate);
    setDate(formatDate);
  };

  const formik = useFormik({
    initialValues: {
      nomor_pengadaan: "",
      nama_vendor: "",
      tanggal_pengadaan: "",
      detail_barang: [
        {
          kode_barang: "",
          merk: "",
          ukuran: "",
          id_lokasi: "",
          harga_satuan: "",
          jumlah_barang: "",
          tahun_perolehan: "",
        },
      ],
    },
    onSubmit: () => {
      const {
        nomor_pengadaan,
        nama_vendor,
      } = formik.values;

      // FormData untuk CreateRepairReport
      const formData = new FormData();
      formData.append("nomor_pengadaan", nomor_pengadaan);
      formData.append("nama_vendor", nama_vendor);
      formData.append("tanggal_pengadaan", date);
      formData.append("dokumen_pengadaan", dokumen_pengadaan[0]);

      // You can append detail_barang here
      formik.values.detail_barang.forEach((item, index) => {
        formData.append(`detail_barang[${index}].kode_barang`, item.kode_barang);
        formData.append(`detail_barang[${index}].merk`, item.merk);
        formData.append(`detail_barang[${index}].ukuran`, item.ukuran);
        formData.append(`detail_barang[${index}].id_lokasi`, item.id_lokasi);
        formData.append(`detail_barang[${index}].harga_satuan`, item.harga_satuan);
        formData.append(`detail_barang[${index}].jumlah_barang`, item.jumlah_barang);
        formData.append(`detail_barang[${index}].tahun_perolehan`, item.tahun_perolehan);
      });


      // Mengonversi FormData menjadi objek
      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });

      // Melihat objek FormData yang telah di-convert
      console.log(formDataObject);
      createPengadaan(formData);

    },
  });

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const handleAddDetailBarang = () => {
    formik.setFieldValue("detail_barang", [
      ...formik.values.detail_barang,
      {
        kode_barang: "",
        merk: "",
        ukuran: "",
        id_lokasi: "",
        harga_satuan: "",
        jumlah_barang: "",
      },
    ]);
  };

  const handleRemoveDetailBarang = (index) => {
    const newDetailBarang = [...formik.values.detail_barang];
    newDetailBarang.splice(index, 1);
    formik.setFieldValue("detail_barang", newDetailBarang);
  };

  if (isSuccess) {
    redirect(`/admin/pengadaan`);
  }

  return (
    <form className="w-full space-y-2" onSubmit={formik.handleSubmit}>
      <div className="rounded-xl bg-white p-5">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Nomor Pengadaan</span>
          </div>
          <input
            type="text"
            placeholder="Nomor Pengadaan"
            name="nomor_pengadaan"
            onChange={handleFormInput}
            className="input bg-blue-50 text-sm text-black"
            required
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Nama Vendor</span>
          </div>
          <input
            type="text"
            placeholder="Nama Vendor"
            name="nama_vendor"
            onChange={handleFormInput}
            className="input bg-blue-50 text-sm text-black"
            required
          />
        </label>
        <DatePicker
          maxValue={today}
          name="tahun_perolehan"
          onChange={handleChangeDate}
          className="text-black mt-2"
          labelPlacement="outside"
          showMonthAndYearPickers
          label="Tahun perolehan"
          color={"primary"}
        />
        <div className="label mt-5">
          <span className="label-text text-[1rem] font-medium">Dokumen Pengadaan</span>
        </div>
        <DropzoneFile
          files={dokumen_pengadaan}
          setFiles={setDokumen_pengadaan}
          maxFiles={1}
          accept={fileAccept}
        />
      </div>

      {/* Dynamic Input Section */}
      <div className="rounded-xl bg-white p-5">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Detail Barang</h3>
          <button
            type="button"
            onClick={handleAddDetailBarang}
            className="btn bg-black text-white"
          >
            Tambah Barang
          </button>
        </div>
        {formik.values.detail_barang.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Kode Barang</span>
                </div>
                <select
                  className="select bg-blue-50 text-sm"
                  name={`detail_barang[${index}].kode_barang`}
                  onChange={handleFormInput}
                >
                  <option defaultValue={""} hidden>
                    Kode Barang
                  </option>
                  {asets?.listAssets?.map((aset, idx) => {
                    return (
                      <option value={aset.kode_barang} key={idx}>
                        {aset.nama_barang}({aset.kode_barang})
                      </option>
                    );
                  })}
                </select>
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Merk</span>
                </div>
                <input
                  type="text"
                  placeholder="Merk"
                  name={`detail_barang[${index}].merk`}
                  value={item.merk}
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
                  name={`detail_barang[${index}].ukuran`}
                  value={item.ukuran}
                  onChange={handleFormInput}
                  className="input bg-blue-50 text-sm text-black"
                  required
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Ruangan</span>
                </div>
                <select
                  className="select bg-blue-50 text-sm"
                  name={`detail_barang[${index}].id_lokasi`}
                  onChange={handleFormInput}
                >
                  <option defaultValue={""} hidden>
                    Ruangan
                  </option>
                  {lokasi?.map((lokasi, idx) => {
                    return (
                      <option value={lokasi.id} key={idx}>
                        {lokasi.nama_lokasi} {/* Tetap tampilkan nama lokasi sebagai label */}
                      </option>
                    );
                  })}
                </select>
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Harga Satuan</span>
                </div>
                <input
                  type="number"
                  placeholder="Harga Satuan"
                  name={`detail_barang[${index}].harga_satuan`}
                  value={item.harga_satuan}
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
                  placeholder="Jumlah barang"
                  name={`detail_barang[${index}].jumlah_barang`}
                  value={item.jumlah_barang}
                  onChange={handleFormInput}
                  className="input bg-blue-50 text-sm text-black"
                  required
                />
              </label>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveDetailBarang(index)}
              className="btn bg-red-100 mt-2 text-red-500"
            >
              Hapus Barang
            </button>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn mt-4 bg-black text-white hover:border-black hover:bg-white hover:text-black"
        >
          {isPending ? <Spinner /> : "Tambah Pengadaan"}
        </button>
      </div>
    </form>
  );
};

export default InputPengadaan;
