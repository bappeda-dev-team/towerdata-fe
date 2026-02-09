'use client'

import { ModalComponent } from "@/src/components/ui/modalComponent"
import { ModalHeader } from "@/src/components/ui/modalHeader"
import { TbBuildingSkyscraper, TbDeviceFloppy, TbArrowBack } from "react-icons/tb"
import { FloatingLabelInput } from "@/src/components/ui/input"
import { ButtonRed, ButtonSky } from "@/src/components/global/button/Button"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import useToast from "@/src/lib/helper/toast/toast"
import { LoadingButton } from "@/src/lib/helper/loading"
import { BidangUrusan } from "@/src/types"

interface Modal {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
    jenis: "tambah" | "edit"
    Data: BidangUrusan | null
}

interface FormValue {
    kodeBidangUrusan: string
    namaBidangUrusan: string
}

export const ModalBidangUrusan: React.FC<Modal> = ({ isOpen, onClose, onSuccess, jenis, Data }) => {

    const { toastSuccess } = useToast()
    const proses = false

    const { control, handleSubmit, reset } = useForm<FormValue>({
        defaultValues: {
            kodeBidangUrusan: Data?.kodeBidangUrusan,
            namaBidangUrusan: Data?.namaBidangUrusan,
        }
    })

    const onSubmit: SubmitHandler<FormValue> = async () => {
        toastSuccess("Perubahan disimpan (tampilan saja)")
        onSuccess()
        onClose()
    }

    const handleClose = () => {
        reset()
        onClose()
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
