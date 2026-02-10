'use client'

import { useMemo, useState } from "react"
import { useBrandingContext } from "@/src/providers/BrandingProvider"
import { useHook } from "@/src/hooks/useHook"
import Card from "@/src/components/ui/card"
import CardHeader from "@/src/components/ui/cardHeader"
import Table from "./comp/Table"
import { ButtonSkyBorder } from "@/src/components/global/button/Button"
import { TbCirclePlus, TbRefresh } from "react-icons/tb"
import { ModalBidangUrusan } from "./comp/ModalBidangUrusan"
import { MoonLoading } from "@/src/lib/helper/loading"
import { ErrorMessage } from "@/src/components/ui/error"
import { BidangUrusan } from "@/src/types"
import { AlertNotification } from "@/src/lib/helper/sweetalert2"

const MasterBidang = () => {
    const [ModalOpen, setModalOpen] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const { branding } = useBrandingContext()
    const apiUrl = branding?.api_url || ""
    const { data, loading, error, refetch } = useHook<BidangUrusan[]>(
        apiUrl ? `${apiUrl}/bidangurusan/detail/findall` : "",
        [apiUrl]
    )
    const dataSource = data ?? []
    const filteredData = useMemo(() => {
        if (!dataSource || dataSource.length === 0) return []
        const query = searchQuery.trim().toLowerCase()
        if (!query) return dataSource
        return dataSource.filter((item) =>
            (item.namaBidangUrusan ?? "").toLowerCase().includes(query) ||
            (item.kodeBidangUrusan ?? "").toLowerCase().includes(query)
        )
    }, [dataSource, searchQuery])

    if (loading) {
        return <MoonLoading />
    } else if (error) {
        return <ErrorMessage />
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 w-full">
                        <h1 className="font-bold text-lg uppercase text-blue-800">Master Bidang Urusan</h1>
                        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div className="flex-1">
                                <label className="text-sm font-medium text-slate-600">Cari Bidang Urusan</label>
                                <div className="mt-1 flex flex-col gap-2 sm:flex-row">
                                    <input
                                        type="search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Nama atau kode Bidang Urusan"
                                        className="w-full max-w-[280px] rounded border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300"
                                    />
                                    <ButtonSkyBorder
                                        className="flex items-center justify-center gap-1 px-4 py-2"
                                        type="button"
                                        onClick={() => setSearchQuery("")}
                                    >
                                        Reset
                                    </ButtonSkyBorder>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <ButtonSkyBorder
                                    className="flex items-center gap-1"
                                    onClick={() => setModalOpen(true)}
                                >
                                    <TbCirclePlus />
                                    Tambah Data
                                </ButtonSkyBorder>
                                <ButtonSkyBorder
                                    className="flex items-center gap-1"
                                    onClick={() => AlertNotification("Info", "Sinkronisasi hanya tampilan.", "info", 2000, true)}
                                >
                                    <TbRefresh />
                                    Sinkronisasi
                                </ButtonSkyBorder>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <Table
                    Data={filteredData}
                    onSuccess={refetch}
                    apiUrl={apiUrl}
                />
            </Card>
            {ModalOpen &&
                <ModalBidangUrusan
                    isOpen={ModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSuccess={refetch}
                    jenis="tambah"
                    Data={null}
                    apiUrl={apiUrl}
                />
            }
        </>
    )
}

export default MasterBidang
