export interface SubKegiatanResponse {
  id: number;
  kodeSubKegiatan: string;
  namaSubKegiatan: string;
  kodeOpd: string;
  tahun: number;
}

export interface GetResponseFindallProgramPrioritas {
  id: number;
  idSubkegiatan?: number | null;
  programPrioritas: string;
  tahun: number;
  keterangan?: string | null;
  periodeTahunAwal?: number | null;
  periodeTahunAkhir?: number | null;
  // status?: string | null;
  kodeSubKegiatanDetail?: string;
  namaSubKegiatanDetail?: string;
  kodeOpdDetail?: string;
  createdDate?: string;
  lastModifiedDate?: string;
}