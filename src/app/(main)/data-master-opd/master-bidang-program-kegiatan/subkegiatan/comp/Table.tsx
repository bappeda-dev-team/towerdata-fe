'use client'

import TableComponent from "@/src/components/ui/tableComponent";
import { ButtonRed } from "@/src/components/global/button/Button";
import { TbTrash } from "react-icons/tb";
import { GetResponseSubKegiatanOpd } from "../../type";
import { useState } from "react";
import { AlertQuestion } from "@/src/lib/helper/sweetalert2";
import { AlertNotification } from "@/src/lib/helper/sweetalert2";

type TableRow = GetResponseSubKegiatanOpd & {
    namaSubKegiatan?: string;
    kodeSubKegiatan?: string;
};

interface TableProps {
    jenis: string;
    Data: TableRow[];
    apiUrl?: string;
    onDeleteSuccess?: () => void;
}

const getNamaSubKegiatan = (row: TableRow) => row.namaSubKegiatanOpd ?? row.namaSubKegiatan ?? "-";
const getKodeSubKegiatan = (row: TableRow) => row.kodeSubKegiatanOpd ?? row.kodeSubKegiatan ?? "-";
const getKodeForMutation = (row: TableRow) => row.kodeSubKegiatanOpd ?? row.kodeSubKegiatan ?? "";

const Table: React.FC<TableProps> = ({ jenis, Data, apiUrl, onDeleteSuccess }) => {
    const [visibleData] = useState<TableRow[]>(Data);

    const hapusSubKegiatan = () => {
        AlertNotification("Info", "Fitur ini hanya tampilan.", "info", 2000, true);
        onDeleteSuccess?.();
    }

    const borderColor = jenis === "Program" ? "border-blue-500" : jenis === "Kegiatan" ? "border-green-500" : "border-emerald-500";
    const headerColor = jenis === "Program" ? "bg-blue-500" : jenis === "Kegiatan" ? "bg-green-500" : "bg-emerald-500";
    const subHeaderColor = jenis === "Program" ? "bg-blue-700" : jenis === "Kegiatan" ? "bg-green-700" : "bg-emerald-700";

    return (
        <TableComponent className={borderColor}>
            <table className="w-full">
                <thead>
                    <tr className={`${headerColor} text-white`}>
                        <th className="border-r border-b py-1 px-2 border-gray-300 w-[50px] text-center">No</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px]">{jenis}</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px]">Kode</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 w-[100px]">Aksi</th>
                    </tr>
                    <tr className={`${subHeaderColor} text-white`}>
                        <th className="border-r border-b border-gray-300 text-center">1</th>
                        <th className="border-r border-b border-gray-300 text-center">2</th>
                        <th className="border-r border-b border-gray-300 text-center">3</th>
                        <th className="border-r border-b border-gray-300 text-center">4</th>
                    </tr>
                </thead>
                <tbody>
                    {visibleData.length > 0 ? (
                        visibleData.map((item, index) => {
                            const kode = getKodeForMutation(item);
                            return (
                                <tr key={item.id ?? `${index}-${kode}`}>
                                    <td className={`px-6 py-4 border ${borderColor} text-center`}>{index + 1}</td>
                                    <td className={`px-6 py-4 border ${borderColor}`}>{getNamaSubKegiatan(item)}</td>
                                    <td className={`px-6 py-4 border ${borderColor}`}>{getKodeSubKegiatan(item)}</td>
                                    <td className={`px-6 py-4 border ${borderColor}`}>
                                        <ButtonRed
                                            className="flex items-center gap-1"
                                            onClick={() => AlertQuestion("Hapus", "Hapus Data?", "question", "Hapus", "Batal").then((resp) => {
                                                if (resp.isConfirmed) {
                                                    hapusSubKegiatan()
                                                }
                                            })}
                                        >
                                            <TbTrash />
                                            Hapus
                                        </ButtonRed>
                                    </td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td colSpan={4} className="px-6 py-4 font-semibold">Data Kosong, Tambahkan Data {jenis}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </TableComponent>
    )
}

export default Table;
