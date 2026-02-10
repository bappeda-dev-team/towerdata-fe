'use client'

import React, { useEffect, useState } from "react";
import { ModalComponent } from "@/src/components/ui/modalComponent";
import { ModalHeader } from "@/src/components/ui/modalHeader";
import { TbBuildingSkyscraper, TbDeviceFloppy, TbArrowBack } from "react-icons/tb";
import { FloatingLabelInput } from "@/src/components/ui/input";
import { ButtonRed, ButtonSky } from "@/src/components/global/button/Button";
import { LoadingButton } from "@/src/lib/helper/loading";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import useToast from "@/src/lib/helper/toast/toast";
import { GetResponseProgram } from "../../type";
import { useBrandingContext } from "@/src/providers/BrandingProvider";

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

const defaultValues: FormValue = {
    kodeProgram: "",
    namaProgram: "",
};

export const ModalProgram: React.FC<Modal> = ({ Data, isOpen, onClose, onSuccess, jenis }) => {

    const { toastSuccess, toastError } = useToast();
    const { branding } = useBrandingContext();
    const apiUrl = branding?.api_url || "";
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { control, handleSubmit, reset } = useForm<FormValue>({
        defaultValues,
    });

    useEffect(() => {
        if (jenis === "edit" && Data) {
            reset({
                kodeProgram: Data.kodeProgram,
                namaProgram: Data.namaProgram,
            });
        } else {
            reset(defaultValues);
        }
    }, [Data, jenis, reset]);

    const handleClose = () => {
        reset(defaultValues);
        onClose();
    };

    const onSubmit: SubmitHandler<FormValue> = async (formValues) => {
        if (!apiUrl) {
            toastError("URL API belum tersedia.");
            return;
        }

        setIsSubmitting(true);
        try {
            if (jenis === "edit" && !Data) {
                throw new Error("Data program tidak tersedia untuk diubah.");
            }

            const identifier = jenis === "edit"
                ? Data?.kodeProgram
                : undefined;

            if (jenis === "edit" && !identifier) {
                throw new Error("Tidak dapat menentukan pengenal program.");
            }

            const endpoint =
                jenis === "edit"
                    ? `${apiUrl}/program/update/${identifier}`
                    : `${apiUrl}/program`;
            const method = jenis === "edit" ? "PUT" : "POST";

            const response = await fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValues),
            });

            if (!response.ok) {
                const errorBody = await response.json().catch(() => null);
                const message = errorBody?.message || "Gagal menyimpan data.";
                throw new Error(message);
            }

            await response.json() as GetResponseProgram;
            toastSuccess(
                jenis === "edit" ? "Program berhasil diperbarui." : "Program berhasil disimpan."
            );
            onSuccess();
            handleClose();
        } catch (error) {
            toastError(error instanceof Error ? error.message : "Terjadi kesalahan.");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    rules={{ required: "Kode Program wajib diisi" }}
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
                    rules={{ required: "Program wajib diisi" }}
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
                        disabled={isSubmitting}
                    >
                        {isSubmitting ?
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
