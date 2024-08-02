"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const DropzoneFile = ({
    files,
    setFiles,
    maxFiles,
    accept,
    maxSize = 1024 * 1024 * 5,
}) => {
    const [rejected, SetRejected] = useState([]);

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (acceptedFiles?.length) {
            setFiles((previousFiles) => [
                ...previousFiles,
                ...acceptedFiles.map((file) =>
                    Object.assign(file, { preview: URL.createObjectURL(file) }),
                ),
            ]);
        }

        if (rejectedFiles?.length) {
            SetRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        maxSize,
        maxFiles,
    });

    const removeFile = (name) => {
        setFiles((files) => files.filter((file) => file.name !== name));
    };

    const removeRejected = (name) => {
        SetRejected((files) => files.filter(({ file }) => file.name !== name));
    };

    return (
        <>
            <div
                {...getRootProps()}
                className="mt-10 cursor-pointer rounded-lg border-3 border-dashed border-blue-400 bg-blue-50 p-4 text-sm text-blue-400"
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <div className="flex flex-col items-center justify-normal">
                        <PictureAsPdfIcon className="mb-3 size-14" />
                        <p className="font-semibold">Select an file to upload</p>
                        <p className="text-xs">or drag and drop it here</p>
                    </div>
                )}
            </div>
            {files?.length ? <h1>Accepted Files</h1> : null}
            <ul className="mt-6 flex flex-col">
                {files?.map((file, index) => (
                    <li key={index} className="flex items-start justify-between">
                        <div>
                            <p className="mt-2 text-sm font-medium text-black">
                                {file.name}
                            </p>
                        </div>
                        <button
                            type="button"
                            className="mt-1 rounded-md border border-red-400 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-red-500 transition-colors hover:bg-red-500 hover:text-white"
                            onClick={() => removeFile(file.name)}
                        >
                            remove
                        </button>
                    </li>
                ))}
            </ul>
            {rejected?.length ? <h1>Rejected Files</h1> : null}
            <ul className="mt-6 flex flex-col">
                {rejected?.map(({ file, errors }) => (
                    <li key={file.name} className="flex items-start justify-between">
                        <div>
                            <p className="mt-2 text-sm font-medium text-neutral-500">
                                {file.name}
                            </p>
                            <ul className="text-[12px] text-red-400">
                                {errors.map((error) => (
                                    <li key={error.code}>{error.message}</li>
                                ))}
                            </ul>
                        </div>
                        <button
                            type="button"
                            className="mt-1 rounded-md border border-red-400 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-red-500 transition-colors hover:bg-red-500 hover:text-white"
                            onClick={() => removeRejected(file.name)}
                        >
                            remove
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default DropzoneFile;
