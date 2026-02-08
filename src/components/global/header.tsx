'use client'

import { useState, useEffect } from "react";
import { ButtonBlackBorder } from "./button/Button";
import { TbUser } from "react-icons/tb";
import Select from 'react-select';
import { OptionType, OptionTypeString } from "@/src/types";
import { useBrandingContext } from "@/src/providers/BrandingProvider";
import { setCookies } from "@/src/lib/helper/cookies";
import { AlertNotification } from "@/src/lib/helper/sweetalert2";
import { useHook } from "@/src/hooks/useHook";
import { GetResponseFindallOpd } from "@/src/types";

interface Header {
  show: boolean;
}

export const Header: React.FC<Header> = ({ show }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);

  const [Tahun, setTahun] = useState<OptionType | null>(null);
  const [SelectedOpd, setSelectedOpd] = useState<OptionTypeString | null>(null);
  const [OptionOpd, setOptionOpd] = useState<OptionTypeString[]>([]);
  const [JenisTahun, setJenisTahun] = useState<OptionTypeString | null>(null);

  const [showManriskKinerjaDropdown, setShowManriskKinerjaDropdown] = useState<boolean>(false);
  const { branding, loadingBranding } = useBrandingContext();

  const { data: DataOpd, loading: LoadingOpd, error: ErrorOpd, refetch } = useHook<GetResponseFindallOpd[]>(`${branding?.api_url}/opd/detail/findall`);

  useEffect(() => {
    if (branding?.tahun) {
      setTahun(branding?.tahun);
    }
    if (branding?.opd) {
      if (branding?.opd.value === null || branding?.opd.value === undefined) {
        setSelectedOpd(null);
      } else {
        setSelectedOpd(branding?.opd);
      }
    }
    if(DataOpd){
      const opd = DataOpd.map((item: GetResponseFindallOpd) => ({
        value: item.kodeOpd,
        label: item.namaOpd,
      }));
      setOptionOpd(opd);
    }
  }, [branding, DataOpd])

  //handle header scroll animation 
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible = prevScrollPos > currentScrollPos;

      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
      setShowManriskKinerjaDropdown(false);
    };
    window.addEventListener('scroll', handleScroll);

    // Close mobile menu when URL changes
    setIsMobileMenuOpen(false);

    // Clean up the event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setShowManriskKinerjaDropdown(false);
  };

  const OptionTahun = [
    { label: "Tahun 2019", value: 2019 },
    { label: "Tahun 2020", value: 2020 },
    { label: "Tahun 2021", value: 2021 },
    { label: "Tahun 2022", value: 2022 },
    { label: "Tahun 2023", value: 2023 },
    { label: "Tahun 2024", value: 2024 },
    { label: "Tahun 2025", value: 2025 },
    { label: "Tahun 2026", value: 2026 },
    { label: "Tahun 2027", value: 2027 },
    { label: "Tahun 2028", value: 2028 },
    { label: "Tahun 2029", value: 2029 },
    { label: "Tahun 2030", value: 2030 },
  ];
  const OptionJenisTahun = [
    { label: "Perubahan 1", value: "Perubahan 1" },
    { label: "Perubahan 2", value: "Perubahan 2" },
  ];

  // const OptionOpd = [
  //   { label: "Bappeda", value: "Bappeda" },
  //   { label: "Kominfo", value: "Kominfo" },
  //   { label: "Dinsos", value: "Dinsos" },
  //   { label: "Disperkim", value: "Disperkim" },
  // ]

  return (
    <nav className={`inset-x-1 m-1 ${show ? "ml-[265px]" : "ml-23"} bg-white border border-sky-200 shadow-lg shadow-slate-400 rounded-xl fixed left-0 top-0 z-50 transition duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="mx-auto flex justify-between gap-5 items-center px-4 py-3">

        <div className="w-full flex flex-wrap items-center justify-between gap-5">
          <h1 className="text-sm font-semibold">Myko Akbar</h1>
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-2">
              <Select
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    borderRadius: '10px',
                    minWidth: '157.562px',
                    maxWidth: '160px',
                    minHeight: '20px'
                  })
                }}
                onChange={(option) => setSelectedOpd(option)}
                placeholder={`${loadingBranding ? "loading..." : "Pilih OPD"}`}
                options={OptionOpd}
                isLoading={LoadingOpd}
                value={SelectedOpd}
                isSearchable
              />
              <Select
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    borderRadius: '10px',
                    minWidth: '157.562px',
                    maxWidth: '160px',
                    minHeight: '20px'
                  })
                }}
                onChange={(option) => setTahun(option)}
                placeholder={`${loadingBranding ? "loading..." : "Pilih Tahun"}`}
                options={OptionTahun}
                value={Tahun}
                isSearchable
              />
              <Select
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    borderRadius: '10px',
                    minWidth: '157.562px',
                    maxWidth: '160px',
                    minHeight: '20px'
                  })
                }}
                onChange={(option) => setJenisTahun(option)}
                placeholder={`${loadingBranding ? "loading..." : "Jenis Tahun"}`}
                options={OptionJenisTahun}
                value={JenisTahun}
                isSearchable
              />
              <button
                className="border py-1 px-3 rounded-lg border-sky-500 text-sky-600 hover:bg-sky-600 hover:text-white cursor-pointer"
                disabled={loadingBranding}
                onClick={() => {
                  setCookies("tahun", Tahun);
                  setCookies("opd", SelectedOpd);
                  setCookies("jenis_tahun", JenisTahun);
                  AlertNotification("Tahun & OPD", "Berhasil mengubah Tahun & OPD", "success", 2000, true);
                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                }}
              >
                Aktifkan
              </button>
              <ButtonBlackBorder className="flex items-center gap-1">
                <TbUser />
                {loadingBranding ?
                  <span>Loading...</span>
                  :
                  <span>Level User</span>
                }
              </ButtonBlackBorder>
            </div>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className={`focus:outline-none cursor-pointer rounded-lg p-1 border border-sky-500 text-sky-500 hover:text-sky-500 hover:bg-white`}
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div className={`lg:hidden rounded-lg border border-gray-300 bg-white py-2 mt-1 absolute top-full left-0 w-full shadow-md transition ease-in-out duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Select
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderRadius: '10px',
                minWidth: '157.562px',
                maxWidth: '160px',
                minHeight: '20px'
              })
            }}
            onChange={(option) => setSelectedOpd(option)}
            placeholder={`${loadingBranding ? "loading..." : "Pilih OPD"}`}
            options={OptionOpd}
            value={SelectedOpd}
            isSearchable
          />
          <Select
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderRadius: '10px',
                minWidth: '157.562px',
                maxWidth: '160px',
                minHeight: '20px'
              })
            }}
            onChange={(option) => setTahun(option)}
            placeholder={`${loadingBranding ? "loading..." : "Pilih Tahun"}`}
            options={OptionTahun}
            value={Tahun}
            isSearchable
          />
          <Select
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderRadius: '10px',
                minWidth: '157.562px',
                maxWidth: '160px',
                minHeight: '20px'
              })
            }}
            onChange={(option) => setJenisTahun(option)}
            placeholder={`${loadingBranding ? "loading..." : "Jenis Tahun"}`}
            options={OptionJenisTahun}
            value={JenisTahun}
            isSearchable
          />
          <button
            className="border py-1 px-3 rounded-lg border-sky-500 text-sky-600 hover:bg-sky-600 hover:text-white cursor-pointer"
            disabled={loadingBranding}
            onClick={() => {
              setCookies("tahun", Tahun);
              setCookies("opd", SelectedOpd);
              setCookies("jenis_tahun", JenisTahun);
              AlertNotification("Tahun & OPD", "Berhasil mengubah Tahun & OPD", "success", 2000, true);
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }}
          >
            Aktifkan
          </button>
        </div>
      </div>
    </nav>
  );
};
