'use client'

import { useState } from "react";
import { Breadcrumbs } from "@/src/components/ui/breadcrubs";
import Card from "@/src/components/ui/card";
import CardHeader from "@/src/components/ui/cardHeader";
import { ButtonSky } from "@/src/components/global/button/Button";
import { TbCirclePlus } from "react-icons/tb";
import Table from "./comp/Table";
import { useBrandingContext } from "@/src/providers/BrandingProvider";
import { ModalMasterPegawai } from "./comp/ModalMasterPegawai";
import { MoonLoading } from "@/src/lib/helper/loading";
import { ErrorMessage } from "@/src/components/ui/error";
import { GetResponseFindallPegawai } from "./type";

const MasterPegawai = () => {

    const menu = [
        { label: "Data Master OPD", href: "/" },
        { label: "Pegawai", href: "/data-master-opd/master-pegawai", active: true }
    ]

    const { branding } = useBrandingContext();
    const [ModalOpen, setModalOpen] = useState<boolean>(false);

    const data: GetResponseFindallPegawai[] = [];
    const loading = false;
    const error = false;
    const refetch = () => {};
    if (loading) {
        return <MoonLoading />
    } else if (error) {
        return <ErrorMessage />
    } else {
        return (
            <>
                <Breadcrumbs items={menu} />
                <Card>
                    <CardHeader>
                        <div className="flex flex-col">
                            <h1 className="font-bold text-lg uppercase text-blue-800">Master Pegawai</h1>
                            <h1 className="font-semibold text-sm uppercase">{branding?.opd?.label}</h1>
                        </div>
                        <ButtonSky
                            className="flex items-center gap-1"
                            onClick={() => setModalOpen(true)}
                        >
                            <TbCirclePlus />
                            Tambah Pegawai
                        </ButtonSky>
                    </CardHeader>
                    <Table
                        Data={data || []}
                        kode_opd={branding?.opd?.value || ""}
                        nama_opd={branding?.opd?.label || "-"}
                        onSuccess={refetch}
                    />
                </Card>
                {ModalOpen &&
                    <ModalMasterPegawai
                        isOpen={ModalOpen}
                        onClose={() => setModalOpen(false)}
                        onSuccess={refetch}
                        kode_opd={branding?.opd?.value || ""}
                        nama_opd={branding?.opd?.label || ""}
                        jenis="tambah"
                        Data={null}
                    />
                }
            </>
        )
    }

}

export default MasterPegawai;
