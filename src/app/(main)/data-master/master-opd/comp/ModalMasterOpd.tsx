'use client'

import { ModalComponent } from "@/src/components/ui/modalComponent";
import { ModalHeader } from "@/src/components/ui/modalHeader";
import { TbBuildingSkyscraper, TbDeviceFloppy, TbArrowBack } from "react-icons/tb";
import { FloatingLabelInput } from "@/src/components/ui/input";
import { ButtonRed, ButtonSky } from "@/src/components/global/button/Button";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { LoadingButton } from "@/src/lib/helper/loading";
import useToast from "@/src/lib/helper/toast/toast";
import { OpdFindallResponse, BidangUrusan } from "../master-opd";

interface Modal {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    jenis: "tambah" | "edit";
    Data?: OpdFindallResponse | null;
}
interface FormValue {
    kodeOpd: string;
    namaOpd: string;
    bidangUrusan: BidangUrusan[];
}

export const ModalMasterOpd: React.FC<Modal> = ({ isOpen, onClose, onSuccess, jenis, Data }) => {

    const { toastSuccess } = useToast();
    const Proses = false;

    const { control, handleSubmit, reset } = useForm<FormValue>({
        defaultValues: {
            kodeOpd: Data?.kodeOpd,
            namaOpd: Data?.namaOpd,
            bidangUrusan: Data?.bidangUrusan,
        }
    });

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        toastSuccess("Perubahan disimpan (tampilan saja)");
        onSuccess();
        onClose();
    }

    return (
        <ModalComponent isOpen={isOpen} onClose={onClose}>
            <ModalHeader className="border-sky-700 text-sky-700">
                <TbBuildingSkyscraper />
                {jenis} OPD
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="py-3">
                <Controller
                    name="namaOpd"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="namaOpd"
                            label="Nama OPD"
                        />
                    )}
                />
                <Controller
                    name="kodeOpd"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="kodeOpd"
                            label="Kode OPD"
                        />
                    )}
                />
                <div className="flex flex-col items-center gap-1">
                    <ButtonSky
                        type="submit"
                        className="w-full flex items-center gap-1"
                        disabled={Proses}
                    >
                        {Proses ?
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
                        onClick={onClose}
                    >
                        <TbArrowBack />
                        Batal
                    </ButtonRed>
                </div>
            </form>
        </ModalComponent>
    )
}
