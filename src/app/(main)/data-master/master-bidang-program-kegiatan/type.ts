export interface GetResponseProgram {
    id: number;
    kodeProgram: string;
    namaProgram: string;
    bidangUrusanId: number | null;
    createdDate: string;
    lastModifiedDate: string;
}

export interface GetResponseKegiatan {
    id: number;
    kodeKegiatan: string;
    namaKegiatan: string;
    programId: number | null;
    createdDate: string;
    lastModifiedDate: string;
}

export interface GetResponseSubKegiatan {
    id: number;
    kodeSubKegiatan: string;
    namaSubKegiatan: string;
    kegiatanId: number | null;
    createdDate: string;
    lastModifiedDate: string;
}

export interface GetResponseBidangUrusan {
    id: number;
    kodeBidangUrusan: string;
    namaBidangUrusan: string;
}
