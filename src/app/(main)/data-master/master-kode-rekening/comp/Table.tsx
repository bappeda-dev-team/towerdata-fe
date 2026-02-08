'use client'

import { useState } from "react";
import TableComponent from "@/src/components/ui/tableComponent";
import { ButtonSky, ButtonRed } from "@/src/components/global/button/Button";
import { TbTrash, TbPencil } from "react-icons/tb";
import { AlertQuestion, AlertNotification } from "@/src/lib/helper/sweetalert2";
import { ModalKodeRekening } from "./ModalKodeRekening";
import { GetResponseFindallRekening } from "../type";

interface Table {
    data: GetResponseFindallRekening[];
    onSuccess: () => void;
}

const Table: React.FC<Table> = ({ onSuccess, data }) => {

    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const [DataModal, setDataModal] = useState<GetResponseFindallRekening | null>(null);

    const handleModal = (data: GetResponseFindallRekening | null) => {
        if (ModalOpen) {
            setDataModal(null);
            setModalOpen(false);
        } else {
            setDataModal(data);
            setModalOpen(true);
        }
    }

    const hapusRekening = () => {
        AlertNotification("Info", "Fitur ini hanya tampilan.", "info", 2000, true);
        onSuccess();
    };

    return (
        <TableComponent className="border-sky-500">
            <table className="w-full">
                <thead>
                    <tr className="border-sky-500 bg-sky-500 text-white">
                        <th className="border-r border-b py-1 px-2 border-gray-300 w-[50px] text-center">No</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px] text-center">Kode Rekening</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px] text-center">Nama Rekening</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 w-[100px] text-center">Aksi</th>
                    </tr>
                    <tr className="border-sky-500 bg-sky-600 text-white">
                        <td className="border border-gray-300 text-center">1</td>
                        <td className="border border-gray-300 text-center">2</td>
                        <td className="border border-gray-300 text-center">3</td>
                        <td className="border border-gray-300 text-center">4</td>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ?
                        data.map((item: GetResponseFindallRekening, index: number) => (
                            <tr key={index}>
                                <td className="px-6 py-4 border border-sky-500 text-center">{index + 1}</td>
                                <td className="px-6 py-4 border border-sky-500 text-center">{item.kodeRekening || "-"}</td>
                                <td className="px-6 py-4 border border-sky-500 text-center">{item.namaRekening || "-"}</td>
                                <td className="px-6 py-4 border border-sky-500">
                                    <div className="flex flex-col items-center gap-1">
                                        <ButtonSky
                                            className="flex items-center gap-1 w-full"
                                            onClick={() => handleModal(item)}
                                        >
                                            <TbPencil />
                                            Edit
                                        </ButtonSky>
                                        <ButtonRed
                                            className="flex items-center gap-1 w-full"
                                            onClick={() => AlertQuestion("Hapus", "Hapus Data Kode Rekening?", "question", "Hapus", "Batal").then((resp) => {
                                                if (resp.isConfirmed) {
                                                    // toastInfo("dalam Pengembangan")
                                                    hapusRekening();
                                                }
                                            })}
                                        >
                                            <TbTrash />
                                            Hapus
                                        </ButtonRed>
                                    </div>
                                </td>
                            </tr>
                        ))
                        :
                        <tr>
                            <td colSpan={4} className="px-6 py-4 font-semibold">Data Kosong, Tambahkan Data Rekening Baru</td>
                        </tr>
                    }
                </tbody>
            </table>
            {ModalOpen &&
                <ModalKodeRekening
                    isOpen={ModalOpen}
                    onClose={() => handleModal(null)}
                    onSuccess={onSuccess}
                    jenis="edit"
                    Data={DataModal}
                />
            }
        </TableComponent>
    )
}

export default Table;
