export interface PegawaiRequest {
    kodeOpd: string;
    tahun: number;
    namaPegawai: string;
    nip: string;
    email: string;
    jabatanDinas: string;
    jabatanTim: string;
    role: string;
}

export interface GetResponseFindallPegawai extends PegawaiRequest {
    id: number;
}
