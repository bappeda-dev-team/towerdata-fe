'use client'

import { useState } from "react"
import TableComponent from "@/src/components/ui/tableComponent"
import { ButtonSky, ButtonRed } from "@/src/components/global/button/Button"
import { TbPencil, TbTrash } from "react-icons/tb"
import { ModalBidangUrusan } from "./ModalBidangUrusan"
import { AlertQuestion, AlertNotification } from "@/src/lib/helper/sweetalert2"
import { BidangUrusan } from "@/src/types"

interface TableProps {
    Data: BidangUrusan[]
    onSuccess: () => void
}

const Table: React.FC<TableProps> = ({ Data, onSuccess }) => {

    const [ModalOpen, setModalOpen] = useState<boolean>(false)
    const [DataModal, setDataModal] = useState<BidangUrusan | null>(null)

    const handleModalOpen = (data: BidangUrusan | null) => {
        if (ModalOpen) {
            setModalOpen(false)
            setDataModal(null)
        } else {
            setModalOpen(true)
            setDataModal(data)
        }
    }

    const hapusBidang = () => {
        AlertNotification("Info", "Fitur ini hanya tampilan.", "info", 2000, true)
        onSuccess()
    }

    return (
        <TableComponent className="border-blue-500">
            <table className="w-full">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="border-r border-b py-1 px-2 border-gray-300 w-[50px] text-center">No</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px]">Bidang Urusan</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 min-w-[200px]">Kode</th>
                        <th className="border-r border-b py-1 px-2 border-gray-300 w-[100px]">Aksi</th>
                    </tr>
                    <tr className="bg-blue-700 text-white">
                        <th className="border-r border-b border-gray-300 text-center">1</th>
                        <th className="border-r border-b border-gray-300 text-center">2</th>
                        <th className="border-r border-b border-gray-300 text-center">3</th>
                        <th className="border-r border-b border-gray-300 text-center">4</th>
                    </tr>
                </thead>
                <tbody>
                    {Data.length > 0 ?
                        Data.map((item: BidangUrusan, index: number) => (
                            <tr>
                                <td className="px-6 py-4 border border-blue-500 text-center">{index + 1}</td>
                                <td className="px-6 py-4 border border-blue-500">{item.namaBidangUrusan || "-"}</td>
                                <td className="px-6 py-4 border border-blue-500">{item.kodeBidangUrusan || "-"}</td>
                                <td className="px-6 py-4 border border-blue-500">
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
                                            onClick={() => AlertQuestion("Hapus", "Hapus Data Bidang Urusan?", "question", "Hapus", "Batal").then((resp) => {
                                                if (resp.isConfirmed) {
                                                    hapusBidang()
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
                            <td colSpan={4} className="px-6 py-4 font-semibold">Data Kosong, Tambahkan Data Bidang Urusan</td>
                        </tr>
                    }
                </tbody>
            </table>
            {ModalOpen &&
                <ModalBidangUrusan
                    isOpen={ModalOpen}
                    onClose={() => handleModalOpen(null)}
                    onSuccess={onSuccess}
                    jenis="edit"
                    Data={DataModal}
                />
            }
        </TableComponent>
    )
}

export default Table
