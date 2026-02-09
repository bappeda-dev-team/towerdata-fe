'use client'

import TableComponent from "@/src/components/ui/tableComponent";
import { ButtonSky, ButtonRed } from "@/src/components/global/button/Button";
import { TbPencil, TbTrash } from "react-icons/tb";
import { AlertQuestion, AlertNotification } from "@/src/lib/helper/sweetalert2";
import { PemdaPayload } from "../type";

interface TableProps {
    Data: PemdaPayload[];
    onSuccess: () => void;
    onEdit: (item: PemdaPayload) => void;
    apiUrl?: string;
}

const Table: React.FC<TableProps> = ({ Data, onSuccess, onEdit, apiUrl }) => {

    const handleDelete = async (item: PemdaPayload) => {
        if (!apiUrl) {
            AlertNotification("Informasi", "URL API belum tersedia.", "info", 2000, true);
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/pemda/delete/${item.kodePemda}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                const errorBody = await response.json().catch(() => null);
                const message = errorBody?.message || "Gagal menghapus data PEMDA.";
                throw new Error(message);
            }

            await response.json();
            AlertNotification("Berhasil", "Data PEMDA berhasil dihapus.", "success", 2000, false);
            onSuccess();
        } catch (error) {
            AlertNotification(
                "Error",
                error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus data.",
                "error",
                3000,
                true
            );
        }
    }

    return (
        <TableComponent className="border-emerald-500">
            <table className="w-full">
                <thead>
                    <tr className="bg-emerald-500 text-white">
                        <th className="border-r border-b py-1 px-2 border-gray-300 w-[50px] text-center">No</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px]">Nama PEMDA</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px]">Kode PEMDA</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px]">Aksi</th>
                    </tr>
                    <tr className="bg-emerald-600 text-white">
                        <th className="border-r border-b p-1 border-gray-300 text-center">1</th>
                        <th className="border-r border-b p-1 border-gray-300 text-center">2</th>
                        <th className="border-r border-b p-1 border-gray-300 text-center">3</th>
                        <th className="border-r border-b p-1 border-gray-300 text-center">4</th>
                    </tr>
                </thead>
                <tbody>
                    {Data.length > 0 ?
                        Data.map((item, index) => (
                            <tr key={item.kodePemda}>
                                <td className="px-6 py-4 border border-emerald-500 text-center">{index + 1}</td>
                                <td className="px-6 py-4 border border-emerald-500">{item.namaPemda || "-"}</td>
                                <td className="px-6 py-4 border border-emerald-500">{item.kodePemda || "X"}</td>
                                <td className="px-6 py-4 border border-emerald-500">
                                    <div className="flex flex-col gap-1">
                                        <ButtonSky
                                            className="w-full flex items-center gap-1"
                                            onClick={() => onEdit(item)}
                                        >
                                            <TbPencil />
                                            Edit
                                        </ButtonSky>
                                        <ButtonRed
                                            className="flex items-center gap-1"
                                            onClick={() => AlertQuestion("Hapus", "Hapus Data PEMDA?", "question", "Hapus", "Batal").then((resp) => {
                                                if (resp.isConfirmed) {
                                                    handleDelete(item);
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
                            <td colSpan={4} className="px-6 py-4 font-semibold">Data Kosong, Tambahkan Data PEMDA Baru</td>
                        </tr>
                    }
                </tbody>
            </table>
        </TableComponent>
    )
}

export default Table;
