'use client'

import { createContext, useContext } from "react"
import { getCookies } from "../lib/helper/cookies";
import { useState, useEffect } from "react";
import { OptionType, OptionTypeString } from "../types";

interface BrandingContextType {
    loadingBranding: boolean;
    branding: {
        nama_app: string;
        nama_pemda: string;
        logo: string;
        api_url: string;
        tahun: OptionType | null | undefined;
        opd: OptionTypeString | null | undefined;
        jenis_tahun: OptionTypeString | null | undefined;
        user: any;
    }
}

const appName = process.env.NEXT_PUBLIC_NAMA_APLIKASI || "";
const clientName = process.env.NEXT_PUBLIC_NAMA_PEMDA || "";
const logo = process.env.NEXT_PUBLIC_LOGO_URL || "";
const api_url = process.env.NEXT_PUBLIC_API_URL || "";

// context
const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

export function BrandingProvider({ children }: Readonly<{ children: React.ReactNode; }>) {

    const [Tahun, setTahun] = useState<OptionType | null>(null);
    const [SelectedOpd, setSelectedOpd] = useState<OptionTypeString | null>(null);
    const [JenisTahun, setJenisTahun] = useState<OptionTypeString | null>(null);
    const [User, setUser] = useState<any>(null);

    const [Loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const get_tahun = getCookies("tahun");
        const get_opd = getCookies("opd");
        const get_jenis_tahun = getCookies("jenis_tahun");
            if (get_tahun) {
                const tahun = JSON.parse(get_tahun);
                if(tahun === null || tahun === undefined){
                    setTahun(null);
                } else {
                    const valueTahun = {
                        value: tahun.value,
                        label: tahun.label
                    }
                    setTahun(valueTahun);
                }
            }
            if (get_opd) {
                const opd = JSON.parse(get_opd);
                if(opd === null || opd === undefined){
                    setSelectedOpd(null);
                } else {
                    const valueOpd = {
                        value: opd.value || null,
                        label: opd.label || null
                    }
                    setSelectedOpd(valueOpd);
                }
            }
            if (get_opd) {
                const jenis = JSON.parse(get_opd);
                if(jenis === null || jenis === undefined){
                    setSelectedOpd(null);
                } else {
                    const valueJenis = {
                        value: jenis.value || null,
                        label: jenis.label || null
                    }
                    setJenisTahun(valueJenis);
                }
            }
        setLoading(false);
    }, []);

    return (
        <BrandingContext.Provider
            value={{
                loadingBranding: Loading,
                branding: {
                    nama_app: appName,
                    nama_pemda: clientName,
                    logo: logo,
                    api_url: api_url,
                    tahun: Tahun,
                    opd: SelectedOpd,
                    jenis_tahun: JenisTahun,
                    user: User
                }
            }}
        >
            {children}
        </BrandingContext.Provider>
    );
}

export function useBrandingContext() {
    const context = useContext(BrandingContext);
    if (context === undefined) {
        throw new Error("useBrandingContext must be used witihin a BrandingProvider")
    }
    return context;
}
