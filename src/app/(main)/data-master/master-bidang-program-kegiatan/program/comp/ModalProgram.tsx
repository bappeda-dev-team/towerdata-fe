'use client'

import React from "react";
import { ModalComponent } from "@/src/components/ui/modalComponent";
import { ModalHeader } from "@/src/components/ui/modalHeader";
import { TbBuildingSkyscraper, TbDeviceFloppy, TbArrowBack } from "react-icons/tb";
import { FloatingLabelInput } from "@/src/components/ui/input";
import { ButtonRed, ButtonSky } from "@/src/components/global/button/Button";
import { LoadingButton } from "@/src/lib/helper/loading";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import useToast from "@/src/lib/helper/toast/toast";
import { GetResponseProgram } from "../../type";

interface Modal {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    jenis: "tambah" | "edit";
    Data: GetResponseProgram | null;
}
interface FormValue {
    kodeProgram: string;
    namaProgram: string;
}

export const ModalProgram: React.FC<Modal> = ({ Data, isOpen, onClose, onSuccess, jenis }) => {

    const { toastSuccess } = useToast();

    const { control, handleSubmit, reset } = useForm<FormValue>({
        defaultValues: {
            kodeProgram: Data?.kodeProgram,
            namaProgram: Data?.namaProgram,
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
                {jenis} Program
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="py-3">
                <Controller
                    name="kodeProgram"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="kodeProgram"
                            label="Kode Program"
                        />
                    )}
                />
                <Controller
                    name="namaProgram"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="namaProgram"
                            label="Program"
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
