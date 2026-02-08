"use client";

import NextTopLoader from "nextjs-toploader";
import { Header } from "./comp/Header";

interface MasterProgramKegiatanLayoutProps {
  children: React.ReactNode;
}

export default function DatamasterProgramKegiatanLayout({
  children,
}: MasterProgramKegiatanLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <NextTopLoader />
    </>
  );
}
