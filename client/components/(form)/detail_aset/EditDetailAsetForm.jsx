"use client"
import Dropzone from '@/components/(input)/Dropzone'
import { useFetchDA } from '@/hooks/detail_aset/useFetchDA'
import { useFetchRuangan } from '@/hooks/ruangan/useFetchRuangan'
import { useFormik } from 'formik'
import Image from 'next/image'
import React, { useState } from 'react'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useDeleteDAImage } from '@/hooks/detail_aset/useDeleteDAImage'
import { toast } from 'sonner'
import { useEditDA } from '@/hooks/detail_aset/useEditDA'
import { redirect } from 'next/navigation'
import { Spinner } from '@nextui-org/react'

const EditDetailAsetForm = ({ id, iddetail }) => {

    const { data: ruangans } = useFetchRuangan()
    const { data: aset, refetch } = useFetchDA(id, iddetail)

    const { mutate: deleteImage } = useDeleteDAImage({
        onSuccess: () => {
            toast.success("berhasil menghapus gambar")
            refetch()
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.response.data.message)
        }
    })

    const { mutate: editDetailAset, isSuccess, isPending } = useEditDA({
        onSuccess: () => {
            toast.success("Berhasil mengupdate data detail aset")
        },
        onError: (error) => {
            toast.error(error.response.data.message)
            console.log(error)
        }
    })

    const [image, setImage] = useState([]);
    const fileAccept = { "image/png": [], "image/jpg": [], "image/jpeg": [] }

    const selectedruangan = ruangans.find(r => r.id === aset?.id_ruangan);

    const formik = useFormik({
        initialValues: {
            kode_barang: aset?.kode_barang || "",
            nomor_rangka: aset?.nomor_rangka || "",
            nomor_mesin: aset?.nomor_mesin || "",
            nomor_polisi: aset?.nomor_polisi || "",
            nomor_bpkb: aset?.nomor_bpkb || "",
            keterangan: aset?.keterangan || "",
            id_ruangan: aset?.id_ruangan || "",
            id_aset: id
        },
        enableReinitialize: true,
        onSubmit: () => {
            const { id_aset, id_ruangan, kode_barang, nomor_bpkb, nomor_mesin, nomor_polisi, nomor_rangka, keterangan } = formik.values
            const formData = new FormData()
            formData.append('id_aset', id_aset)
            formData.append('id_ruangan', id_ruangan)
            formData.append('kode_barang', kode_barang)
            formData.append('nomor_bpkb', nomor_bpkb)
            formData.append('nomor_mesin', nomor_mesin)
            formData.append('nomor_polisi', nomor_polisi)
            formData.append('nomor_rangka', nomor_rangka)
            formData.append('keterangan', keterangan)
            for (let i = 0; i < image.length; i++) {
                formData.append(`image`, image[i]);
            }
            editDetailAset({ id: id, iddetail: iddetail, body: formData })

            // Melihat isi formData
            // for (let pair of formData.entries()) {
            //     // Jika pair[1] adalah objek File, tampilkan nama filenya
            //     if (pair[1] instanceof File) {
            //         console.log(pair[0] + ': ' + pair[1].name);
            //     } else {
            //         console.log(pair[0] + ': ' + pair[1]);
            //     }
            // }
        }

    })

    const handleFormInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value);
    };

    const handleDeleteClick = ({ imageId, link }) => {
        const body = { imageId, link }
        deleteImage({ id, iddetail, body })
    }

    if (isSuccess) {
        redirect(`/admin/aset/${id}/detail-aset/${iddetail}`)
    }

    return (
        <form className='w-full space-y-2' onSubmit={formik.handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Kode Barang</span>
                    </div>
                    <div className='w-full flex items-center'>
                        {/* <div className='bg-blue-50 text-black text-sm text-center py-4 pl-4 rounded-l-lg'>1.3.2.</div> */}
                        <input type="text" placeholder="Kode Barang" name='kode_barang' value={formik.values.kode_barang} onChange={handleFormInput} className="bg-blue-50 text-black text-sm rounded-lg p-4 w-full focus:outline-none" required />
                    </div>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Nomor Rangka</span>
                    </div>
                    <input type="text" placeholder="Nomor Rangka" name='nomor_rangka' value={formik.values.nomor_rangka} onChange={handleFormInput} className="input bg-blue-50 text-black text-sm" />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Nomor Mesin</span>
                    </div>
                    <input type="text" placeholder="Nomor Mesin" name='nomor_mesin' value={formik.values.nomor_mesin} onChange={handleFormInput} className="input bg-blue-50 text-black text-sm" />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Nomor Polisi</span>
                    </div>
                    <input type="text" placeholder="Nomor Polisi" name='nomor_polisi' value={formik.values.nomor_polisi} onChange={handleFormInput} className="input bg-blue-50 text-black text-sm" />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Nomor BPKB</span>
                    </div>
                    <input type="text" placeholder="Nomor BPKB" name='nomor_bpkb' value={formik.values.nomor_bpkb} onChange={handleFormInput} className="input bg-blue-50 text-black text-sm" />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Ruangan</span>
                    </div>
                    <select className="select bg-blue-50 text-sm" name='id_ruangan' onChange={handleFormInput}>
                        <option defaultValue={formik.values.id_ruangan} hidden>{selectedruangan?.nama_ruangan}</option>
                        {ruangans?.map((ruangan, index) => {
                            return (
                                <option value={ruangan.id} key={index}>{ruangan.nama_ruangan}</option>
                            )
                        })}
                    </select>
                </label>
            </div>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Keterangan</span>
                </div>
                <textarea type="text" placeholder="Keterangan" name='keterangan' value={formik.values.keterangan} onChange={handleFormInput} className="input textarea bg-blue-50 text-black text-sm" />
            </label>
            <div className="label flex flex-col items-start gap-3">
                <span className="label-text">Gambar Barang</span>
                <div className='flex gap-3'>
                    {aset?.Detail_Aset_Images ? aset?.Detail_Aset_Images?.map((image, index) => {
                        return (
                            <div className='relative rounded-md shadow-lg' key={index} >
                                <Image src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${image.link}`} alt='image' width={150} height={150} className='max-h-[150px] rounded-lg shadow-md' />
                                <button
                                    type='button'
                                    className='rounded-full flex justify-center items-center absolute -top-3 -right-3 bg-white'
                                    onClick={() => handleDeleteClick({ imageId: image.id, link: image.link })}
                                >
                                    <CancelOutlinedIcon className='text-red-500' />
                                </button>
                            </div>
                        )
                    }) : null}
                </div>
            </div>
            <Dropzone files={image} setFiles={setImage} maxFiles={4} accept={fileAccept} />
            <div className="flex justify-end">
                <button type='submit' className="btn mt-4 bg-black text-white hover:bg-white hover:text-black hover:border-black">{isPending ? <Spinner /> : "Edit Aset"}</button>
            </div>
        </form >
    )
}

export default EditDetailAsetForm