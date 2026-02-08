'use client'

import { ModalComponent } from "@/src/components/ui/modalComponent";
import { ModalHeader } from "@/src/components/ui/modalHeader";
import { TbBuildingSkyscraper, TbDeviceFloppy, TbArrowBack } from "react-icons/tb";
import { FloatingLabelInput, FloatingLabelTextarea, FloatingLabelSelect } from "@/src/components/ui/input";
import { ButtonRed, ButtonSky } from "@/src/components/global/button/Button";
import { LoadingButton } from "@/src/lib/helper/loading";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { GetResponseFindallProgramPrioritas } from "../type";
import useToast from "@/src/lib/helper/toast/toast";

interface Modal {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  jenis: "tambah" | "edit";
  Data: GetResponseFindallProgramPrioritas | null;
}

interface FormValue {
  programPrioritas: string;
  tahun?: number | string;
  keterangan?: string;
}

export const ModalProgramPrioritas: React.FC<Modal> = ({ Data, isOpen, onClose, onSuccess, jenis }) => {

  const { toastSuccess } = useToast();

  const { control, handleSubmit, reset } = useForm<FormValue>({
    defaultValues: {
      programPrioritas: Data?.programPrioritas ?? "",
      tahun: Data?.tahun ?? "",
      keterangan: Data?.keterangan ?? "",
    }
  });

  const proses = false;

  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    toastSuccess(jenis === "tambah" ? "Berhasil menambahkan data (tampilan saja)" : "Berhasil memperbarui data (tampilan saja)");
    onSuccess();
    onClose();
  }

  const handleClose = () => {
    onClose();
    reset();
  }

  return (
    <ModalComponent isOpen={isOpen} onClose={handleClose}>
      <ModalHeader className="border-sky-700 text-sky-700">
        <TbBuildingSkyscraper />
        {jenis} Program Prioritas
      </ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="py-3">
        <Controller name="programPrioritas" control={control}
          render={({ field }) => <FloatingLabelInput {...field} id="program_prioritas" label="Program Prioritas" />} />

        <Controller name="tahun" control={control}
          render={({ field }) => <FloatingLabelInput {...field} id="tahun" label="Tahun" type="number" />} />

        <Controller name="keterangan" control={control}
          render={({ field }) => <FloatingLabelTextarea {...field} id="keterangan" label="Keterangan" rows={3} />} />

        <div className="flex flex-col items-center gap-1">
          <ButtonSky type="submit" className="w-full flex items-center gap-1" disabled={proses}>
            {proses ? (<><LoadingButton color="" /> menyimpan...</>) : (<><TbDeviceFloppy/> Simpan</>)}
          </ButtonSky>
          <ButtonRed className="w-full flex items-center gap-1" type="button" onClick={handleClose}>
            <TbArrowBack/> Batal
          </ButtonRed>
        </div>
      </form>
    </ModalComponent>
  )
}
