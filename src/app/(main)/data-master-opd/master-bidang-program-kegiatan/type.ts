export interface GetResponseProgram {
    id: number;
    kodeProgram: string;
    namaProgram: string;
    bidangUrusanId: number | null;
    createdDate: string;
    lastModifiedDate: string;
}

export interface GetResponseProgramOpd {
    id: number;
    kodeProgramOpd: string;
    namaProgramOpd: string;
    kodeOpd: string;
    tahun: number;
    createdDate: string;
    lastModifiedDate: string;
}

export interface GetResponseKegiatanOpd {
    id: number;
    kodeKegiatanOpd: string;
    namaKegiatanOpd: string;
    kodeOpd: string;
    tahun: number;
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

export interface GetResponseSubKegiatanOpd {
    id: number;
    kodeSubKegiatanOpd: string;
    namaSubKegiatanOpd: string;
    kodeOpd: string;
    tahun: number;
    createdDate: string;
    lastModifiedDate: string;
}
