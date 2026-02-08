'use client'

import TableComponent from "@/src/components/ui/tableComponent";
import { ButtonRed } from "@/src/components/global/button/Button";
import { TbTrash } from "react-icons/tb";
import { GetResponseKegiatanOpd } from "../../type";
import { useState } from "react";
import { AlertQuestion } from "@/src/lib/helper/sweetalert2";
import { AlertNotification } from "@/src/lib/helper/sweetalert2";

interface TableProps {
    jenis: string;
    Data: GetResponseKegiatanOpd[];
    apiUrl?: string;
    onDeleteSuccess?: () => void;
}

const Table: React.FC<TableProps> = ({ jenis, Data, apiUrl, onDeleteSuccess }) => {
    const [visibleData] = useState<GetResponseKegiatanOpd[]>(Data);

    const hapusKegiatan = () => {
        AlertNotification("Info", "Fitur ini hanya tampilan.", "info", 2000, true);
        onDeleteSuccess?.();
    }

    // Validasi data untuk memastikan memiliki format yang benar
    const rows = Array.isArray(visibleData) ? visibleData : [];

    const borderClass = jenis === "Program"
        ? "border-blue-500"
        : jenis === "Kegiatan"
            ? "border-green-500"
            : "border-emerald-500";

    const headerClass = jenis === "Program"
        ? "bg-blue-500"
        : jenis === "Kegiatan"
            ? "bg-green-500"
            : "bg-emerald-500";

    const headerDarkClass = jenis === "Program"
        ? "bg-blue-700"
        : jenis === "Kegiatan"
            ? "bg-green-700"
            : "bg-emerald-700";

    return (
        <TableComponent className={borderClass}>
            <table className="w-full">
                <thead>
                    <tr className={`${headerClass} text-white`}>
                        <th className="border-r border-b py-1 px-2 border-gray-300 w-[50px] text-center">No</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px]">{jenis}</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px]">Kode</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 w-[100px]">Aksi</th>
                    </tr>
                    <tr className={`${headerDarkClass} text-white`}>
                        <th className="border-r border-b border-gray-300 text-center">1</th>
                        <th className="border-r border-b border-gray-300 text-center">2</th>
                        <th className="border-r border-b border-gray-300 text-center">3</th>
                        <th className="border-r border-b border-gray-300 text-center">4</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.length > 0 ? (
                        rows.map((item, index) => (
                            <tr key={item.kodeKegiatanOpd}>
                                <td className={`px-6 py-4 border ${borderClass} text-center`}>{index + 1}</td>
                                <td className={`px-6 py-4 border ${borderClass}`}>{item.namaKegiatanOpd}</td>
                                <td className={`px-6 py-4 border ${borderClass}`}>{item.kodeKegiatanOpd}</td>
                                <td className={`px-6 py-4 border ${borderClass}`}>
                                    <ButtonRed
                                        className="flex items-center gap-1"
                                        onClick={() => AlertQuestion("Hapus", "Hapus Data?", "question", "Hapus", "Batal").then((resp) => {
                                            if (resp.isConfirmed) {
                                                hapusKegiatan()
                                            }
                                        })}
                                    >
                                        <TbTrash />
                                        Hapus
                                    </ButtonRed>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="px-6 py-4 font-semibold">Data Kosong, Tambahkan Data Program</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </TableComponent>
    )
}

export default Table;
