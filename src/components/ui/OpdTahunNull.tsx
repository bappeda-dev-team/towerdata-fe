import { TbAlertTriangle } from "react-icons/tb"

export const OpdTahunNull = () => {
    return (
        <>
            <div className="flex flex-wrap items-center gap-1 uppercase p-5 m-3 border-2 border-gray-600 rounded-lg justify-center">
                <h1 className="text-gray-600 font-bold"><TbAlertTriangle /></h1>
                <h1 className="text-gray-600 font-bold">Pilih Perangkat Daerah & Tahun di header terlebih dahulu</h1>
            </div>
        </>
    )
}
export const TahunNull = () => {
    return (
        <>
            <div className="flex flex-wrap items-center gap-1 uppercase p-5 m-3 border-2 border-gray-600 rounded-lg justify-center">
                <h1 className="text-gray-600 font-bold"><TbAlertTriangle /></h1>
                <h1 className="text-gray-600 font-bold">Pilih Tahun di header terlebih dahulu</h1>
            </div>
        </>
    )
}
export const OpdNull = () => {
    return (
        <>
            <div className="flex flex-wrap items-center gap-1 uppercase p-5 m-3 border-2 border-gray-600 rounded-lg justify-center">
                <h1 className="text-gray-600 font-bold"><TbAlertTriangle /></h1>
                <h1 className="text-gray-600 font-bold">Pilih Perangkat Daerah di header terlebih dahulu</h1>
            </div>
        </>
    )
}