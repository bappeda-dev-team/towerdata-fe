'use client'

import { useState } from "react"
import Card from "@/src/components/ui/card"
import CardHeader from "@/src/components/ui/cardHeader"
import Table from "./comp/Table"
import { ButtonSkyBorder } from "@/src/components/global/button/Button"
import { TbCirclePlus } from "react-icons/tb"
import { ModalBidangUrusan } from "./comp/ModalBidangUrusan"
import { MoonLoading } from "@/src/lib/helper/loading"
import { ErrorMessage } from "@/src/components/ui/error"
import { BidangUrusan } from "@/src/types"

const MasterBidang = () => {
    const [ModalOpen, setModalOpen] = useState<boolean>(false)
    const data: BidangUrusan[] = []
    const loading = false
    const error = false
    const refetch = () => { }

    if (loading) {
        return <MoonLoading />
    } else if (error) {
        return <ErrorMessage />
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center w-full">
                        <h1 className="font-bold text-lg uppercase text-blue-800">Master Bidang Urusan</h1>
                        <ButtonSkyBorder
                            className="flex items-center gap-1"
                            onClick={() => setModalOpen(true)}
                        >
                            <TbCirclePlus />
                            Tambah Data
                        </ButtonSkyBorder>
                    </div>
                </CardHeader>
                <Table
                    Data={data}
                    onSuccess={refetch}
                />
            </Card>
            {ModalOpen &&
                <ModalBidangUrusan
                    isOpen={ModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSuccess={refetch}
                    jenis="tambah"
                    Data={null}
                />
            }
        </>
    )
}

export default MasterBidang
