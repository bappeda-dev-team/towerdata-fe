'use client'

import NextTopLoader from "nextjs-toploader";
import { Header } from "./comp/Header";

interface MasterProgramKegiatanOpdLayoutProps {
    children: React.ReactNode;
}

export default function DatamasterProgramKegiatanOpdLayout({
    children
}: MasterProgramKegiatanOpdLayoutProps) {
    return (
        <>
            <Header />
            {children}
            <NextTopLoader />
        </>
    )
}
