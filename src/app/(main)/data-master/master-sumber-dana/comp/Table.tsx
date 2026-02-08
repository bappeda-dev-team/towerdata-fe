'use client'

import { useState } from "react";
import TableComponent from "@/src/components/ui/tableComponent";
import { ButtonSky, ButtonRed } from "@/src/components/global/button/Button";
import { TbTrash, TbPencil } from "react-icons/tb";
import { ModalSumberDana } from "./ModalSumberDana";
import { AlertNotification, AlertQuestion } from "@/src/lib/helper/sweetalert2";
import { GetResponseFindallSumberDana } from "../type";

interface Table {
    Data: GetResponseFindallSumberDana[];
    onSuccess: () => void;
}

const Table: React.FC<Table> = ({ Data, onSuccess }) => {

    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const [DataModal, setDataModal] = useState<GetResponseFindallSumberDana | null>(null);
    const [JenisModal, setJenisModal] = useState<"tambah" | "edit">("tambah");

    const handleModalOpen = (data: GetResponseFindallSumberDana, jenis: "tambah" | "edit") => {
        if (ModalOpen) {
            setModalOpen(false);
            setJenisModal("tambah");
            setDataModal(null);
        } else {
            setModalOpen(true);
            setJenisModal(jenis);
            setDataModal(data);
        }
    }

    const hapusSumberDana = () => {
        AlertNotification("Info", "Fitur ini hanya tampilan.", "info", 2000, true);
        onSuccess();
    }

    return (
        <TableComponent className="border-sky-500">
            <table className="w-full">
                <thead>
                    <tr className="border-sky-500 bg-sky-500 text-white">
                        <th className="border-r border-b py-1 px-2 border-gray-300 w-[50px] text-center">No</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px] text-center">Kode Dana Lama</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px] text-center">Sumber Dana</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px] text-center">Kode Dana Baru</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 w-[100px] text-center">Aksi</th>
                    </tr>
                    <tr className="border-sky-500 bg-sky-600 text-white">
                        <td className="border border-gray-300 text-center">1</td>
                        <td className="border border-gray-300 text-center">2</td>
                        <td className="border border-gray-300 text-center">3</td>
                        <td className="border border-gray-300 text-center">4</td>
                        <td className="border border-gray-300 text-center">5</td>
                    </tr>
                </thead>
                <tbody>
                    {Data.length > 0 ?
                        Data.map((item: GetResponseFindallSumberDana, index: number) => (
                            <tr key={index}>
                                <td className="px-6 py-4 border border-sky-500 text-center">{index + 1}</td>
                                <td className="px-6 py-4 border border-sky-500 text-center">{item.kodeDanaLama || 0}</td>
                                <td className="px-6 py-4 border border-sky-500 text-center">{item.sumberDana || "-"}</td>
                                <td className="px-6 py-4 border border-sky-500 text-center">{item.kodeDanaBaru || 0}</td>
                                <td className="px-6 py-4 border border-sky-500">
                                    <div className="flex flex-col items-center gap-1">
                                        <ButtonSky
                                            className="flex items-center gap-1 w-full"
                                            onClick={() => handleModalOpen(item, "edit")}
                                        >
                                            <TbPencil />
                                            Edit
                                        </ButtonSky>
                                        <ButtonRed
                                            className="flex items-center gap-1 w-full"
                                            onClick={() => AlertQuestion("Hapus", "Hapus Data Sumber Dana?", "question", "Hapus", "Batal").then((resp) => {
                                                if (resp.isConfirmed) {
                                                    hapusSumberDana();
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
                            <td colSpan={6} className="px-6 py-4 font-semibold">Data Kosong, Tambahkan Data Sumber Dana</td>
                        </tr>
                    }
                </tbody>
            </table>
            {ModalOpen &&
                <ModalSumberDana
                    isOpen={ModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSuccess={onSuccess}
                    jenis={JenisModal}
                    Data={DataModal}
                />
            }
        </TableComponent>
    )
}

export default Table;
