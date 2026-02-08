'use client'

import { useState } from "react";
import TableComponent from "@/src/components/ui/tableComponent";
import { ButtonSky, ButtonRed } from "@/src/components/global/button/Button";
import { TbPencil, TbTrash } from "react-icons/tb";
import { AlertQuestion } from "@/src/lib/helper/sweetalert2";
import { ModalProgramPrioritas } from "./ModalProgramPrioritas";
import { GetResponseFindallProgramPrioritas } from "../type";
import { AlertNotification } from "@/src/lib/helper/sweetalert2";

interface Table {
    Data: GetResponseFindallProgramPrioritas[];
    onSuccess: () => void;
    filterTahun?: string;
}

const Table: React.FC<Table> = ({ Data, onSuccess, filterTahun }) => {

    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const [DataModal, setDataModal] = useState<GetResponseFindallProgramPrioritas | null>(null);

    // Filter data berdasarkan tahun yang dipilih
    const filteredData = Data.filter((item: GetResponseFindallProgramPrioritas) => {
        if (!filterTahun) return true;
        
        // Parse filterTahun untuk mendapatkan rentang tahun (misal: "2025-2030")
        const [tahunAwal, tahunAkhir] = filterTahun.split('-').map(Number);
        
        // Cek apakah tahun item berada dalam rentang yang dipilih
        if (tahunAwal && tahunAkhir) {
            return item.tahun >= tahunAwal && item.tahun <= tahunAkhir;
        }
        
        // Fallback untuk filter tahun tunggal
        return item.tahun.toString() === filterTahun;
    });

    const handleModalOpen = (data: GetResponseFindallProgramPrioritas | null) => {
        if (ModalOpen) {
            setModalOpen(false);
            setDataModal(null);
        } else {
            setModalOpen(true);
            setDataModal(data);
        }
    }

    const hapusProgram = async (kode: number) => {
        const result = await AlertQuestion(
            "Hapus",
            "Hapus Data Program Prioritas?",
            "question",
            "Hapus",
            "Batal"
        );
        if (!result.isConfirmed) {
            return;
        }
        AlertNotification("Info", "Fitur ini hanya tampilan.", "info", 2000, true);
        onSuccess();
    }

    return (
        <TableComponent className="border-sky-500">
            <table className="w-full">
                <thead>
                    <tr className="bg-sky-500 text-white">
                        <th className="border-r border-b py-1 px-2 border-gray-300 w-[50px] text-center">No</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px]">Program Prioritas</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[100px]">Tahun</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px]">Keterangan</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 w-[100px]">Aksi</th>
                    </tr>
                    <tr className="bg-sky-600 text-white">
                        <th className="border-r border-b p-1 border-gray-300 text-center">1</th>
                        <th className="border-r border-b p-1 border-gray-300 text-center">2</th>
                        <th className="border-r border-b p-1 border-gray-300 text-center">3</th>
                        <th className="border-r border-b p-1 border-gray-300 text-center">4</th>
                        <th className="border-r border-b p-1 border-gray-300 text-center">5</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((item: GetResponseFindallProgramPrioritas, index: number) => {
                            return (
                            <tr key={index}>
                                <td className="px-6 py-4 border border-sky-500 text-center">{index + 1}</td>
                                <td className="px-6 py-4 border border-sky-500">{item.programPrioritas || "-"}</td>
                                <td className="px-6 py-4 border border-sky-500">{item.tahun || "-"}</td>
                                <td className="px-6 py-4 border border-sky-500">{item.keterangan || "-"}</td>
                                <td className="px-6 py-4 border border-sky-500">
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
                                            onClick={() => hapusProgram(item.id)}
                                        >
                                            <TbTrash />
                                            Hapus
                                        </ButtonRed>
                                    </div>
                                </td>
                            </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={6} className="px-6 py-4 font-semibold text-center">
                                {filterTahun ? "Tidak ada data untuk tahun yang dipilih" : "Data Kosong, Tambahkan Data Program Prioritas"}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {ModalOpen &&
                <ModalProgramPrioritas
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
