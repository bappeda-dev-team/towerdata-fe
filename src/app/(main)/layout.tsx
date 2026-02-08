'use client'

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Sidebar } from "@/src/components/global/sidebar";
import { Header } from "@/src/components/global/header";
import { BrandingProvider } from "@/src/providers/BrandingProvider";
import ToastProvider from "@/src/lib/helper/toast/toastProvider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const url = usePathname();
    const loginpage = url === '/login'

    const [Show, setShow] = useState<boolean>(true);

    return (
        <div>
            <BrandingProvider>
                <div className="flex max-w-full overflow-hidden">
                    {!loginpage &&
                        <Sidebar
                            onShow={() => setShow((prev) => !prev)}
                            show={Show}
                        />
                    }
                    <div className={`${loginpage ? "" : Show ? "pl-[265px]" : "pl-23"} flex-1 h-full overflow-y-auto`}>
                        {!loginpage && <Header show={Show} />}
                        <div className={`${loginpage ? "" : "mt-19"} rounded-lg px-2`}>
                            {children}
                        </div>
                    </div>
                </div>
                <ToastProvider />
            </BrandingProvider>
        </div>
    );
}
