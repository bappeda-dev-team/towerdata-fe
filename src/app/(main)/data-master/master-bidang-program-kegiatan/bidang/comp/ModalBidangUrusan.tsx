'use client'

import { useEffect, useState } from "react"
import { ModalComponent } from "@/src/components/ui/modalComponent"
import { ModalHeader } from "@/src/components/ui/modalHeader"
import { TbBuildingSkyscraper, TbDeviceFloppy, TbArrowBack } from "react-icons/tb"
import { FloatingLabelInput } from "@/src/components/ui/input"
import { ButtonRed, ButtonSky } from "@/src/components/global/button/Button"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import useToast from "@/src/lib/helper/toast/toast"
import { LoadingButton } from "@/src/lib/helper/loading"
import { BidangUrusan } from "@/src/types"
import { GetResponseBidangUrusan } from "../../type"

interface Modal {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
    jenis: "tambah" | "edit"
    Data: BidangUrusan | null
    apiUrl?: string
}

interface FormValue {
    kodeBidangUrusan: string
    namaBidangUrusan: string
}

const defaultValues: FormValue = {
    kodeBidangUrusan: "",
    namaBidangUrusan: ""
}

export const ModalBidangUrusan: React.FC<Modal> = ({ isOpen, onClose, onSuccess, jenis, Data, apiUrl }) => {

    const { toastSuccess, toastError } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { control, handleSubmit, reset } = useForm<FormValue>({
        defaultValues
    })

    useEffect(() => {
        if (jenis === "edit" && Data) {
            reset({
                kodeBidangUrusan: Data.kodeBidangUrusan,
                namaBidangUrusan: Data.namaBidangUrusan
            })
        } else {
            reset(defaultValues)
        }
    }, [Data, jenis, reset])

    const handleClose = () => {
        reset(defaultValues)
        onClose()
    }

    const onSubmit: SubmitHandler<FormValue> = async (formValues) => {
        if (!apiUrl) {
            toastError("URL API belum tersedia.")
            return
        }

        setIsSubmitting(true)
        try {
            const endpoint =
                jenis === "edit"
                    ? `${apiUrl}/bidangurusan/update/${Data?.kodeBidangUrusan ?? formValues.kodeBidangUrusan}`
                    : `${apiUrl}/bidangurusan`
            const method = jenis === "edit" ? "PUT" : "POST"

            const response = await fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formValues)
            })

            if (!response.ok) {
                const errorBody = await response.json().catch(() => null)
                const message = errorBody?.message || "Gagal menyimpan data."
                throw new Error(message)
            }

            await response.json() as GetResponseBidangUrusan
            toastSuccess(
                jenis === "edit" ? "Bidang Urusan berhasil diperbarui." : "Bidang Urusan berhasil disimpan."
            )
            onSuccess()
            handleClose()
        } catch (error) {
            toastError(error instanceof Error ? error.message : "Terjadi kesalahan.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <ModalComponent isOpen={isOpen} onClose={handleClose}>
            <ModalHeader className="border-blue-700 text-blue-700">
                <TbBuildingSkyscraper />
                {jenis} Bidang Urusan
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="py-3">
                <Controller
                    name="kodeBidangUrusan"
                    control={control}
                    rules={{ required: "Kode Bidang Urusan wajib diisi" }}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="kodeBidangUrusan"
                            label="Kode Bidang Urusan"
                        />
                    )}
                />
                <Controller
                    name="namaBidangUrusan"
                    control={control}
                    rules={{ required: "Bidang Urusan wajib diisi" }}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="namaBidangUrusan"
                            label="Bidang Urusan"
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
                        type="button"
                        className="w-full flex items-center gap-1"
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
