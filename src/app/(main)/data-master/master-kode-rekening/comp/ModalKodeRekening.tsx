'use client'

import { ModalComponent } from "@/src/components/ui/modalComponent";
import { ModalHeader } from "@/src/components/ui/modalHeader";
import { TbBuildingSkyscraper, TbDeviceFloppy, TbArrowBack } from "react-icons/tb";
import { FloatingLabelInput } from "@/src/components/ui/input";
import { ButtonRed, ButtonSky } from "@/src/components/global/button/Button";
import { LoadingButton } from "@/src/lib/helper/loading";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { GetResponseFindallRekening } from "../type";
import useToast from "@/src/lib/helper/toast/toast";

interface Modal {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    jenis: "tambah" | "edit";
    Data?: GetResponseFindallRekening | null;
}

interface FormValue {
    id: number;
    kodeRekening: string;
    namaRekening: string;
    tahun: string;
}

export const ModalKodeRekening: React.FC<Modal> = ({ isOpen, onClose, onSuccess, jenis, Data }) => {

    const { control, handleSubmit, reset } = useForm<FormValue>({
        defaultValues: {
            kodeRekening: Data?.kodeRekening,
            namaRekening: Data?.namaRekening,
            tahun: "",
        }
    });
    const { toastSuccess } = useToast();
    const proses = false;

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        toastSuccess("Perubahan disimpan (tampilan saja)");
        onSuccess();
        handleClose();
    }

    const handleClose = () => {
        onClose();
        reset();
    }

    return (
        <ModalComponent isOpen={isOpen} onClose={handleClose}>
            <ModalHeader className="border-sky-700 text-sky-700">
                <TbBuildingSkyscraper />
                {jenis} Kode Rekening
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="py-3">
                <Controller
                    name="kodeRekening"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="kodeRekening"
                            label="Kode Rekening"
                        />
                    )}
                />
                <Controller
                    name="namaRekening"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="namaRekening"
                            label="Nama Rekening"
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
                        className="w-full flex items-center gap-1"
                        type="button"
                        onClick={handleClose}
                    >
                        <TbArrowBack />
                        Batal
                    </ButtonRed>
                </div>
            </form>
        </ModalComponent>
    )
}
