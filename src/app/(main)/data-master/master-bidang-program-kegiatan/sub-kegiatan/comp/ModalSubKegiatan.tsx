'use client'

import { useEffect, useState } from "react";
import { ModalComponent } from "@/src/components/ui/modalComponent";
import { ModalHeader } from "@/src/components/ui/modalHeader";
import { TbBuildingSkyscraper, TbDeviceFloppy, TbArrowBack } from "react-icons/tb";
import { FloatingLabelInput } from "@/src/components/ui/input";
import { ButtonRed, ButtonSky } from "@/src/components/global/button/Button";
import { LoadingButton } from "@/src/lib/helper/loading";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import useToast from "@/src/lib/helper/toast/toast";
import { GetResponseSubKegiatan } from "../../type";
import { useBrandingContext } from "@/src/providers/BrandingProvider";

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

const defaultValues: FormValue = {
    kodeSubKegiatan: "",
    namaSubKegiatan: "",
};

export const ModalSubKegiatan: React.FC<Modal> = ({ Data, isOpen, onClose, onSuccess, jenis }) => {

    const { toastSuccess, toastError } = useToast();
    const { branding } = useBrandingContext();
    const apiUrl = branding?.api_url || "";
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { control, handleSubmit, reset } = useForm<FormValue>({
        defaultValues: Data
            ? {
                kodeSubKegiatan: Data.kodeSubKegiatan,
                namaSubKegiatan: Data.namaSubKegiatan,
            }
            : defaultValues,
    });

    useEffect(() => {
        if (!isOpen) return;

        if (Data) {
            reset({
                kodeSubKegiatan: Data.kodeSubKegiatan,
                namaSubKegiatan: Data.namaSubKegiatan,
            });
        } else {
            reset(defaultValues);
        }
    }, [Data, reset, isOpen]);

    const onSubmit: SubmitHandler<FormValue> = async (formValues) => {
        if (!apiUrl) {
            toastError("URL API belum tersedia.");
            return;
        }

        const isEdit = jenis === "edit";
        let endpoint = `${apiUrl}/subkegiatan`;
        let method: "POST" | "PUT" = "POST";

        if (isEdit) {
            const identifier = Data?.kodeSubKegiatan;
            if (!identifier) {
                toastError("Data sub kegiatan tidak tersedia untuk diubah.");
                return;
            }
            endpoint = `${apiUrl}/subkegiatan/update/${identifier}`;
            method = "PUT";
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    kodeSubKegiatan: formValues.kodeSubKegiatan,
                    namaSubKegiatan: formValues.namaSubKegiatan,
                }),
            });

            if (!response.ok) {
                const errorBody = await response.json().catch(() => null);
                throw new Error(errorBody?.message || "Gagal menyimpan sub kegiatan.");
            }

            await response.json();
            toastSuccess(isEdit ? "Sub kegiatan berhasil diperbarui." : "Sub kegiatan berhasil ditambahkan.");
            onSuccess();
            handleClose();
        } catch (error) {
            toastError(error instanceof Error ? error.message : "Terjadi kesalahan.");
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleClose = () => {
        reset(defaultValues);
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
