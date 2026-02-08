'use client'

import { Breadcrumbs } from "@/src/components/ui/breadcrubs"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Header = () => {

    const menu = [
        { label: "Data Master OPD", href: "/" },
        { label: "Master Program, Kegiatan & Sub Kegiatan", href: "/data-master-opd/master-bidang-program-kegiatan", active: true },
    ]

    const url = usePathname();

    return (
        <>
            <Breadcrumbs items={menu} />
            <div className="flex items-center gap-2 mt-2 overflow-x-auto">
                <Link href={`/data-master-opd/master-bidang-program-kegiatan/program`}>
                    <button
                        className={`${url === "/data-master-opd/master-bidang-program-kegiatan/program" ? "bg-blue-500 text-white" : "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"} py-1 px-3 text-center w-[200px] rounded-xl cursor-pointer`}
                    >
                        Program
                    </button>
                </Link>
                <Link href={`/data-master-opd/master-bidang-program-kegiatan/kegiatan`}>
                    <button
                        className={`${url === "/data-master-opd/master-bidang-program-kegiatan/kegiatan" ? "bg-green-500 text-white" : "border border-green-500 text-green-500 hover:bg-green-500 hover:text-white"} py-1 px-3 text-center w-[200px] rounded-xl cursor-pointer`}
                    >
                        Kegiatan
                    </button>
                </Link>
                <Link href={`/data-master-opd/master-bidang-program-kegiatan/subkegiatan`}>
                    <button
                        className={`${url === "/data-master-opd/master-bidang-program-kegiatan/subkegiatan" ? "bg-emerald-500 text-white" : "border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white"} py-1 px-3 text-center w-[200px] rounded-xl cursor-pointer whitespace-nowrap text-ellipsis`}
                    >
                        Sub Kegiatan
                    </button>
                </Link>
            </div>
        </>
    )
}
