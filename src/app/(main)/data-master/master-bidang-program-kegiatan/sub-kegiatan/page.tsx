'use client'

import { useCallback, useEffect, useMemo, useState } from "react";
import Card from "@/src/components/ui/card";
import CardHeader from "@/src/components/ui/cardHeader";
import Table from "./comp/Table";
import { ButtonSkyBorder } from "@/src/components/global/button/Button";
import { TbCirclePlus, TbRefresh } from "react-icons/tb";
import { ModalSubKegiatan } from "./comp/ModalSubKegiatan";
import { GetResponseSubKegiatan } from "../type";
import { MoonLoading } from "@/src/lib/helper/loading";
import { ErrorMessage } from "@/src/components/ui/error";
import { useBrandingContext } from "@/src/providers/BrandingProvider";
import { AlertNotification } from "@/src/lib/helper/sweetalert2";

const MasterKegiatan = () => {
    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const [data, setData] = useState<GetResponseSubKegiatan[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const { branding } = useBrandingContext();
    const apiUrl = branding?.api_url || "";

    const loadSubKegiatan = useCallback(async () => {
        if (!apiUrl) {
            setLoading(false);
            setError(true);
            return;
        }

        setLoading(true);
        setError(false);

        try {
            const response = await fetch(`${apiUrl}/subkegiatan/detail/get-all-subkegiatans`);
            if (!response.ok) {
                throw new Error("Gagal memuat data sub kegiatan.");
            }

            type SubKegiatanPayload = {
                kodeSubKegiatan: string;
                namaSubKegiatan: string;
                id?: number;
            };

            const result = (await response.json()) as SubKegiatanPayload[] | null;
            const normalized = (result || []).map((item, index) => ({
                id: item.id ?? index,
                kodeSubKegiatan: item.kodeSubKegiatan,
                namaSubKegiatan: item.namaSubKegiatan
            }));

            setData(normalized);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [apiUrl]);

    const refetch = useCallback(() => {
        loadSubKegiatan();
    }, [loadSubKegiatan]);

    const filteredData = useMemo(() => {
        if (!data || data.length === 0) {
            return [];
        }
        const query = searchQuery.trim().toLowerCase();
        if (!query) {
            return data;
        }
        return data.filter((item) =>
            (item.namaSubKegiatan ?? "").toLowerCase().includes(query) ||
            (item.kodeSubKegiatan ?? "").toLowerCase().includes(query)
        );
    }, [data, searchQuery]);

    const handleReset = () => {
        setSearchQuery("");
    };

    const handleSync = useCallback(() => {
        AlertNotification("Info", "Sinkronisasi hanya tampilan.", "info", 2000, true);
    }, []);

    useEffect(() => {
        loadSubKegiatan();
    }, [loadSubKegiatan]);

    if (loading) {
        return <MoonLoading />
    }

    if (error) {
        return <ErrorMessage />
    } else {
        return (
            <>
                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4 w-full">
                            <h1 className="font-bold text-lg uppercase text-blue-800">Master Sub Kegiatan</h1>
                            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                                <div className="flex-1">
                                    <label className="text-sm font-medium text-slate-600">Cari Sub Kegiatan</label>
                                    <div className="mt-1 flex flex-col gap-2 sm:flex-row">
                                        <input
                                            type="search"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Nama atau kode Sub Kegiatan"
                                            className="w-full max-w-[280px] rounded border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300"
                                        />
                                        <ButtonSkyBorder
                                            className="flex items-center justify-center gap-1 px-4 py-2"
                                            type="button"
                                            onClick={handleReset}
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
                                        onClick={handleSync}
                                    >
                                        <TbRefresh />
                                        Sinkronisasi
                                    </ButtonSkyBorder>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <Table Data={filteredData} onSuccess={refetch} />
                </Card>
                {ModalOpen &&
                    <ModalSubKegiatan
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
}

export default MasterKegiatan;
