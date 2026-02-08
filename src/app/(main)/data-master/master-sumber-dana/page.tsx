'use client'

import { useState } from "react"
import { Breadcrumbs } from "@/src/components/ui/breadcrubs"
import Card from "@/src/components/ui/card"
import CardHeader from "@/src/components/ui/cardHeader"
import Table from "./comp/Table"
import { ButtonSky } from "@/src/components/global/button/Button"
import { TbCirclePlus } from "react-icons/tb"
import { ModalSumberDana } from "./comp/ModalSumberDana"
import { GetResponseFindallSumberDana } from "./type"
import { MoonLoading } from "@/src/lib/helper/loading"
import { ErrorMessage } from "@/src/components/ui/error"

const SumberDana = () => {

    const menu = [
        { label: "Data Master", href: "/" },
        { label: "Sumber Dana", href: "/data-master/master-sumber-dana", active: true }
    ]

    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const data: GetResponseFindallSumberDana[] = [];
    const loading = false;
    const error = false;
    const refetch = () => {};
    
    if(loading){
        return <MoonLoading />
    } else if(error) {
        return <ErrorMessage />
    } else {
        return(
            <>
                <Breadcrumbs items={menu}/>
                <Card>
                    <CardHeader>
                            <h1 className="font-bold text-lg uppercase text-blue-800">Master Sumber Dana</h1>
                            <ButtonSky 
                                className="flex items-center gap-1"
                                onClick={() => setModalOpen(true)}
                            >
                                <TbCirclePlus />
                                Tambah
                            </ButtonSky>
                    </CardHeader>
                    <Table Data={data || []} onSuccess={refetch}/>
                </Card>
                {ModalOpen &&
                    <ModalSumberDana 
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

export default SumberDana;
