'use client'

import { useMemo, useState } from "react";
import { Breadcrumbs } from "@/src/components/ui/breadcrubs";
import Card from "@/src/components/ui/card";
import CardHeader from "@/src/components/ui/cardHeader";
import Table from "./comp/Table";
import { MoonLoading } from "@/src/lib/helper/loading";
import { ButtonSkyBorder } from "@/src/components/global/button/Button";
import { TbCirclePlus, TbRefresh } from "react-icons/tb";
import { ModalMasterOpd } from "./comp/ModalMasterOpd";
import { OpdFindallResponse } from "@/src/app/(main)/data-master/master-opd/type";
import { ErrorMessage } from "@/src/components/ui/error";
import { useBrandingContext } from "@/src/providers/BrandingProvider";
import { useHook } from "@/src/hooks/useHook";
import { AlertNotification } from "@/src/lib/helper/sweetalert2";

const MasterOpd = () => {

    const [Modal, setModal] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const breadcrumbItems = [
        { label: 'Data Master', href: '/' },
        { label: 'Nama OPD', href: '/data-master/master-opd', active: true }
    ];

    const { branding } = useBrandingContext();
    const apiUrl = branding?.api_url || "";
    const endpoint = apiUrl ? `${apiUrl}/opd/detail/get-all-opds` : "";
    const { data, loading, error, refetch } = useHook<OpdFindallResponse[]>(endpoint, [apiUrl]);
    const filteredData = useMemo(() => {
        if (!data) return [];
        const query = searchQuery.trim().toLowerCase();
        if (!query) return data;
        return data.filter((item) =>
            (item.namaOpd ?? "").toLowerCase().includes(query) ||
            (item.kodeOpd ?? "").toLowerCase().includes(query)
        );
    }, [data, searchQuery]);

    if (loading) {
        return <MoonLoading />
    } else if (error) {
        return <ErrorMessage />
    } else {
        return (
            <>
                <Breadcrumbs items={breadcrumbItems} />
                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4 w-full">
                            <h1 className="font-bold text-lg uppercase text-blue-800">Master OPD</h1>
                            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                                <div className="flex-1">
                                    <label className="text-sm font-medium text-slate-600">Cari OPD</label>
                                    <div className="mt-1 flex flex-col gap-2 sm:flex-row">
                                        <input
                                            type="search"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Nama atau kode OPD"
                                            className="w-full max-w-[280px] rounded border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-300"
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
                                        onClick={() => setModal(true)}
                                    >
                                        <TbCirclePlus />
                                        Tambah OPD
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
                    />
                </Card>
                <ModalMasterOpd
                    isOpen={Modal}
                    onClose={() => setModal(false)}
                    onSuccess={refetch}
                    jenis="tambah"
                />
            </>
        )
    }
}

export default MasterOpd;
