'use client'

import { useMemo, useState } from "react";
import { Breadcrumbs } from "@/src/components/ui/breadcrubs";
import Card from "@/src/components/ui/card";
import CardHeader from "@/src/components/ui/cardHeader";
import Table from "./comp/Table";
import { MoonLoading } from "@/src/lib/helper/loading";
import { ButtonSkyBorder } from "@/src/components/global/button/Button";
import { TbCirclePlus, TbRefresh } from "react-icons/tb";
import { ModalMasterPemda } from "./comp/ModalMasterPemda";
import { PemdaPayload } from "./type";
import { ErrorMessage } from "@/src/components/ui/error";
import { AlertNotification } from "@/src/lib/helper/sweetalert2";
import { useBrandingContext } from "@/src/providers/BrandingProvider";
import { useHook } from "@/src/hooks/useHook";

const MasterPemda = () => {

    const { branding } = useBrandingContext();
    const apiUrl = branding?.api_url || "";
    const { data, loading, error, refetch } = useHook<PemdaPayload[]>(apiUrl ? `${apiUrl}/pemda/detail/get-all-pemdas` : "", [apiUrl]);
    const [Modal, setModal] = useState<boolean>(false);
    const [selectedPemda, setSelectedPemda] = useState<PemdaPayload | null>(null);
    const [modalMode, setModalMode] = useState<"tambah" | "edit">("tambah");
    const [searchQuery, setSearchQuery] = useState<string>("");

    const filteredData = useMemo(() => {
        if (!data) return [];
        const query = searchQuery.trim().toLowerCase();
        if (!query) return data;
        return data.filter((item) =>
            (item.namaPemda ?? "").toLowerCase().includes(query) ||
            (item.kodePemda ?? "").toLowerCase().includes(query)
        );
    }, [data, searchQuery]);

    const breadcrumbItems = [
        { label: 'Data Master', href: '/' },
        { label: 'Master PEMDA', href: '/data-master/master-pemda', active: true }
    ];

    if (loading) {
        return <MoonLoading />
    } else if (error) {
        return <ErrorMessage />
    }

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 w-full">
                        <h1 className="font-bold text-lg uppercase text-emerald-800">Master PEMDA</h1>
                        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div className="flex-1">
                                <label className="text-sm font-medium text-slate-600">Cari PEMDA</label>
                                <div className="mt-1 flex flex-col gap-2 sm:flex-row">
                                    <input
                                        type="search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Nama atau kode PEMDA"
                                        className="w-full max-w-[280px] rounded border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-300"
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
                                    onClick={() => {
                                        setModalMode("tambah");
                                        setSelectedPemda(null);
                                        setModal(true);
                                    }}
                                >
                                    <TbCirclePlus />
                                    Tambah PEMDA
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
                    onEdit={(item) => {
                        setModalMode("edit");
                        setSelectedPemda(item);
                        setModal(true);
                    }}
                    apiUrl={apiUrl}
                />
            </Card>
            <ModalMasterPemda
                isOpen={Modal}
                onClose={() => {
                    setModal(false);
                    setSelectedPemda(null);
                    setModalMode("tambah");
                }}
                onSuccess={refetch}
                apiUrl={apiUrl}
                jenis={modalMode}
                initialData={modalMode === "edit" ? selectedPemda ?? undefined : undefined}
            />
        </>
    )
}

export default MasterPemda;
