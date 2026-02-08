export interface OptionType {
    label: string;
    value: number;
}
export interface OptionTypeString {
    label: string;
    value: string;
}
export interface GetResponse<T> {
    code: number;
    data: T;
    status: string;
    message?: string;
}

export interface GetResponseFindallOpd {
    id: number;
    kodeOpd: string;
    namaOpd: string;
    bidangUrusan: BidangUrusan[];
}
export interface BidangUrusan {
    kodeBidangUrusan: string;
    namaBidangUrusan: string;
}

export interface BrandingContextType {
    loadingBranding: boolean;
    branding: {
        nama_app: string;
        nama_pemda: string;
        logo: string;
        api_url: string;
        api_rekening: string;
        tahun: OptionType | null | undefined;
        opd: OptionTypeString | null | undefined;
        jenis_tahun: OptionTypeString | null | undefined;
        user: any;
    }
}