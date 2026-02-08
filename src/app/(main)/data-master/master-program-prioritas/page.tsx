'use client'

import { useState } from "react";
import { Breadcrumbs } from "@/src/components/ui/breadcrubs";
import Card from "@/src/components/ui/card";
import CardHeader from "@/src/components/ui/cardHeader";
import { ButtonSkyBorder } from "@/src/components/global/button/Button";
import { TbCirclePlus } from "react-icons/tb";
import Table from "./comp/Table";
import { ModalProgramPrioritas } from "./comp/ModalProgramPrioritas";
import { GetResponseFindallProgramPrioritas } from "./type";
import { MoonLoading } from "@/src/lib/helper/loading";
import { ErrorMessage } from "@/src/components/ui/error";

const MasterProgramPrioritas = () => {

    const breadcrumbItems = [
        { label: 'Data Master', href: '/' },
        { label: 'Program Prioritas', href: '/data-master/master-program-prioritas', active: true }
    ];

    const [Modal, setModal] = useState<boolean>(false);
    const [filterTahun, setFilterTahun] = useState<string>("");

    const data: GetResponseFindallProgramPrioritas[] = [];
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
                <Breadcrumbs items={breadcrumbItems} />
                <Card>
                    <CardHeader>
                        <h1 className="font-bold text-lg uppercase text-blue-800">Master Program Prioritas</h1>
                        <ButtonSkyBorder
                            className="flex items-center gap-1"
                            onClick={() => setModal(true)}
                        >
                            <TbCirclePlus />
                            Tambah Data
                        </ButtonSkyBorder>
                    </CardHeader>
                    <div className="px-4 py-2 border-b border-sky-500">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700">Pilih periode :</label>
                            <select
                                value={filterTahun}
                                onChange={(e) => setFilterTahun(e.target.value)}
                                className="px-3 py-1.5 border border-sky-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                            >
                                <option value="">Semua Tahun</option>
                                <option value="2025-2030">2025 - 2030</option>
                                <option value="2030-2035">2030 - 2035</option>
                                <option value="2035-2040">2035 - 2040</option>
                                <option value="2040-2045">2040 - 2045</option>
                                <option value="2045-2050">2045 - 2050</option>
                            </select>
                        </div>
                    </div>
                    <Table
                        Data={data || []}
                        onSuccess={refetch}
                        filterTahun={filterTahun}
                    />
                </Card>
                {Modal &&
                    <ModalProgramPrioritas
                        isOpen={Modal}
                        onClose={() => setModal(false)}
                        onSuccess={refetch}
                        jenis="tambah"
                        Data={null}
                    />
                }
            </>
        )
    }
    
}

export default MasterProgramPrioritas;
