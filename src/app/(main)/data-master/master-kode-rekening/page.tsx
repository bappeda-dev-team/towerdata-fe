'use client'

import { useState } from "react";
import { Breadcrumbs } from "@/src/components/ui/breadcrubs";
import Card from "@/src/components/ui/card";
import CardHeader from "@/src/components/ui/cardHeader";
import { ButtonSkyBorder } from "@/src/components/global/button/Button";
import { TbCirclePlus } from "react-icons/tb";
import Table from "./comp/Table";
import { ModalKodeRekening } from "./comp/ModalKodeRekening";
import { GetResponseFindallRekening } from "./type";
import { MoonLoading } from "@/src/lib/helper/loading";

const MasterKodeRekening = () => {

    const menu = [
        { label: "Data Master", href: "/" },
        { label: "Kode Rekening", href: "/data-master/master-kode-rekening", active: true },
    ]

    const data: GetResponseFindallRekening[] = [];
    const loading = false;
    const error = false;
    const refetch = () => {};
    
    const [ModalOpen, setModalOpen] = useState<boolean>(false);

    if(loading){
        return <MoonLoading />
    } else if(error){
        return <h1>{"error saat mengambil data master rekening"}</h1>
    } else {
        return (
            <>
                <Breadcrumbs items={menu} />
                <Card>
                    <CardHeader>
                        <h1 className="font-bold text-lg uppercase text-blue-800">Master Rekening</h1>
                        <ButtonSkyBorder
                            className="flex items-center gap-1"
                            onClick={() => setModalOpen(true)}
                        >
                            <TbCirclePlus />
                            Tambah Rekening
                        </ButtonSkyBorder>
                    </CardHeader>
                    <Table 
                        onSuccess={refetch} 
                        data={data || []}
                    />
                </Card>
                {ModalOpen &&
                    <ModalKodeRekening
                        isOpen={ModalOpen}
                        onClose={() => setModalOpen(false)}
                        onSuccess={refetch}
                        jenis="tambah"
                    />
                }
            </>
        )
    }
}

export default MasterKodeRekening;
