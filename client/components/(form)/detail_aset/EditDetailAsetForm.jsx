"use client";
import Dropzone from "@/components/(input)/Dropzone";
import { useFetchDA } from "@/hooks/detail_aset/useFetchDA";
import { useFetchRuangan } from "@/hooks/ruangan/useFetchRuangan";
import { useFormik } from "formik";
import Image from "next/image";
import { useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useDeleteDAImage } from "@/hooks/detail_aset/useDeleteDAImage";
import { toast } from "sonner";
import { useEditDA } from "@/hooks/detail_aset/useEditDA";
import { redirect } from "next/navigation";
import { DatePicker, Spinner } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import React from "react";
import moment from "moment";

const EditDetailAsetForm = ({ kode_detail }) => {
  const { data: lokasi } = useFetchRuangan();
  const { data: aset, refetch, isLoading } = useFetchDA(kode_detail);

  const today = parseDate(new Date().toISOString().split("T")[0]);

  const dateString = new Date(aset?.tahun_perolehan);
  const defaultDate = moment(dateString).format("YYYY-MM-DD");
  const [date, setDate] = useState(defaultDate);

  const handleChangeDate = (newDate) => {
    const formatDate = new Date(newDate);
    setDate(formatDate);
  };

  const selectedruangan = lokasi?.find((r) => r?.id === aset?.id_lokasi);

  const { mutate: deleteImage } = useDeleteDAImage({
    onSuccess: () => {
      toast.success("berhasil menghapus gambar");
      refetch();
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
    },
  });

  const {
    mutate: editDetailAset,
    isSuccess,
    isPending,
  } = useEditDA({
    onSuccess: () => {
      toast.success("Berhasil mengupdate data detail aset");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
      console.log(error);
    },
  });

  const [image, setImage] = useState([]);
  const fileAccept = { "image/png": [], "image/jpg": [], "image/jpeg": [] };


  const formik = useFormik({
    initialValues: {
      kode_barang: aset?.kode_barang || "",
      id_lokasi: aset?.id_lokasi || "",
      merk: aset?.merk || "",
      ukuran: aset?.ukuran || "",
      kode_detail: aset?.kode_detail || "",
      nomor_rangka: aset?.Aset_Kendaraan?.nomor_rangka || "",
      nomor_mesin: aset?.Aset_Kendaraan?.nomor_mesin || "",
      nomor_polisi: aset?.Aset_Kendaraan?.nomor_polisi || "",
      nomor_bpkb: aset?.Aset_Kendaraan?.nomor_bpkb || "",
      keterangan: aset?.keterangan || "",
      nomor_pengadaan: aset?.nomor_pengadaan || "",
      harga_satuan: aset?.harga_satuan || "",
    },
    enableReinitialize: true,
    onSubmit: () => {
      const {
        kode_barang,
        id_lokasi,
        merk,
        ukuran,
        harga_satuan,
        nomor_bpkb,
        nomor_mesin,
        nomor_polisi,
        nomor_rangka,
      } = formik.values;
      const formData = new FormData();
      formData.append("kode_barang", kode_barang);
      formData.append("id_lokasi", id_lokasi);
      formData.append("merk", merk);
      formData.append("ukuran", ukuran);
      formData.append("tahun_perolehan", date || null);
      formData.append("harga_satuan", harga_satuan);
      formData.append("nomor_bpkb", nomor_bpkb);
      formData.append("nomor_mesin", nomor_mesin);
      formData.append("nomor_polisi", nomor_polisi);
      formData.append("nomor_rangka", nomor_rangka);
      formData.append("nomor_pengadaan", "11");
      for (let i = 0; i < image.length; i++) {
        formData.append(`image`, image[i]);
      }
      editDetailAset({ kode: kode_detail, body: formData });

      // Melihat isi formData
      for (let pair of formData.entries()) {
        // Jika pair[1] adalah objek File, tampilkan nama filenya
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

  const handleDeleteClick = ({ imageId, link }) => {
    const body = { imageId, link };
    deleteImage({ body });
  };

  if (isSuccess) {
    redirect(`/admin/detail_aset/${kode_detail}`);
  }

  if (isLoading) {
    <Spinner />
  }

  return (
    <form className="w-full space-y-2" onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Kode Detail</span>
          </div>
          <input
            type="text"
            placeholder="Kode Detail"
            name="kode_detail"
            value={formik.values.kode_detail}
            onChange={handleFormInput}
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
            value={formik.values.merk}
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
            value={formik.values.ukuran}
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
            value={formik.values.harga_satuan}
            onChange={handleFormInput}
            className="input bg-blue-50 text-sm text-black"
            required
          />
        </label>
        {aset?.aset?.jenis_barang === 'Kendaraan' && (
          <>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Nomor Rangka</span>
              </div>
              <input
                type="text"
                placeholder="Nomor Rangka"
                name="nomor_rangka"
                value={formik.values.nomor_rangka}
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
                value={formik.values.nomor_mesin}
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
                value={formik.values.nomor_polisi}
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
                value={formik.values.nomor_bpkb}
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
            <option defaultValue={selectedruangan?.id_lokasi} hidden>
              {selectedruangan?.nama_lokasi}
            </option>
            {lokasi?.map((lokasi, index) => {
              return (
                <option value={lokasi?.id} key={index}>
                  {lokasi?.nama_lokasi}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <DatePicker
        maxValue={today}
        defaultValue={parseDate(defaultDate)}
        name="tahun_perolehan"
        onChange={handleChangeDate}
        className="z-0"
        labelPlacement="outside"
        showMonthAndYearPickers
        label={`Tahun perolehan`}
        color="primary"
      />
      <div className="label flex flex-col items-start gap-3">
        <span className="label-text">Gambar Barang</span>
        <div className="flex gap-3">
          {aset?.Detail_Aset_Images
            ? aset?.Detail_Aset_Images?.map((image, index) => {
              return (
                <div className="relative rounded-md shadow-lg" key={index}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${image.link}`}
                    alt="image"
                    width={150}
                    height={150}
                    className="max-h-[150px] rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    className="absolute -right-3 -top-3 flex items-center justify-center rounded-full bg-white"
                    onClick={() =>
                      handleDeleteClick({
                        imageId: image.id,
                        link: image.link,
                      })
                    }
                  >
                    <CancelOutlinedIcon className="text-red-500" />
                  </button>
                </div>
              );
            })
            : null}
        </div>
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
          {isPending ? <Spinner /> : "Edit Aset"}
        </button>
      </div>
    </form>
  );
};

export default EditDetailAsetForm;
