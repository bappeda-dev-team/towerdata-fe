'use client'
import { ModalComponent } from "@/src/components/ui/modalComponent";
import { ModalHeader } from "@/src/components/ui/modalHeader";
import { TbBuildingSkyscraper, TbDeviceFloppy, TbArrowBack } from "react-icons/tb";
import { FloatingLabelInput } from "@/src/components/ui/input";
import { ButtonRed, ButtonSky } from "@/src/components/global/button/Button";
import { LoadingButton } from "@/src/lib/helper/loading";
import { GetResponseFindallSumberDana } from "../type";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import useToast from "@/src/lib/helper/toast/toast";

interface Modal {
    Data: GetResponseFindallSumberDana | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    jenis: "tambah" | "edit";
}

interface FormValue {
    kodeDanaLama: string;
    sumberDana: string;
    kodeDanaBaru: string;
}

export const ModalSumberDana: React.FC<Modal> = ({ Data, isOpen, onClose, onSuccess, jenis }) => {
    const { toastSuccess } = useToast();

    const { control, handleSubmit, reset } = useForm<FormValue>({
        defaultValues: {
            kodeDanaLama: Data?.kodeDanaLama,
            sumberDana: Data?.sumberDana,
            kodeDanaBaru: Data?.kodeDanaBaru,
        }
    });

    const proses = false;

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        toastSuccess("Perubahan disimpan (tampilan saja)");
        onSuccess();
        onClose();
    }

    return (
        <ModalComponent isOpen={isOpen} onClose={onClose}>
            <ModalHeader className="border-sky-700 text-sky-700">
                <TbBuildingSkyscraper />
                {jenis} Sumber Dana
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="py-3">
                <Controller
                    name="kodeDanaLama"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="kodeDanaLama"
                            label="Kode Dana Lama"
                        />
                    )}
                />
                <Controller
                    name="sumberDana"
                    control={control}
                    render={({ field }) => (
                        < FloatingLabelInput
                            {...field}
                            id="sumberDana"
                            label="Nama Sumber Dana"
                        />
                    )}
                />
                <Controller
                    name="kodeDanaBaru"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="kodeDanaBaru"
                            label="Kode Dana Baru"
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
