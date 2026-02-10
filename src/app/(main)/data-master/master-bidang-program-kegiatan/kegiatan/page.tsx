'use client'

import { useCallback, useEffect, useMemo, useState } from "react";
import Card from "@/src/components/ui/card";
import CardHeader from "@/src/components/ui/cardHeader";
import Table from "./comp/Table";
import { ButtonSkyBorder } from "@/src/components/global/button/Button";
import { TbCirclePlus } from "react-icons/tb";
import { TbRefresh } from "react-icons/tb";
import { ModalKegiatan } from "./comp/ModalKegiatan";
import { GetResponseKegiatan } from "../type";
import { MoonLoading } from "@/src/lib/helper/loading";
import { ErrorMessage } from "@/src/components/ui/error";
import { useBrandingContext } from "@/src/providers/BrandingProvider";
import { AlertNotification } from "@/src/lib/helper/sweetalert2";

const MasterKegiatan = () => {
    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const { branding } = useBrandingContext();
    const apiUrl = branding?.api_url || "";
    const [data, setData] = useState<GetResponseKegiatan[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const loadKegiatan = useCallback(async () => {
        if (!apiUrl) {
            setError(true);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(false);

        try {
            const response = await fetch(`${apiUrl}/kegiatan/detail/get-all-kegiatans`);
            if (!response.ok) {
                throw new Error("Gagal memuat data kegiatan.");
            }

            type KegiatanPayload = {
                kodeKegiatan: string;
                namaKegiatan: string;
                id?: number;
            };

            const result = (await response.json()) as KegiatanPayload[];
            const normalized: GetResponseKegiatan[] = result.map((item, index) => ({
                id: item.id ?? index,
                kodeKegiatan: item.kodeKegiatan,
                namaKegiatan: item.namaKegiatan
            }));
            setData(normalized);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [apiUrl]);

    const refetch = useCallback(() => {
        loadKegiatan();
    }, [loadKegiatan]);

    const filteredData = useMemo(() => {
        if (!data || data.length === 0) {
            return [];
        }
        const query = searchQuery.trim().toLowerCase();
        if (!query) {
            return data;
        }
        return data.filter((item) =>
            (item.namaKegiatan ?? "").toLowerCase().includes(query) ||
            (item.kodeKegiatan ?? "").toLowerCase().includes(query)
        );
    }, [data, searchQuery]);

    const handleReset = () => {
        setSearchQuery("");
    };

    const handleSync = useCallback(() => {
        AlertNotification("Info", "Sinkronisasi hanya tampilan.", "info", 2000, true);
    }, []);

    useEffect(() => {
        loadKegiatan();
    }, [loadKegiatan]);

    if (loading) {
        return <MoonLoading />
    }

    if (error) {
        return <ErrorMessage />
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 w-full">
                        <h1 className="font-bold text-lg uppercase text-blue-800">Master Kegiatan</h1>
                        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div className="flex-1">
                                <label className="text-sm font-medium text-slate-600">Cari Kegiatan</label>
                                <div className="mt-1 flex flex-col gap-2 sm:flex-row">
                                    <input
                                        type="search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Nama atau kode Kegiatan"
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
                <ModalKegiatan
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

export default MasterKegiatan;
