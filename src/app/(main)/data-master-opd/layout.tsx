'use client'

import { useBrandingContext } from "@/src/providers/BrandingProvider";
import { OpdNull } from "@/src/components/ui/OpdTahunNull";

interface PerencanaanAsnLayoutProps {
    children: React.ReactNode;
}

export default function DatamasterOpdLayout({
    children
}: PerencanaanAsnLayoutProps) {

    const { branding } = useBrandingContext();

    if (branding?.opd?.value === undefined) {
        return (
            <div className="pt-3">
                <OpdNull />
            </div>
        )
    } else {
        return (
            <>{children}</>
        )
    }
}