'use client'

import { useEffect, useState } from "react";
import { ModalComponent } from "@/src/components/ui/modalComponent";
import { ModalHeader } from "@/src/components/ui/modalHeader";
import { TbBuildingSkyscraper, TbDeviceFloppy, TbArrowBack } from "react-icons/tb";
import { FloatingLabelInput } from "@/src/components/ui/input";
import { ButtonRed, ButtonSky } from "@/src/components/global/button/Button";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { LoadingButton } from "@/src/lib/helper/loading";
import useToast from "@/src/lib/helper/toast/toast";
import { useBrandingContext } from "@/src/providers/BrandingProvider";
import { OpdFindallResponse } from "../type";

interface Modal {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    jenis?: "tambah" | "edit";
    Data?: OpdFindallResponse | null;
}

interface FormValue {
    kodeOpd: string;
    namaOpd: string;
}

const defaultValues: FormValue = {
    kodeOpd: "",
    namaOpd: ""
};

export const ModalMasterOpd: React.FC<Modal> = ({
    isOpen,
    onClose,
    onSuccess,
    jenis = "tambah",
    Data = null
}) => {

    const { toastSuccess, toastError } = useToast();
    const { branding } = useBrandingContext();
    const apiUrl = branding?.api_url || "";
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { control, handleSubmit, reset } = useForm<FormValue>({
        defaultValues
    });

    useEffect(() => {
        if (jenis === "edit" && Data) {
            reset({
                kodeOpd: Data.kodeOpd || "",
                namaOpd: Data.namaOpd || ""
            });
        } else {
            reset(defaultValues);
        }
    }, [Data, jenis, isOpen, reset]);

    const onSubmit: SubmitHandler<FormValue> = async (formValues) => {
        if (!apiUrl) {
            toastError("URL API belum tersedia.");
            return;
        }

        if (jenis === "edit" && !Data?.kodeOpd) {
            toastError("Data OPD tidak ditemukan.");
            return;
        }

        try {
            setIsSubmitting(true);
            const endpoint = jenis === "edit"
                ? `${apiUrl}/opd/update/${Data?.kodeOpd ?? formValues.kodeOpd}`
                : `${apiUrl}/opd`;
            const response = await fetch(endpoint, {
                method: jenis === "edit" ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formValues)
            });

            if (!response.ok) {
                const errorBody = await response.json().catch(() => null);
                const message = errorBody?.message || "Gagal menyimpan data OPD.";
                throw new Error(message);
            }

            await response.json();
            toastSuccess(
                jenis === "edit"
                    ? "Data OPD berhasil diperbarui."
                    : "Data OPD berhasil disimpan."
            );
            onSuccess();
            onClose();
            reset(defaultValues);
        } catch (error) {
            toastError(error instanceof Error ? error.message : "Terjadi kesalahan.");
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleCancel = () => {
        onClose();
        reset(defaultValues);
    }

    return (
        <ModalComponent isOpen={isOpen} onClose={onClose}>
            <ModalHeader className="border-sky-700 text-sky-700">
                <TbBuildingSkyscraper />
                {jenis === "edit" ? "Edit" : "Tambah"} OPD
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="py-3">
                <Controller
                    name="namaOpd"
                    control={control}
                    rules={{ required: "Nama OPD wajib diisi" }}
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
                    rules={{ required: "Kode OPD wajib diisi" }}
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
                        disabled={isSubmitting}
                    >
                        {isSubmitting ?
                            <>
                                <LoadingButton color="" />
                                {jenis === "edit" ? "memperbarui..." : "menyimpan..."}
                            </>
                            :
                            <>
                                <TbDeviceFloppy />
                                {jenis === "edit" ? "Perbarui" : "Simpan"}
                            </>
                        }
                    </ButtonSky>
                    <ButtonRed
                        className="w-full flex items-center gap-1"
                        type="button"
                        onClick={handleCancel}
                    >
                        <TbArrowBack />
                        Batal
                    </ButtonRed>
                </div>
            </form>
        </ModalComponent>
    )
}
