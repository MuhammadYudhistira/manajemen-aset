"use client"
import Dropzone from '@/components/(input)/Dropzone'
import { useFetchRuangan } from '@/hooks/ruangan/useFetchRuangan'
import { Spinner } from '@nextui-org/react'
import { useFormik } from 'formik'
import React, { useState } from 'react'

const CreateDetailAsetForm = ({ id }) => {

    const { data: ruangans } = useFetchRuangan()

    const [image, setImage] = useState([]);
    const fileAccept = { "image/png": [], "image/jpg": [], "image/jpeg": [] }

    const formik = useFormik({
        initialValues: {
            kode_barang: "",
            nomor_rangka: "",
            nomor_mesin: "",
            nomor_polisi: "",
            nomor_bpkb: "",
            id_ruangan: "",
            id_aset: id
        },
        onSubmit: () => {
            console.log(formik.values)
            const { id_aset, id_ruangan, kode_barang, nomor_bpkb, nomor_mesin, nomor_polisi, nomor_rangka } = formik.values
            // const formData = new FormData()
            // formData.append('nama', nama)
            // formData.append('alamat', alamat)
            // formData.append('jenis_kelamin', jenis_kelamin)
            // formData.append('nip', nip)
            // formData.append('no_hp', no_hp)
            // formData.append('password', password)
            // formData.append('role', role)
            // for (let i = 0; i < image.length; i++) {
            //     formData.append('image', image[i]);
            // }
        }

    })

    const handleFormInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value);
        if (event.target.name === "kode_barang") {
            formik.setFieldValue(event.target.name, `1.3.2.${event.target.value}`)
        }
    };

    return (
        <form className='w-full space-y-2' onSubmit={formik.handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Kode Barang</span>
                    </div>
                    <div className='w-full flex items-center'>
                        <div className='bg-blue-50 text-black text-sm text-center py-4 pl-4 rounded-l-lg'>1.3.2.</div>
                        <input type="text" placeholder="Kode Barang" name='kode_barang' onChange={handleFormInput} className="bg-blue-50 text-black text-sm rounded-r-lg py-4 w-full focus:outline-none" required />
                    </div>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Nomor Rangka</span>
                    </div>
                    <input type="text" placeholder="Nomor Rangka" name='nomor_rangka' onChange={handleFormInput} className="input bg-blue-50 text-black text-sm" required />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Nomor Mesin</span>
                    </div>
                    <input type="text" placeholder="Nomor Mesin" name='nomor_mesin' onChange={handleFormInput} className="input bg-blue-50 text-black text-sm" required />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Nomor Polisi</span>
                    </div>
                    <input type="text" placeholder="Nomor Polisi" name='nomor_polisi' onChange={handleFormInput} className="input bg-blue-50 text-black text-sm" required />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Nomor BPKB</span>
                    </div>
                    <input type="text" placeholder="Nomor BPKB" name='nomor_bpkb' onChange={handleFormInput} className="input bg-blue-50 text-black text-sm" required />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Ruangan</span>
                    </div>
                    <select className="select bg-blue-50 text-sm" name='id_ruangan' onChange={handleFormInput}>
                        <option defaultValue={""} hidden>Ruangan</option>
                        {ruangans?.map((ruangan, index) => {
                            return (
                                <option value={ruangan.id} key={index}>{ruangan.nama_ruangan}</option>
                            )
                        })}
                    </select>
                </label>
            </div>
            <div className="label">
                <span className="label-text">Gambar Barang</span>
            </div>
            <Dropzone files={image} setFiles={setImage} maxFiles={4} accept={fileAccept} />
            <div className="flex justify-end">
                <button type='submit' className="btn mt-4 bg-black text-white hover:bg-white hover:text-black hover:border-black">Tambah Aset</button>
            </div>
        </form>
    )
}

export default CreateDetailAsetForm