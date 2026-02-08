'use client'

import Link from "next/link";
import { TbDownload, TbBook2, TbCircleFilled } from "react-icons/tb";
import { ButtonSky } from "@/src/components/global/button/Button";
import { useBrandingContext } from "@/src/providers/BrandingProvider";
import { IsLoadingBranding } from "@/src/lib/helper/loading";

const Dashboard = () => {

  const { branding, loadingBranding } = useBrandingContext();

  if (loadingBranding) {
    return (
      <IsLoadingBranding />
    )
  } else {
    return (
      <div className="flex flex-wrap flex-col gap-2 pt-3">
        <div className="p-5 rounded-xl border border-emerald-500">
          <p className="flex items-center gap-1 font-bold">
            <TbCircleFilled color="green" />
            Selamat Datang, di {branding?.nama_app || "halaman dashboard"}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 p-5 rounded-xl border border-sky-500">
          <h1 className="flex items-center gap-2">
            <TbBook2 className="font-bold text-4xl rounded-full p-1 border border-sky-500 text-sky-700" />
            Download Panduan Website (Manual User)
          </h1>
          <Link
            href={"https://drive.google.com/drive/folders/1xFqVRchn8eCRtMLhWvqSb78qDxTXB9Y1?usp=sharing"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ButtonSky className="flex items-center gap-2">
              <TbDownload />
              Download
            </ButtonSky>
          </Link>
        </div>
      </div>
    )
  }
}

export default Dashboard;