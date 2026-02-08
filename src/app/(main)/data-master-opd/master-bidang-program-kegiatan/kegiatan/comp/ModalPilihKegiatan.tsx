'use client'

import { useState } from "react"
import { ModalComponent } from "@/src/components/ui/modalComponent"
import { ModalHeader } from "@/src/components/ui/modalHeader"
import { TbFile, TbDeviceFloppy, TbArrowBack } from "react-icons/tb";
import { ButtonRed, ButtonSky } from "@/src/components/global/button/Button";
import { FloatingLabelSelect } from "@/src/components/ui/input";
import { LoadingButton } from "@/src/lib/helper/loading";
import useToast from "@/src/lib/helper/toast/toast";
import { OptionTypeString } from "@/src/types";

interface Modal {
    nama_opd: string;
    isOpen: boolean;
    onClose: () => void;
    existingKegiatanCodes?: string[];
    onSuccess?: () => void;
}

type KegiatanDropdownOption = OptionTypeString & { namaKegiatan: string };

export const ModalPilihKegiatan: React.FC<Modal> = ({ nama_opd, isOpen, onClose, onSuccess, existingKegiatanCodes }) => {

    const [KegiatanTerpilih, setKegiatanTerpilih] = useState<OptionTypeString[]>([]);
    const [kegiatanOptions] = useState<KegiatanDropdownOption[]>([]);
    const { toastSuccess } = useToast();
    const isKegiatanLoading = false;
    const kegiatanError: string | null = null;
    const isSaving = false;
    const saveError: string | null = null;
    const selectionWarningMessage: string | null = null;
    const isOpdOrTahunMissing = false;
    const isSaveDisabled = KegiatanTerpilih.length === 0 || isSaving;

    const handleSimpan = async () => {
        if (isSaveDisabled) return;
        toastSuccess("Kegiatan berhasil disimpan (tampilan saja)");
        setKegiatanTerpilih([]);
        onSuccess?.();
        onClose();
    };
    
    return (
        <ModalComponent isOpen={isOpen} onClose={onClose}>
            <ModalHeader className="border-sky-700">
                <TbFile className="text-sky-700" />
                <div className="flex flex-wrap items-center gap-1">
                    <p className="text-sky-700">Tambah Kegiatan di</p>
                    <p className="text-yellow-600">{nama_opd}</p>
                </div>
            </ModalHeader>
            <form action="" className="py-3 min-h-[400px]">
                <FloatingLabelSelect
                    id="kegiatan"
                    label="Kegiatan"
                    isMulti
                    isLoading={isKegiatanLoading}
                    disable={isOpdOrTahunMissing}
                    options={kegiatanOptions}
                    value={KegiatanTerpilih}
                    onChange={(selected) => setKegiatanTerpilih((selected as OptionTypeString[]) || [])}
                />
                {selectionWarningMessage && (
                    <p className="text-sm text-yellow-600 mt-1">
                        {selectionWarningMessage}
                    </p>
                )}
                {kegiatanError && (
                    <p className="text-sm text-red-500 mt-2">
                        {kegiatanError}
                    </p>
                )}
                {saveError && (
                    <p className="text-sm text-red-500 mt-2">
                        {saveError}
                    </p>
                )}
                <div className="flex flex-col items-center gap-1">
                    <ButtonSky
                        type="button"
                        className="w-full flex items-center gap-1"
                        onClick={handleSimpan}
                        disabled={isSaveDisabled}
                    >
                        {isSaving ? (
                            <>
                                <LoadingButton color="#fff" />
                                Menyimpan...
                            </>
                        ) : (
                            <>
                                <TbDeviceFloppy />
                                Simpan
                            </>
                        )}
                    </ButtonSky>
                    <ButtonRed 
                        type="button"
                        onClick={onClose}
                        className="w-full flex items-center gap-1"
                    >
                        <TbArrowBack />
                        Batal
                    </ButtonRed>
                </div>
            </form>
        </ModalComponent>
    )
}
