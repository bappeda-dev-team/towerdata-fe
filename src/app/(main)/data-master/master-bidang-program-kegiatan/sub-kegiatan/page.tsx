'use client'

import { useState } from "react";
import Card from "@/src/components/ui/card";
import CardHeader from "@/src/components/ui/cardHeader";
import Table from "./comp/Table";
import { ButtonSkyBorder } from "@/src/components/global/button/Button";
import { TbCirclePlus } from "react-icons/tb";
import { ModalSubKegiatan } from "./comp/ModalSubKegiatan";
import { GetResponseSubKegiatan } from "../type";
import { MoonLoading } from "@/src/lib/helper/loading";
import { ErrorMessage } from "@/src/components/ui/error";

const MasterKegiatan = () => {
    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const data: GetResponseSubKegiatan[] = [];
    const loading = false;
    const error = false;
    const refetch = () => {};

    if(loading){
        return <MoonLoading />
    } else if(error) {
        return <ErrorMessage />
    } else {
        return (
            <>
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center w-full">
                            <h1 className="font-bold text-lg uppercase text-blue-800">Master Sub Kegiatan</h1>
                            <ButtonSkyBorder
                                className="flex items-center gap-1"
                                onClick={() => setModalOpen(true)}
                            >
                                <TbCirclePlus />
                                Tambah Data
                            </ButtonSkyBorder>
                        </div>
                    </CardHeader>
                    <Table Data={data || []} onSuccess={refetch} />
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
