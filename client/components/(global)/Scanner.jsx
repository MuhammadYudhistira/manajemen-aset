"use client"
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useRouter } from 'next/navigation';

const QRScanner = () => {
    const router = useRouter();

    const [paused, setPaused] = useState(true)
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOpen = () => {
        setPaused(false)
        onOpen()
    }

    const handleScan = (result) => {
        router.push(result[0].rawValue);
        setPaused(true)
        onClose();
    };

    const handleClose = () => {
        setPaused(true)
        onClose()
    }

    return (
        <>
            <Button onPress={handleOpen} isIconOnly variant="bordered">
                <QrCodeScannerOutlinedIcon />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="xl" placement='auto'>
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1">Scan QR Code</ModalHeader>
                        <ModalBody>
                            <Scanner onScan={handleScan} paused={paused} components={{ audio: false }} />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={handleClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
        </>
    );
};

export default QRScanner;
