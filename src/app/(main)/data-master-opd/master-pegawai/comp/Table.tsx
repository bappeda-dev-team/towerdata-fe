'use client'

import { useState } from "react";
import TableComponent from "@/src/components/ui/tableComponent";
import { ButtonSky, ButtonRed } from "@/src/components/global/button/Button";
import { TbPencil, TbTrash } from "react-icons/tb";
import { ModalMasterPegawai } from "./ModalMasterPegawai";
import { AlertQuestion } from "@/src/lib/helper/sweetalert2";
import { GetResponseFindallPegawai } from "../type";
import { AlertNotification } from "@/src/lib/helper/sweetalert2";

interface Table {
    Data: GetResponseFindallPegawai[];
    kode_opd: string;
    nama_opd: string;
    onSuccess: () => void;
}

const Table: React.FC<Table> = ({ Data, kode_opd, nama_opd, onSuccess }) => {

    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const [DataModal, setDataModal] = useState<GetResponseFindallPegawai | null>(null);

    const handleModalOpen = (data: GetResponseFindallPegawai | null) => {
        if (ModalOpen) {
            setModalOpen(false);
            setDataModal(null);
        } else {
            setModalOpen(true);
            setDataModal(data);
        }
    }

    const hapusPegawai = () => {
        AlertNotification("Info", "Fitur ini hanya tampilan.", "info", 2000, true);
        onSuccess();
    }

    return (
        <TableComponent className="border-sky-500">
            <table className="w-full">
                <thead>
                    <tr className="bg-sky-500 text-white">
                        <th className="border-r border-b py-1 px-2 border-gray-300 w-[50px] text-center">No</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px]">Nama Pegawai</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px]">NIP</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px]">Email</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px]">Jabatan Dinas</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px]">Jabatan Tim</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px]">Role</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 [100px]">Aksi</th>
                    </tr>
                    <tr className="bg-sky-600 text-white">
                        <th className="border-r border-b p-1 border-gray-300 text-center">1</th>
                        <th className="border-r border-b p-1 border-gray-300 text-center">2</th>
                        <th className="border-r border-b p-1 border-gray-300 text-center">3</th>
                        <th className="border-r border-b p-1 border-gray-300 text-center">4</th>
                        <th className="border-r border-b p-1 border-gray-300 text-center">5</th>
                        <th className="border-r border-b p-1 border-gray-300 text-center">6</th>
                        <th className="border-r border-b p-1 border-gray-300 text-center">7</th>
                        <th className="border-r border-b p-1 border-gray-300 text-center">8</th>
                    </tr>
                </thead>
                <tbody>
                    {Data.length > 0 ?
                        Data.map((item: GetResponseFindallPegawai, index: number) => (
                            <tr key={index}>
                                <td className="px-6 py-4 border border-sky-500 text-center">{index + 1}</td>
                                <td className="px-6 py-4 border border-sky-500">{item.namaPegawai || "-"}</td>
                                <td className="px-6 py-4 border border-sky-500 text-center">{item.nip || "-"}</td>
                                <td className="px-6 py-4 border border-sky-500">{item.email || "-"}</td>
                                <td className="px-6 py-4 border border-sky-500 text-center">{item.jabatanDinas || "-"}</td>
                                <td className="px-6 py-4 border border-sky-500 text-center">{item.jabatanTim || "-"}</td>
                                <td className="px-6 py-4 border border-sky-500 text-center">{item.role || "-"}</td>
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
                                            onClick={() => AlertQuestion("Hapus", "Hapus Data Pegawai?", "question", "Hapus", "Batal").then((resp) => {
                                                if (resp.isConfirmed) {
                                                    hapusPegawai()
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
                            <td colSpan={8} className="px-6 py-4 font-semibold">Data Kosong, Tambahkan Data Pegawai</td>
                        </tr>
                    }
                </tbody>
            </table>
            {ModalOpen &&
                <ModalMasterPegawai
                    isOpen={ModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSuccess={onSuccess}
                    kode_opd={kode_opd}
                    nama_opd={nama_opd}
                    jenis="edit"
                    Data={DataModal}
                />
            }
        </TableComponent>
    )
}

export default Table;
