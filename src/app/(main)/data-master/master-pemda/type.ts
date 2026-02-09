export interface PemdaPayload {
    kodePemda: string;
    namaPemda: string;
}

export interface PemdaResponse extends PemdaPayload {
    id: number;
}
