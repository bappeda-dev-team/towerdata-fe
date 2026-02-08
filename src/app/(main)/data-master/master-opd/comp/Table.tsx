'use client'

import { useState } from "react";
import TableComponent from "@/src/components/ui/tableComponent";
import { ButtonSky, ButtonRed } from "@/src/components/global/button/Button";
import { TbPencil, TbTrash } from "react-icons/tb";
import { ModalMasterOpd } from "./ModalMasterOpd";
import { AlertQuestion, AlertNotification } from "@/src/lib/helper/sweetalert2";
import { OpdFindallResponse } from "@/src/app/(main)/data-master/master-opd/master-opd";

interface Table {
    onSuccess: () => void;
    Data: OpdFindallResponse[];
}

const Table: React.FC<Table> = ({ onSuccess, Data }) => {

    const [ModalMaster, setModalMaster] = useState<boolean>(false);
    const [DataMaster, setDataMaster] = useState<any>(null);

    const handleModalMaster = (Data: any) => {
        if (ModalMaster) {
            setModalMaster(false);
            setDataMaster(null);
        } else {
            setModalMaster(true);
            setDataMaster(Data);
        }
    }
    const hapusOpd = () => {
        AlertNotification("Info", "Fitur ini hanya tampilan.", "info", 2000, true);
        onSuccess();
    }

    return (
        <TableComponent className="border-sky-500">
            <table className="w-full">
                <thead>
                    <tr className="bg-sky-500 text-white">
                        <th className="border-r border-b py-1 px-2 border-gray-300 w-[50px] text-center">No</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px]">Nama OPD</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px]">Kode OPD</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px]">Aksi</th>
                    </tr>
                    <tr className="bg-sky-600 text-white">
                        <th className="border-r border-b p-1 border-gray-300 text-center">1</th>
                        <th className="border-r border-b p-1 border-gray-300 text-center">2</th>
                        <th className="border-r border-b p-1 border-gray-300 text-center">3</th>
                        <th className="border-r border-b p-1 border-gray-300 text-center">4</th>
                    </tr>
                </thead>
                <tbody>
                    {Data.length > 0 ?
                        Data.map((item: OpdFindallResponse, index: number) => (
                            <tr key={index}>
                                <td className="px-6 py-4 border border-sky-500 text-center">{index + 1}</td>
                                <td className="px-6 py-4 border border-sky-500">{item.namaOpd || "-"}</td>
                                <td className="px-6 py-4 border border-sky-500">{item.kodeOpd || "X"}</td>
                                <td className="px-6 py-4 border border-sky-500">
                                    <div className="flex flex-col gap-1">
                                        <ButtonSky
                                            className="flex items-center gap-1"
                                            onClick={() => handleModalMaster(item)}
                                        >
                                            <TbPencil />
                                            Edit
                                        </ButtonSky>
                                        <ButtonRed
                                            className="flex items-center gap-1"
                                            onClick={() => AlertQuestion("Hapus", "Hapus Data OPD?", "question", "Hapus", "Batal").then((resp) => {
                                                if (resp.isConfirmed) {
                                                    hapusOpd();
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
                            <td colSpan={4} className="px-6 py-4 font-semibold">Data Kosong, Tambahkan Data OPD Baru</td>
                        </tr>
                    }
                </tbody>
            </table>
            {ModalMaster &&
                <ModalMasterOpd
                    isOpen={ModalMaster}
                    onClose={() => handleModalMaster(null)}
                    onSuccess={onSuccess}
                    jenis="edit"
                    Data={DataMaster}
                />
            }
        </TableComponent>
    )
}

export default Table;
