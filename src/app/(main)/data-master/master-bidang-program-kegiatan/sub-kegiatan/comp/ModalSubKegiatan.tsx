'use client'

import { ModalComponent } from "@/src/components/ui/modalComponent";
import { ModalHeader } from "@/src/components/ui/modalHeader";
import { TbBuildingSkyscraper, TbDeviceFloppy, TbArrowBack } from "react-icons/tb";
import { FloatingLabelInput } from "@/src/components/ui/input";
import { ButtonRed, ButtonSky } from "@/src/components/global/button/Button";
import { LoadingButton } from "@/src/lib/helper/loading";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import useToast from "@/src/lib/helper/toast/toast";
import { GetResponseSubKegiatan } from "../../type";

interface Modal {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    jenis: "tambah" | "edit";
    Data: GetResponseSubKegiatan | null;
}
interface FormValue {
    kodeSubKegiatan: string;
    namaSubKegiatan: string;
}

export const ModalSubKegiatan: React.FC<Modal> = ({ Data, isOpen, onClose, onSuccess, jenis }) => {

    const { toastSuccess } = useToast();

    const { control, handleSubmit, reset } = useForm<FormValue>({
        defaultValues: {
            kodeSubKegiatan: Data?.kodeSubKegiatan,
            namaSubKegiatan: Data?.namaSubKegiatan,
        }
    });
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
            <ModalHeader className="border-sky-700 text-sky-700">
                <TbBuildingSkyscraper />
                {jenis} Sub Kegiatan
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="py-3">
                <Controller
                    name="kodeSubKegiatan"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="kodeSubKegiatan"
                            label="Kode Sub Kegiatan"
                        />
                    )}
                />
                <Controller
                    name="namaSubKegiatan"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="namaSubKegiatan"
                            label="Sub Kegiatan"
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
