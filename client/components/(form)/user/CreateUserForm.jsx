"use client";
import Dropzone from "@/components/(input)/Dropzone";
import axios from "@/libs/axios";
import { Spinner } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CreateUserForm = () => {
  const [image, setImage] = useState([]);
  const fileAccept = { "image/png": [], "image/jpg": [], "image/jpeg": [] };

  const formik = useFormik({
    initialValues: {
      nama: "",
      nip: "",
      password: "",
      alamat: "",
      jenis_kelamin: "",
      no_hp: "",
      role: "",
    },
    onSubmit: () => {
      const { nama, alamat, jenis_kelamin, nip, no_hp, password, role } =
        formik.values;
      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("alamat", alamat);
      formData.append("jenis_kelamin", jenis_kelamin);
      formData.append("nip", nip);
      formData.append("no_hp", no_hp);
      formData.append("password", password);
      formData.append("role", role);
      for (let i = 0; i < image.length; i++) {
        formData.append("image", image[i]);
      }
      createUser(formData);
    },
  });

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const {
    mutate: createUser,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (body) => {
      const response = await axios.post("/user", body);

      return response;
    },
    onSuccess: () => {
      toast.success("Berhasil menambahkan User");
    },
    onError: (error) => {
      console.log(error.response);
      toast.error(error.response.data.message);
    },
  });

  if (isSuccess) {
    redirect("/admin/user");
  }

  return (
    <form className="w-full space-y-2" onSubmit={formik.handleSubmit}>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Nama Lengkap</span>
        </div>
        <input
          type="text"
          placeholder="Nama Lengkap"
          name="nama"
          onChange={handleFormInput}
          className="input bg-blue-50 text-sm text-black"
          required
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">NIP</span>
        </div>
        <input
          type="text"
          placeholder="NIP"
          name="nip"
          onChange={handleFormInput}
          className="input bg-blue-50 text-sm text-black"
          required
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Password</span>
        </div>
        <input
          type="text"
          placeholder="Password"
          name="password"
          onChange={handleFormInput}
          className="input bg-blue-50 text-sm text-black"
          required
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Jenis Kelamin</span>
        </div>
        <select
          className="select bg-blue-50 text-sm"
          name="jenis_kelamin"
          onChange={handleFormInput}
          required
        >
          <option defaultValue={""} hidden>
            Jenis Kelamin
          </option>
          <option value={"Pria"}>Pria</option>
          <option value={"Wanita"}>Wanita</option>
        </select>
      </label>
      <div className="label">
        <span className="label-text">Foto Profil</span>
      </div>
      <Dropzone
        files={image}
        setFiles={setImage}
        maxFiles={1}
        accept={fileAccept}
      />
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Alamat</span>
        </div>
        <input
          type="text"
          placeholder="Alamat"
          name="alamat"
          onChange={handleFormInput}
          className="input bg-blue-50 text-sm text-black"
          required
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Nomor Hp</span>
        </div>
        <input
          type="text"
          placeholder="Nomor Hp"
          name="no_hp"
          onChange={handleFormInput}
          className="input bg-blue-50 text-sm text-black"
          required
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Role</span>
        </div>
        <select
          className="select bg-blue-50 text-sm"
          name="role"
          onChange={handleFormInput}
          required
        >
          <option defaultValue={""} hidden>
            Role
          </option>
          <option value={"ADMIN"}>Admin</option>
          <option value={"SEKWAN"}>Sekretaris</option>
          <option value={"KEPALA_BAGIAN"}>Kepala Bagian</option>
          <option value={"STAFF"}>Staff</option>
        </select>
      </label>
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn mt-4 bg-black text-white hover:border-black hover:bg-white hover:text-black"
        >
          {isPending ? <Spinner /> : "Tambah user"}
        </button>
      </div>
    </form>
  );
};

export default CreateUserForm;
