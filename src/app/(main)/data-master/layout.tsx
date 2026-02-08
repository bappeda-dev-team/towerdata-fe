"use client";

import { useBrandingContext } from "@/src/providers/BrandingProvider";
import { IsLoadingBranding } from "@/src/lib/helper/loading";

interface PerencanaanAsnLayoutProps {
  children: React.ReactNode;
}

export default function DatamasterLayout({
  children,
}: PerencanaanAsnLayoutProps) {
  const { loadingBranding } = useBrandingContext();

  if (loadingBranding) {
    return <IsLoadingBranding />;
  } else {
    return <>{children}</>;
  }
}
