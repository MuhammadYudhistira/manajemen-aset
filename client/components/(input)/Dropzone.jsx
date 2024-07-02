"use client"
import Image from "next/legacy/image"
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

const Dropzone = ({ files, setFiles, maxFiles, accept, maxSize = 1024 * 1024 * 5 }) => {

    const [rejected, SetRejected] = useState([])

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (acceptedFiles?.length) {
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) }))
            ])
        }

        if (rejectedFiles?.length) {
            SetRejected(previousFiles => [
                ...previousFiles,
                ...rejectedFiles
            ])
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept, maxSize, maxFiles })

    const removeFile = (name) => {
        setFiles(files => files.filter(file => file.name !== name))
    }

    const removeRejected = (name) => {
        SetRejected(files => files.filter(({ file }) => file.name !== name))
    }

    return (
        <>
            <div {...getRootProps()} className='bg-blue-50 mt-10 p-10 rounded-lg text-sm text-blue-400 cursor-pointer border-blue-400 border-3 border-dashed'>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <div className='flex flex-col items-center justify-normal'>
                            <AddPhotoAlternateOutlinedIcon className='size-14 mb-3' />
                            <p className='font-semibold'>Select an image or file to upload</p>
                            <p className='text-xs'>or drag and drop it here</p>
                        </div>
                }
            </div>
            {files?.length ? <h1>Accepted Files</h1> : null}
            <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10'>
                {files?.map((file, index) => (
                    <li key={index} className='relative p-5 rounded-md shadow-lg'>
                        <Image
                            src={file.preview}
                            alt={file.name}
                            layout="responsive"
                            width={100}
                            height={100}
                            className='h-full w-full object-contain rounded-md' />
                        <button
                            type='button'
                            className='rounded-full flex justify-center items-center absolute -top-3 -right-3 bg-white'
                            onClick={() => removeFile(file.name)}
                        >
                            <CancelOutlinedIcon className='text-red-500' />
                        </button>

                    </li>
                ))
                }
            </ul>
            {rejected?.length ? <h1>Rejected Files</h1> : null}
            <ul className='mt-6 flex flex-col'>
                {rejected?.map(({ file, errors }) => (
                    <li key={file.name} className='flex items-start justify-between'>
                        <div>
                            <p className='mt-2 text-neutral-500 text-sm font-medium'>
                                {file.name}
                            </p>
                            <ul className='text-[12px] text-red-400'>
                                {errors.map(error => (
                                    <li key={error.code}>{error.message}</li>
                                ))}
                            </ul>
                        </div>
                        <button
                            type='button'
                            className='mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-red-500 border border-red-400 rounded-md px-3 hover:text-white hover:bg-red-500 transition-colors'
                            onClick={() => removeRejected(file.name)}
                        >
                            remove
                        </button>
                    </li>
                ))}
            </ul>

        </>
    )
}

export default Dropzone