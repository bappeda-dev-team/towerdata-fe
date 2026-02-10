'use client'

import TableComponent from "@/src/components/ui/tableComponent";
import { ButtonSky, ButtonRed } from "@/src/components/global/button/Button";
import { TbPencil, TbTrash } from "react-icons/tb";
import { useState } from "react";
import { ModalSubKegiatan } from "./ModalSubKegiatan";
import { AlertQuestion, AlertNotification } from "@/src/lib/helper/sweetalert2";
import { GetResponseSubKegiatan } from "../../type";
import { useBrandingContext } from "@/src/providers/BrandingProvider";

interface Table {
    Data: GetResponseSubKegiatan[];
    onSuccess: () => void;
}

const Table: React.FC<Table> = ({ Data, onSuccess }) => {

    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const [DataModal, setDataModal] = useState<GetResponseSubKegiatan | null>(null)

    const { branding } = useBrandingContext();
    const apiUrl = branding?.api_url || "";

    const handleModalOpen = (data: GetResponseSubKegiatan | null) => {
        if (ModalOpen) {
            setModalOpen(false);
            setDataModal(null);
        } else {
            setModalOpen(true);
            setDataModal(data);
        }
    }

    const deleteSubKegiatan = async (kode: string) => {
        if (!apiUrl) {
            AlertNotification("Error", "URL API belum tersedia.", "error", 2000, true);
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/subkegiatan/delete/${kode}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorBody = await response.json().catch(() => null);
                throw new Error(errorBody?.message || "Gagal menghapus data sub kegiatan.");
            }

            AlertNotification("Sukses", "Sub kegiatan berhasil dihapus.", "success", 2000, true);
            onSuccess();
        } catch (error) {
            AlertNotification(
                "Gagal",
                error instanceof Error ? error.message : "Terjadi kesalahan.",
                "error",
                2000,
                true
            );
        }
    }



    return (
        <TableComponent className={"border-blue-500"}>
            <table className="w-full">
                <thead>
                    <tr className={"bg-blue-500 text-white"}>
                        <th className="border-r border-b py-1 px-2 border-gray-300 w-[50px] text-center">No</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px]">Sub Kegiatan</th>
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
                        Data.map((item: GetResponseSubKegiatan, index: number) => (
                            <tr key={index}>
                                <td className={`px-6 py-4 border border-blue-500 text-center`}>{index + 1}</td>
                                <td className={`px-6 py-4 border border-blue-500`}>{item.namaSubKegiatan || "-"}</td>
                                <td className={`px-6 py-4 border border-blue-500`}>{item.kodeSubKegiatan || "-"}</td>
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
                                            onClick={() =>
                                                AlertQuestion("Hapus", "Hapus Data?", "question", "Hapus", "Batal").then((resp) => {
                                                    if (resp.isConfirmed) {
                                                        deleteSubKegiatan(item.kodeSubKegiatan)
                                                    }
                                                })
                                            }
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
                            <td colSpan={4} className="px-6 py-4 font-semibold">Data Kosong, Tambahkan Data Sub Kegiatan</td>
                        </tr>
                    }
                </tbody>
            </table>
            {ModalOpen &&
                <ModalSubKegiatan
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
