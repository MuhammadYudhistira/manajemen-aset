"use client"
import React, { useState } from 'react'
import { DatePicker, Spinner } from '@nextui-org/react'
import { parseDate } from '@internationalized/date'
import Dropzone from '../(input)/Dropzone'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { toast } from 'sonner'
import { redirect } from 'next/navigation';
import { useCreateAset } from '@/hooks/aset/useCreateAset'

const AsetForm = () => {

    const [image, setImage] = useState([]);
    const [date, setDate] = useState()
    const today = parseDate(new Date().toISOString().split("T")[0]);
    const fileAccept = { "image/png": [], "image/jpg": [], "image/jpeg": [] }

    const handleChangeDate = (newDate) => {
        const formatDate = new Date(newDate)
        setDate(formatDate)
    }

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
            console.log(formik.values)
            const { nama_barang, deskripsi, merk, harga_satuan, jumlah_barang, ukuran } = formik.values
            const formData = new FormData()
            formData.append('nama_barang', nama_barang);
            formData.append('deskripsi', deskripsi);
            formData.append('merk', merk);
            formData.append('harga_satuan', harga_satuan);
            formData.append('jumlah_barang', jumlah_barang);
            formData.append('ukuran', ukuran);
            formData.append('tahun_perolehan', date);
            for (let i = 0; i < image.length; i++) {
                formData.append('image', image[i]);
            }
            createProduct(formData)
        }
    })

    const handleFormInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value);
    };

    const { mutate: createProduct, isSuccess, isPending } = useCreateAset({
        onSuccess: () => {
            toast.success("berhasil menambahkan aset")
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    if (isSuccess) {
        redirect("/admin/aset")
    }




    return (
        <form className='w-full space-y-2' onSubmit={formik.handleSubmit}>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Nama Barang</span>
                </div>
                <input type="text" placeholder="Nama Barang" name='nama_barang' onChange={handleFormInput} className="input bg-blue-50 text-black text-sm" required />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Merk</span>
                </div>
                <input type="text" placeholder="Merk" name='merk' onChange={handleFormInput} className="input bg-blue-50 text-black text-sm" required />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Deskripsi</span>
                </div>
                <textarea type="text" placeholder="Deskripsi" name='deskripsi' onChange={handleFormInput} className="input textarea bg-blue-50 text-black text-sm" required />
            </label>
            <DatePicker maxValue={today} name='tahun_perolehan' onChange={handleChangeDate} className='text-black' labelPlacement='outside' showMonthAndYearPickers label="Tahun perolehan" color='primary' />
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Ukuran</span>
                </div>
                <input type="text" placeholder="Ukuran" name='ukuran' onChange={handleFormInput} className="input bg-blue-50 text-black text-sm" required />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Harga Satuan</span>
                </div>
                <input type="number" placeholder="harga_satuan" name='harga_satuan' onChange={handleFormInput} className="input bg-blue-50 text-black text-sm" required />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Jumlah Barang</span>
                </div>
                <input type="number" placeholder="Jumlah Barang" name='jumlah_barang' onChange={handleFormInput} className="input bg-blue-50 text-black text-sm" required />
            </label>
            <div className="label">
                <span className="label-text">Gambar Barang</span>
            </div>
            <Dropzone files={image} setFiles={setImage} maxFiles={1} accept={fileAccept} />
            <div className="flex justify-end">
                <button type='submit' className="btn mt-4 bg-black text-white hover:bg-white hover:text-black hover:border-black">{isPending ? <Spinner /> : "Tambah Aset"}</button>
            </div>
        </form>
    )
}

export default AsetForm