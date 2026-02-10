'use client'

import TableComponent from "@/src/components/ui/tableComponent";
import { ButtonSky, ButtonRed } from "@/src/components/global/button/Button";
import { TbPencil, TbTrash } from "react-icons/tb";
import { useState } from "react";
import { ModalProgram } from "./ModalProgram";
import { AlertQuestion, AlertNotification } from "@/src/lib/helper/sweetalert2";
import { GetResponseProgram } from "../../type";
import { useBrandingContext } from "@/src/providers/BrandingProvider";

interface Table {
    Data: GetResponseProgram[];
    onSuccess: () => void;
}

const Table: React.FC<Table> = ({ Data, onSuccess }) => {

    const { branding } = useBrandingContext();
    const apiUrl = branding?.api_url || "";
    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const [DataModal, setDataModal] = useState<GetResponseProgram | null>(null)

    const handleModalOpen = (data: GetResponseProgram | null) => {
        if (ModalOpen) {
            setModalOpen(false);
            setDataModal(null);
        } else {
            setModalOpen(true);
            setDataModal(data);
        }
    }

    const hapusProgram = async (kodeProgram?: string) => {
        if (!apiUrl) {
            AlertNotification("Error", "URL API belum tersedia.", "error", 2000, false);
            return;
        }

        if (!kodeProgram) {
            AlertNotification("Error", "Kode program tidak ditemukan.", "error", 2000, false);
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/program/delete/${kodeProgram}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorBody = await response.json().catch(() => null);
                const message = errorBody?.message || "Gagal menghapus data program.";
                throw new Error(message);
            }

            AlertNotification("Sukses", "Data program berhasil dihapus.", "success", 2000, true);
            onSuccess();
        } catch (error) {
            AlertNotification("Error", error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus.", "error", 2000, true);
        }
    }

    return (
        <TableComponent className={"border-blue-500"}>
            <table className="w-full">
                <thead>
                    <tr className={"bg-blue-500 text-white"}>
                        <th className="border-r border-b py-1 px-2 border-gray-300 w-[50px] text-center">No</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px]">Program</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px]">Kode</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 w-[100px]">Aksi</th>
                    </tr>
                    <tr className={"bg-blue-700 text-white"}>
                        <th className="border-r border-b border-gray-300 text-center">1</th>
                        <th className="border-r border-b border-gray-300 text-center">2</th>
                        <th className="border-r border-b border-gray-300 text-center">3</th>
                        <th className="border-r border-b border-gray-300 text-center">4</th>
                    </tr>
                </thead>
                <tbody>
                    {Data.length > 0 ?
                        Data.map((item: GetResponseProgram, index: number) => (
                            <tr key={index}>
                                <td className={`px-6 py-4 border border-blue-500 text-center`}>{index + 1}</td>
                                <td className={`px-6 py-4 border border-blue-500`}>{item.namaProgram || "-"}</td>
                                <td className={`px-6 py-4 border border-blue-500`}>{item.kodeProgram || "-"}</td>
                                <td className={`px-6 py-4 border border-blue-500`}>
                                    <div className="flex flex-col gap-1">
                                        <ButtonSky
                                            className="flex items-center gap-1"
                                            onClick={() => handleModalOpen(item)}
                                        >
                                            <TbPencil />
                                            Edit
                                        </ButtonSky>
                                        <ButtonRed
                                            className="flex items-center gap-1"
                                            onClick={() => AlertQuestion("Hapus", "Hapus Data?", "question", "Hapus", "Batal").then((resp) => {
                                                if (resp.isConfirmed) {
                                                    hapusProgram(item.kodeProgram)
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
                            <td colSpan={4} className="px-6 py-4 font-semibold">Data Kosong, Tambahkan Data Program</td>
                        </tr>
                    }
                </tbody>
            </table>
            {ModalOpen &&
                <ModalProgram
                    isOpen={ModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSuccess={onSuccess}
                    jenis="edit"
                    Data={DataModal}
                />
            }
        </TableComponent>
    )
}

export default Table;
