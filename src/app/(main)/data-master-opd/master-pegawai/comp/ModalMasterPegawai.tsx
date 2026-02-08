'use client'

import { ModalComponent } from "@/src/components/ui/modalComponent";
import { ModalHeader } from "@/src/components/ui/modalHeader";
import { TbBuildingSkyscraper, TbDeviceFloppy, TbArrowBack } from "react-icons/tb";
import { FloatingLabelInput } from "@/src/components/ui/input";
import { ButtonRed, ButtonSky } from "@/src/components/global/button/Button";
import { LoadingButton } from "@/src/lib/helper/loading";
import { useForm, Controller } from "react-hook-form";
import { GetResponseFindallPegawai, PegawaiRequest } from "../type";
import useToast from "@/src/lib/helper/toast/toast";

interface Modal {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    jenis: "tambah" | "edit";
    kode_opd: string;
    nama_opd: string;
    Data: GetResponseFindallPegawai | null;
}
type FormValue = PegawaiRequest;

export const ModalMasterPegawai: React.FC<Modal> = ({ Data, isOpen, onClose, onSuccess, jenis, kode_opd, nama_opd }) => {

    const { toastSuccess } = useToast();
    const Proses = false;

    const { control, handleSubmit, reset } = useForm<FormValue>({
        defaultValues: {
            kodeOpd: kode_opd,
            tahun: "",
            namaPegawai: Data?.namaPegawai,
            nip: Data?.nip,
            email: Data?.email,
            jabatanDinas: Data?.jabatanDinas,
            jabatanTim: Data?.jabatanTim,
            role: Data?.role ?? "",
        }
    });

    const onSubmit = async (data: FormValue) => {
        toastSuccess("Perubahan disimpan (tampilan saja)");
        onSuccess();
        onClose();
    }

    const handleClose = () => {
        onClose();
        reset();
    }

    return (
        <ModalComponent isOpen={isOpen} onClose={onClose}>
            <ModalHeader className="border-sky-700 text-sky-700">
                <TbBuildingSkyscraper />
                {jenis} Pegawai
            </ModalHeader>
            <div className="p-3 flex flex-col border border-slate-200 rounded-lg bg-white shadow-sm">
                <h1 className="font-bold uppercase text-blue-500">{nama_opd}</h1>
                <h1 className="font-semibold uppercase text-sky-700">{kode_opd}</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit as any)} className="py-3">
                <Controller
                    name="namaPegawai"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="namaPegawai"
                            label="Nama Pegawai"
                        />
                    )}
                />
                <Controller
                    name="nip"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="nip"
                            label="NIP"
                        />
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="email"
                            label="Email"
                        />
                    )}
                />
                <Controller
                    name="jabatanDinas"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="jabatanDinas"
                            label="Jabatan Dinas"
                        />
                    )}
                />
                <Controller
                    name="jabatanTim"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="jabatanTim"
                            label="Jabatan Tim"
                        />
                    )}
                />
                <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold uppercase text-slate-500">Role</span>
                            <select
                                {...field}
                                className="rounded border border-slate-300 px-3 py-2 text-sm focus:border-sky-600 focus:outline-none"
                                id="role"
                            >
                                <option value="">Pilih Role</option>
                                {["Level 1", "Level 2", "Level 3", "Level 4"].map(level => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
                        </div>
                    )}
                />
                <div className="flex flex-col items-center gap-1 mt-6">
                    <ButtonSky
                        type="submit"
                        className="w-full flex items-center gap-1"
                        disabled={Proses}
                    >
                        {Proses ?
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
