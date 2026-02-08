"use client"

import { useState } from "react"
import { ModalComponent } from "@/src/components/ui/modalComponent"
import { ModalHeader } from "@/src/components/ui/modalHeader"
import { TbFile, TbDeviceFloppy, TbArrowBack } from "react-icons/tb";
import { ButtonRed, ButtonSky } from "@/src/components/global/button/Button";
import { FloatingLabelSelect } from "@/src/components/ui/input";
import { LoadingButton } from "@/src/lib/helper/loading";
import { OpdFindallResponse } from "@/src/app/(main)/data-master/master-opd/master-opd";
import useToast from "@/src/lib/helper/toast/toast";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { OptionTypeString } from "@/src/types";
import { GetResponseFindallBidangUrusan } from "@/src/app/(main)/data-master/master-opd/master-opd";

interface Modal {
    dataModal: OpdFindallResponse | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}
interface FormValue {
    namaOpd: string;
    kodeOpd: string;
    bidangUrusan: GetResponseFindallBidangUrusan[];
}

export const ModalBidangUrusan: React.FC<Modal> = ({ dataModal, isOpen, onClose, onSuccess }) => {

    const [BidangUrusanDropdown] = useState<OptionTypeString[]>([]);
    const { toastSuccess } = useToast();

    const { control, handleSubmit, reset } = useForm<FormValue>({
        defaultValues: {
            namaOpd: dataModal?.namaOpd,
            kodeOpd: dataModal?.kodeOpd,
            bidangUrusan: dataModal?.bidangUrusan.map((item: GetResponseFindallBidangUrusan) => ({
                value: item.id,
                label: item.namaBidangUrusan,
                id : item.id,
                namaBidangUrusan: item.namaBidangUrusan,
                kodeBidangUrusan: item.kodeBidangUrusan,
            })) || []
        }
    });

    const loading = false;
    const ErrorDropdown = false;
    const proses = false;

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        toastSuccess("Perubahan disimpan (tampilan saja)");
        onSuccess();
        onClose();
    }

    const handleClose = () => {
        reset();
        onClose();
    }

    return (
        <ModalComponent isOpen={isOpen} onClose={handleClose}>
            <ModalHeader className="border-sky-700">
                <TbFile className="text-sky-700" />
                <div className="flex flex-wrap items-center gap-1">
                    <p className="text-sky-700">Tambah Bidang Urusan di</p>
                    <p className="text-yellow-600">{dataModal?.namaOpd || ""}</p>
                </div>
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="py-3 min-h-[400px]">
                <Controller
                    name="bidangUrusan"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelSelect
                            {...field}
                            id="bidangUrusan"
                            label="Bidang Urusan"
                            isLoading={loading}
                            isMulti
                            options={BidangUrusanDropdown}
                        />
                    )}
                />
                <div className="flex flex-col items-center gap-1">
                    <ButtonSky
                        type="submit"
                        className="w-full flex items-center gap-1"
                        disabled={proses}
                    >
                        {proses ?
                            <>
                                <LoadingButton color="" />
                                menyimpan...
                            </>
                            :
                            <>
                                <TbDeviceFloppy />
                                Simpan
                            </>
                        }
                    </ButtonSky>
                    <ButtonRed
                        type="button"
                        onClick={handleClose}
                        className="w-full flex items-center gap-1"
                    >
                        <TbArrowBack />
                        Batal
                    </ButtonRed>
                    {ErrorDropdown &&
                        <h1 className="italic text-red-400">gagal mendapatkan data dropdown bidang urusan opd {dataModal?.namaOpd || "ini"}</h1>
                    }
                </div>
            </form>
        </ModalComponent>
    )
}
