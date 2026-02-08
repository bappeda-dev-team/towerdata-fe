'use client'

import Link from "next/link"
import Image from "next/image";
import {
    TbCircleFilled, TbUsersGroup, TbLogout,
    TbArrowBarLeft, TbArrowBarRight,
    TbBuildingSkyscraper, TbFiles, TbFolderDollar,
    TbFileDollar, TbUniverse, TbSortAscendingNumbers,
    TbHome, TbMoneybag, TbPinned, TbTargetArrow
} from "react-icons/tb";
import { usePathname } from "next/navigation";
import { ButtonSkyBorder, ButtonRed } from "./button/Button";
import { useBrandingContext } from "@/src/providers/BrandingProvider";

interface Sidebar {
    onShow: () => void;
    show: boolean;
}

export const Sidebar: React.FC<Sidebar> = ({ onShow, show }) => {
    const url = usePathname();
    const {branding, loadingBranding} = useBrandingContext();

    const getActiveClass = (isActive: boolean, type = 'default') => {
        const activeClasses = "text-white bg-sky-500";
        let defaultClasses = "hover:text-white text-sky-500 hover:bg-sky-700";

        if (type === 'default') {
            defaultClasses += " border border-sky-500";
        } else if (type === 'dropdown') {
            defaultClasses += " border border-sky-300";
        }

        return isActive ? activeClasses : defaultClasses;
    };

    return (
        <div
            className={`
                fixed my-2 ml-2 left-0 top-0 bottom-0 
                overflow-y-auto rounded-lg p-3
                shadow-lg shadow-gray-400 border border-sky-300 bg-white
                ${show ? "w-[250px]" : "w-20"}
            `}
        >
            <ButtonSkyBorder
                className="w-full flex gap-1 mb-3"
                onClick={onShow}
            >
                {show ?
                    <>
                        <TbArrowBarLeft />
                        Sembunyikan
                    </>
                    :
                    <TbArrowBarRight />
                }
            </ButtonSkyBorder>
            <div className="flex flex-wrap flex-col items-center gap-2 justify-center mb-4">
                <Image
                    src={branding?.logo || "/placeholder-logo.png"}
                    alt="logo"
                    width={40}
                    height={40}
                />
                {show &&
                <div className="flex flex-col items-center justify-center">
                    <h1 className="font-bold text-xl text-sky-600 uppercase border-b border-sky-600">{branding?.nama_app || "Tower Data"}</h1>
                    <h3 className="font-semibold text-sm text-sky-900 uppercase">{branding?.nama_pemda || "Pemerintah Daerah"}</h3>
                </div>
                }
            </div>
            <ul className="flex flex-col gap-2">
                <div className="pl-2 py-2 flex flex-col gap-2 border-y border-l border-sky-600 rounded-bl-lg rounded-tl-lg">
                    <Link
                        href='/'
                        className={`flex items-center gap-1 font-medium rounded-lg cursor-pointer py-1 px-5 ${getActiveClass(
                            url === "/", 'default'
                        )}`}
                    >
                        <TbHome />
                        {show &&
                            <p>
                                Dashboard
                            </p>
                        }
                    </Link>
                </div>
                {show &&
                    <p className="flex gap-1 items-center text-slate-500 font-light text-sm italic">
                        <TbCircleFilled size={10} className="text-sky-300" />
                        DATA MASTER
                    </p>
                }
                <div className="pl-2 py-2 flex flex-col gap-2 border-b border-l border-sky-600 rounded-b-lg">
                    <Link
                        href='/data-master/master-pemda'
                        className={`flex items-center gap-1 font-medium rounded-lg cursor-pointer py-1 px-5 ${getActiveClass(
                            url.startsWith('/data-master/master-pemda'), 'default'
                        )}`}
                    >
                        <TbBuildingSkyscraper />
                        {show &&
                            <p>
                                Pemda
                            </p>
                        }
                    </Link>
                    <Link
                        href='/data-master/master-opd'
                        className={`flex items-center gap-1 font-medium rounded-lg cursor-pointer py-1 px-5 ${getActiveClass(
                            url.startsWith('/data-master/master-opd'), 'default'
                        )}`}
                    >
                        <TbBuildingSkyscraper />
                        {show &&
                            <p>
                                OPD
                            </p>
                        }
                    </Link>
                    <Link
                        href='/data-master/master-bidang-program-kegiatan/bidang'
                        className={`flex items-center gap-1 font-medium rounded-lg cursor-pointer py-1 px-5 ${getActiveClass(
                            url.startsWith('/data-master/master-bidang-program-kegiatan'), 'default'
                        )}`}
                    >
                        <TbUniverse />
                        {show &&
                            <p className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px]" title="Bidang Urusan, Program, Kegiatan, Sub Kegiatan">
                                Bidang Urusan, Program, Kegiatan, Sub Kegiatan
                            </p>
                        }
                    </Link>
                    <Link
                        href='/data-master/master-kode-rekening'
                        className={`flex items-center gap-1 font-medium rounded-lg cursor-pointer py-1 px-5 ${getActiveClass(
                            url.startsWith('/data-master/master-kode-rekening'), 'default'
                        )}`}
                    >
                        <TbSortAscendingNumbers />
                        {show &&
                            <p>
                                Rekening
                            </p>
                        }
                    </Link>
                </div>

                {show &&
                    <p className="flex gap-1 items-center text-slate-500 font-light text-sm italic">
                        <TbCircleFilled size={10} className="text-sky-300" />
                        DATA MASTER OPD
                    </p>
                }
                <div className="pl-2 py-2 flex flex-col gap-2 border-b border-l border-sky-600 rounded-b-lg">
                    <Link
                        href='/data-master-opd/master-pegawai'
                        className={`flex items-center gap-1 font-medium rounded-lg cursor-pointer py-1 px-5 ${getActiveClass(
                            url.startsWith('/data-master-opd/master-pegawai'), 'default'
                        )}`}
                    >
                        <TbUsersGroup />
                        {show &&
                            <p>
                                Pegawai
                            </p>
                        }
                    </Link>
                    <Link
                        href='/data-master-opd/bidang'
                        className={`flex items-center gap-1 font-medium rounded-lg cursor-pointer py-1 px-5 ${getActiveClass(
                            url.startsWith('/data-master-opd/master-bidang-program-kegiatan'), 'default'
                        )}`}
                    >
                        <TbUniverse />
                        {show &&
                            <p className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px]" title="Bidang Urusan, Program, Kegiatan, Sub Kegiatan">
                                Bidang Urusan, Program, Kegiatan, Sub Kegiatan
                            </p>
                        }
                    </Link>
                </div>
            </ul>
            <div className="flex items-center gap-3 mt-5">
                <ButtonRed
                    onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("opd");
                        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
                        document.cookie = 'opd=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
                        window.location.href = "/login";
                    }}
                    className="w-full flex gap-1"
                >
                    <TbLogout />
                    {show &&
                        <p>Logout</p>
                    }
                </ButtonRed>
            </div>
        </div>
    )
} 
