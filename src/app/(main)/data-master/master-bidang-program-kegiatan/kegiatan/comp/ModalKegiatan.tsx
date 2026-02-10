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
import { GetResponseKegiatan } from "../../type";
import { useBrandingContext } from "@/src/providers/BrandingProvider";

interface Modal {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    jenis: "tambah" | "edit";
    Data: GetResponseKegiatan | null;
}
interface FormValue {
    kodeKegiatan: string;
    namaKegiatan: string;
}

const defaultValues: FormValue = {
    kodeKegiatan: "",
    namaKegiatan: "",
};

export const ModalKegiatan: React.FC<Modal> = ({ Data, isOpen, onClose, onSuccess, jenis }) => {

    const { toastSuccess, toastError } = useToast();
    const { branding } = useBrandingContext();
    const apiUrl = branding?.api_url || "";
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { control, handleSubmit, reset } = useForm<FormValue>({
        defaultValues: Data
            ? {
                kodeKegiatan: Data.kodeKegiatan,
                namaKegiatan: Data.namaKegiatan,
            }
            : defaultValues,
    });

    useEffect(() => {
        if (Data) {
            reset({
                kodeKegiatan: Data.kodeKegiatan,
                namaKegiatan: Data.namaKegiatan,
            });
        } else {
            reset(defaultValues);
        }
    }, [Data, reset]);

    const onSubmit: SubmitHandler<FormValue> = async (formValues) => {
        if (!apiUrl) {
            toastError("URL API belum tersedia.");
            return;
        }

        const isEdit = jenis === "edit";
        let endpoint = `${apiUrl}/kegiatan`;
        let method: "POST" | "PUT" = "POST";

        if (isEdit) {
            const identifier = Data?.kodeKegiatan;
            if (!identifier) {
                toastError("Data kegiatan tidak tersedia untuk diubah.");
                return;
            }
            endpoint = `${apiUrl}/kegiatan/update/${identifier}`;
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
                    kodeKegiatan: formValues.kodeKegiatan,
                    namaKegiatan: formValues.namaKegiatan,
                }),
            });

            if (!response.ok) {
                const errorBody = await response.json().catch(() => null);
                throw new Error(errorBody?.message || "Gagal menyimpan data kegiatan.");
            }

            await response.json() as GetResponseKegiatan;
            toastSuccess(isEdit ? "Kegiatan berhasil diperbarui." : "Kegiatan berhasil ditambahkan.");
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
                {jenis} Kegiatan
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="py-3">
                <Controller
                    name="kodeKegiatan"
                    control={control}
                    rules={{ required: "Kode Kegiatan wajib diisi" }}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="kodeKegiatan"
                            label="Kode Kegiatan"
                        />
                    )}
                />
                <Controller
                    name="namaKegiatan"
                    control={control}
                    rules={{ required: "Kegiatan wajib diisi" }}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="namaKegiatan"
                            label="Kegiatan"
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
