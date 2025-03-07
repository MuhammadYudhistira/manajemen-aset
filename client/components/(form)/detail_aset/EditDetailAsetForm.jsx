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
import { Spinner } from "@nextui-org/react";
import React from "react";
import { useFetchDetailDP } from "@/hooks/detail_pengadaan/UseFetchDetailDP";
import { useEditDP } from "@/hooks/detail_pengadaan/UseEditDP";
import { useFetchStaff } from "@/hooks/user/useFetchStaff";

const EditDetailAsetForm = ({ id }) => {
  const { data: lokasi } = useFetchRuangan();
  const { data: staff } = useFetchStaff();
  const { data: aset, refetch, isLoading } = useFetchDetailDP(id);

  const selectedruangan = lokasi?.find((r) => r?.id === aset?.id_lokasi);
  const selectedStaff = staff?.find((r) => r?.nip === aset?.nip_penanggung_jawab);

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
  } = useEditDP({
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
      id: aset?.id || "",
      id_lokasi: aset?.id_lokasi || "",
      nip_penanggung_jawab: aset?.nip_penanggung_jawab || "",
      merk: aset?.merk || "",
      ukuran: aset?.ukuran || "",
      nomor_pengadaan: aset?.nomor_pengadaan || "",
      nomor_rangka: aset?.Aset_Kendaraan?.nomor_rangka || "",
      nomor_mesin: aset?.Aset_Kendaraan?.nomor_mesin || "",
      nomor_polisi: aset?.Aset_Kendaraan?.nomor_polisi || "",
      nomor_bpkb: aset?.Aset_Kendaraan?.nomor_bpkb || "",
    },
    enableReinitialize: true,
    onSubmit: () => {
      const {
        kode_barang,
        id_lokasi,
        merk,
        ukuran,
        nomor_bpkb,
        nomor_mesin,
        nomor_polisi,
        nomor_rangka,
        nip_penanggung_jawab
      } = formik.values;
      const formData = new FormData();
      formData.append("kode_barang", kode_barang);
      formData.append("id_lokasi", id_lokasi);
      formData.append("nip_penanggung_jawab", nip_penanggung_jawab);
      formData.append("merk", merk);
      formData.append("ukuran", ukuran);
      formData.append("nomor_bpkb", nomor_bpkb);
      formData.append("nomor_mesin", nomor_mesin);
      formData.append("nomor_polisi", nomor_polisi);
      formData.append("nomor_rangka", nomor_rangka);
      for (let i = 0; i < image.length; i++) {
        formData.append(`image`, image[i]);
      }
      editDetailAset({ id: id, body: formData });

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
    redirect(`/admin/detail_aset/${id}`);
  }

  if (isLoading) {
    <Spinner />
  }

  return (
    <form className="w-full space-y-2" onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Kode Aset</span>
          </div>
          <input
            type="text"
            placeholder="Kode Aset"
            name="id"
            value={formik.values.id}
            className="input bg-blue-50 text-sm text-black"
            disabled
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Nomor Pengadaan</span>
          </div>
          <input
            type="text"
            placeholder="nomor Pengadaan"
            name="nomor_pengadaan"
            value={formik.values.nomor_pengadaan}
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
        {aset?.barang?.jenis_barang === 'Kendaraan' && (
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
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Penanggung Jawab</span>
          </div>
          <select
            className="select bg-blue-50 text-sm"
            name="nip_penanggung_jawab"
            onChange={handleFormInput}
          >
            <option defaultValue={selectedStaff?.nip} hidden>
              {selectedStaff?.nama}
            </option>
            {staff?.map((item, index) => {
              return (
                <option value={item?.nip} key={index}>
                  {item?.nama}
                </option>
              );
            })}
          </select>
        </label>
      </div>
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
