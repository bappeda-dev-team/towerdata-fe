'use client'

import { useState } from "react";
import Card from "@/src/components/ui/card";
import CardHeader from "@/src/components/ui/cardHeader";
import Table from "./comp/Table";
import { ButtonSkyBorder } from "@/src/components/global/button/Button";
import { TbCirclePlus } from "react-icons/tb";
import { useBrandingContext } from "@/src/providers/BrandingProvider";
import { MoonLoading } from "@/src/lib/helper/loading";
import { ModalPilihKegiatan } from "./comp/ModalPilihKegiatan";
import { GetResponseKegiatanOpd } from "../type";
import { ErrorMessage } from "@/src/components/ui/error";

const MasterKegiatan = () => {

    const Jenis: "Program" | "Kegiatan" | "Sub Kegiatan" = "Kegiatan";
    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const { branding } = useBrandingContext();
    const data: GetResponseKegiatanOpd[] = [];
    const loading = false;
    const error = false;
    const refetch = () => {};

    if (loading) {
        return <MoonLoading />;
    }

    if (error) {
        return <ErrorMessage />;
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center w-full">
                        <div className="flex flex-col">
                            <h1 className="font-bold text-lg uppercase text-blue-800">Master Program, Kegiatan & Sub Kegiatan</h1>
                            <h1 className="font-semibold text-sm uppercase">{branding?.opd?.label}</h1>
                        </div>
                        <ButtonSkyBorder
                            className="flex items-center gap-1"
                            onClick={() => setModalOpen(true)}
                        >
                            <TbCirclePlus />
                            Tambah Data
                        </ButtonSkyBorder>
                    </div>
                </CardHeader>
                <Table jenis={Jenis} Data={data || []} apiUrl={branding?.api_url} onDeleteSuccess={refetch} />
            </Card>
            {ModalOpen &&
                <ModalPilihKegiatan
                    nama_opd={branding?.opd?.label || "-"}
                    isOpen={ModalOpen}
                    existingKegiatanCodes={data?.map((item) => item.kodeKegiatanOpd) ?? []}
                    onClose={() => setModalOpen(false)}
                    onSuccess={refetch}
                />
            }
        </>
    );
}

export default MasterKegiatan;
