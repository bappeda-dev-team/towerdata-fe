'use client'

import { useEffect, useState } from "react";
import { ModalComponent } from "@/src/components/ui/modalComponent";
import { ModalHeader } from "@/src/components/ui/modalHeader";
import { TbMap, TbDeviceFloppy, TbArrowBack } from "react-icons/tb";
import { FloatingLabelInput } from "@/src/components/ui/input";
import { ButtonSky, ButtonRed } from "@/src/components/global/button/Button";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { LoadingButton } from "@/src/lib/helper/loading";
import useToast from "@/src/lib/helper/toast/toast";
import { PemdaPayload } from "../type";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    jenis?: "tambah" | "edit";
    apiUrl?: string;
    initialData?: PemdaPayload | null;
}

type FormValue = PemdaPayload;

const defaultValues: FormValue = {
    namaPemda: "",
    kodePemda: ""
};

export const ModalMasterPemda: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    jenis = "tambah",
    apiUrl,
    initialData
}) => {
    const { toastSuccess, toastError } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { control, handleSubmit, reset } = useForm<FormValue>({
        defaultValues
    });

    useEffect(() => {
        if (jenis === "edit" && initialData) {
            reset(initialData);
        } else {
            reset(defaultValues);
        }
    }, [jenis, initialData, reset]);

    const onSubmit: SubmitHandler<FormValue> = async (formValues) => {
        if (!apiUrl) {
            toastError("URL API belum tersedia.");
            return;
        }

        try {
            setIsSubmitting(true);
            const endpoint =
                jenis === "edit"
                    ? `${apiUrl}/pemda/update/${initialData?.kodePemda ?? formValues.kodePemda}`
                    : `${apiUrl}/pemda`;
            const method = jenis === "edit" ? "PUT" : "POST";
            if (jenis === "edit" && !initialData) {
                throw new Error("Data PEMDA tidak ditemukan.");
            }

            const response = await fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formValues)
            });

            if (!response.ok) {
                const errorBody = await response.json().catch(() => null);
                const message = errorBody?.message || "Gagal menyimpan data.";
                throw new Error(message);
            }

            await response.json();
            toastSuccess(
                jenis === "edit"
                    ? "Data PEMDA berhasil diperbarui."
                    : "Data PEMDA berhasil disimpan."
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

    return (
        <ModalComponent isOpen={isOpen} onClose={onClose}>
            <ModalHeader className="border-emerald-700 text-emerald-700">
                <TbMap />
                {jenis === "tambah" ? "Tambah" : "Edit"} PEMDA
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 py-3">
                <Controller
                    name="namaPemda"
                    control={control}
                    rules={{ required: "Nama PEMDA wajib diisi" }}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="namaPemda"
                            label="Nama PEMDA"
                        />
                    )}
                />
                <Controller
                    name="kodePemda"
                    control={control}
                    rules={{ required: "Kode PEMDA wajib diisi" }}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="kodePemda"
                            label="Kode PEMDA"
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
                        onClick={() => {
                            onClose();
                            reset();
                        }}
                    >
                        <TbArrowBack />
                        Batal
                    </ButtonRed>
                </div>
            </form>
        </ModalComponent>
    );
};
