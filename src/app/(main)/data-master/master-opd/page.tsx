'use client'

import { useState } from "react";
import { Breadcrumbs } from "@/src/components/ui/breadcrubs";
import Card from "@/src/components/ui/card";
import CardHeader from "@/src/components/ui/cardHeader";
import Table from "./comp/Table";
import { MoonLoading } from "@/src/lib/helper/loading";
import { ButtonSkyBorder } from "@/src/components/global/button/Button";
import { TbCirclePlus } from "react-icons/tb";
import { ModalMasterOpd } from "./comp/ModalMasterOpd";
import { OpdFindallResponse } from "@/src/app/(main)/data-master/master-opd/master-opd";
import { ErrorMessage } from "@/src/components/ui/error";

const MasterOpd = () => {

    const breadcrumbItems = [
        { label: 'Data Master', href: '/' },
        { label: 'Nama OPD', href: '/data-master/master-opd', active: true }
    ];

    const [Modal, setModal] = useState<boolean>(false);

    const data: OpdFindallResponse[] = [];
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
                <Breadcrumbs items={breadcrumbItems} />
                <Card>
                    <CardHeader>
                        <h1 className="font-bold text-lg uppercase text-blue-800">Master OPD</h1>
                        <ButtonSkyBorder
                            className="flex items-center gap-1"
                            onClick={() => setModal(true)}
                        >
                            <TbCirclePlus />
                            Tambah OPD
                        </ButtonSkyBorder>
                    </CardHeader>
                    <Table
                        Data={data || []}
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
