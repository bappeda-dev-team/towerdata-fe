export interface OpdFindallResponse {
    id: number;
    kodeOpd: string;
    namaOpd: string;
    bidangUrusan: BidangUrusan[];
}
export interface BidangUrusan {
    id: number;
    kodeBidangUrusan: string;
    namaBidangUrusan: string;
}

export interface GetResponseFindallBidangUrusan {
    id: number,
    kodeBidangUrusan: string,
    namaBidangUrusan: string,
}
