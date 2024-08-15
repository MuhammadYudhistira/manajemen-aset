"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { useDeleteUser } from "@/hooks/user/useDeleteUser";

const ActionUser = ({ id, role }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleClick = () => {
    deleteUser(id);
  };

  const {
    mutate: deleteUser,
    isPending,
    isSuccess,
  } = useDeleteUser({
    onSuccess: () => {
      toast.info("Berhasil menghapus data user");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
    },
  });
  if (isSuccess) {
    redirect("/admin/user");
  }

  return (
    <div className="dropdown flex justify-end px-2">
      <div tabIndex={0} role="button">
        <MoreHorizIcon />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] w-52 space-y-2 rounded-box bg-base-100 p-2 shadow"
      >
        <li>
          <Link
            href={`/admin/user/${id}/edit`}
            className="btn bg-white text-black"
          >
            <EditOutlinedIcon /> Edit Detail User
          </Link>
        </li>
        {role !== "ADMIN" && (
          <li>
            <Button
              onPress={onOpen}
              className="btn bg-white text-red-500 hover:border-red-300 hover:bg-red-50"
            >
              <DeleteOutlineOutlinedIcon /> Delete User
            </Button>
          </li>
        )}
      </ul>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="xl"
      >
        <ModalContent className="p-5">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row gap-1 text-red-500">
                <WarningAmberOutlinedIcon />
                <p>Warning</p>
              </ModalHeader>
              <ModalBody>
                <p>Apakah anda yakin akan menghapus data user ini??</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-red-500 text-white"
                  onClick={handleClick}
                  onPress={onClose}
                >
                  {isPending ? <Spinner /> : "Delete"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ActionUser;
