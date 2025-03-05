"use client";
import DropzoneFile from "@/components/(input)/DropzoneFile";
import { useFetchAset } from "@/hooks/aset/useFetchAset";
import { useCreatePengadaan } from "@/hooks/pengadaan/useCreatePengadaan";
import { useFetchAcceptedPengajuan } from "@/hooks/pengajuan/useFetchAcceptedPengajuan";
import { useFetchRuangan } from "@/hooks/ruangan/useFetchRuangan";
import { useFetchStaff } from "@/hooks/user/useFetchStaff";
import { parseDate } from "@internationalized/date";
import { DatePicker, Spinner } from "@nextui-org/react";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const InputPengadaan = () => {
  const [dokumen_pengadaan, setDokumen_pengadaan] = useState([]);
  const fileAccept = { "application/pdf": [] };

  const [date, setDate] = useState();
  const today = parseDate(new Date().toISOString().split("T")[0]);

  const { data: lokasi } = useFetchRuangan()
  const { data: pengajuan } = useFetchAcceptedPengajuan()
  const { data: staff } = useFetchStaff()

  const { mutate: createPengadaan, isSuccess, isPending } = useCreatePengadaan({
    onSuccess: (succes) => {
      console.log(succes)
      toast.success("berhasil menambahkan aset");
    },
    onError: (error) => {
      const response = JSON.parse(error.request.response);
      console.log(response);
      toast.error(response.message); // Menampilkan pesan error spesifik dari server
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
        nomor_pengajuan,
        detail_barang, // Ambil detail_barang langsung
      } = formik.values;

      // FormData untuk CreateRepairReport
      const formData = new FormData();
      formData.append("nomor_pengadaan", nomor_pengadaan);
      formData.append("no_pengajuan", nomor_pengajuan);
      formData.append("nama_vendor", nama_vendor);
      formData.append("tanggal_penerimaan", new Date(date).toISOString()); // Format ISO agar lebih rapi
      formData.append("dokumen_pengadaan", dokumen_pengadaan[0]);

      // Ubah detail_barang menjadi JSON string sebelum dikirimkan
      formData.append("detail_barang", JSON.stringify(detail_barang));

      // Debugging sebelum dikirim
      console.log([...formData.entries()]);

      createPengadaan(formData);
    },

  });

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const [selectedPengajuan, setSelectedPengajuan] = useState(null);

  const handlePengajuanChange = (event) => {
    const selected = pengajuan.find(item => item.no_pengajuan === event.target.id);
    formik.setFieldValue("nomor_pengajuan", event.target.id);
    setSelectedPengajuan(selected);
    if (selected) {
      const detailBarang = selected.Detail_Pengajuan.map((item) => ({
        kode_barang: item.Barang.kode_barang,
        merk: item.Barang.merk,
        ukuran: item.Barang.ukuran,
        id_lokasi: "",
        harga_satuan: "",
        jumlah_barang: item.jumlah_barang,
        tahun_perolehan: "",
      }));
      formik.setFieldValue("detail_barang", detailBarang);
    }
  };

  if (isSuccess) {
    redirect(`/admin/pengadaan`);
  }

  return (
    <form className="w-full space-y-2" onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
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
        <div className="rounded-xl bg-white p-5">
          <h3 className="text-xl font-semibold">Pilih Usulan</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {pengajuan?.map((item) => (
              <fieldset className="w-full" key={item.no_pengajuan}>
                <div className="space-y-2">
                  <label
                    htmlFor={item.no_pengajuan}
                    className="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50 w-full"
                  >
                    <input
                      type="radio"
                      className="size-4 rounded-sm border-gray-300"
                      name="no_pengajuan"
                      id={item.no_pengajuan}
                      onChange={handlePengajuanChange}
                    />
                    <div className="flex-1 w-full">
                      <strong className="font-medium text-gray-900 block">{item.title}</strong>
                      <div className="flex justify-between items-center w-full">
                        <p className="mt-1 text-xs text-gray-700">Nama Pengusul</p>
                        <p className="mt-1 text-xs text-gray-700">{item?.user.nama}</p>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="mt-1 text-xs text-gray-700">Unit Pengajuan</p>
                        <p className="mt-1 text-xs text-gray-700">{item?.unit_pengajuan}</p>
                      </div>
                      <p className="mt-1 text-xs text-gray-700">Barang : </p>
                      {item?.Detail_Pengajuan?.map((each) => (
                        <div className="flex justify-between items-center w-full" key={each.id}>
                          <p className="mt-1 text-xs text-gray-700 flex-1">{each.Barang.nama_barang}</p>
                          <p className="mt-1 text-xs text-gray-700">Qty: {each.jumlah_barang}</p>
                        </div>
                      ))}
                    </div>
                  </label>
                </div>
              </fieldset>
            ))}
          </div>
        </div>

      </div>

      {/* Detail barang */}
      {formik.values.detail_barang.map((barang, index) => (
        <div className="rounded-xl bg-white p-5">
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <React.Fragment key={index}>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Kode Barang</span>
                  </div>
                  <input
                    className="input bg-blue-50 text-sm"
                    name={`detail_barang[${index}].kode_barang`}
                    placeholder="Jumlah barang"
                    value={barang.kode_barang}
                    onChange={handleFormInput}
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
                    name={`detail_barang[${index}].merk`}
                    value={barang.merk}
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
                    value={barang.ukuran}
                    onChange={handleFormInput}
                    className="input bg-blue-50 text-sm text-black"
                    required
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Penanggung Jawab</span>
                  </div>
                  <select
                    className="select bg-blue-50 text-sm"
                    name={`detail_barang[${index}].nip_penanggung_jawab`}
                    onChange={handleFormInput}
                    required
                  >
                    <option value={""} hidden>
                      Pilih Penanggung Jawab
                    </option>
                    {staff?.map((staff, idx) => (
                      <option value={staff.nip} key={idx}>
                        {staff.nama}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Ruangan</span>
                  </div>
                  <select
                    className="select bg-blue-50 text-sm"
                    name={`detail_barang[${index}].id_lokasi`}
                    onChange={handleFormInput}
                    required
                  >
                    <option value={""} hidden>
                      Ruangan
                    </option>
                    {lokasi?.map((lokasi, idx) => (
                      <option value={lokasi.id} key={idx}>
                        {lokasi.nama_lokasi}
                      </option>
                    ))}
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
                    value={barang.jumlah_barang}
                    onChange={handleFormInput}
                    className="input bg-blue-50 text-sm text-black"
                    disabled
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Umur Ekonomis</span>
                  </div>
                  <input
                    type="number"
                    placeholder="umur ekonomis"
                    name={`detail_barang[${index}].umur_ekonomis`}
                    onChange={handleFormInput}
                    className="input bg-blue-50 text-sm text-black"
                  />
                </label>
              </React.Fragment>
            </div>
          </div>
        </div>
      ))}

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
