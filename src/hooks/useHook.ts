import { useState, useEffect, useCallback, useMemo } from 'react';

// --- Interfaces ---
interface FetchDataOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: HeadersInit;
    body?: BodyInit;
}

interface FetchDataResult<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}
// --- Akhir Interfaces ---


export function useHook<T = unknown>(
    url: string,
    deps: any[] = [], 
    options?: FetchDataOptions,
    // Pastikan `deps` selalu memiliki nilai default array kosong
): FetchDataResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // 1. Stabilkan objek options menggunakan useMemo
    const stableOptions = useMemo(() => options, [
        options?.method,
        options?.headers,
        options?.body,
    ]);

    // 2. Stabilkan fetchData menggunakan useCallback
    const fetchData = useCallback(async () => {
        if (!url) { 
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await fetch(url, {
                method: stableOptions?.method || 'GET',
                headers: stableOptions?.headers,
                body: stableOptions?.body,
            });

            if (!response.ok) {
                let errorMessage = `HTTP error! status: ${response.status}`;
                try {
                    const errorBody = await response.json();
                    if (errorBody && errorBody.message) {
                        errorMessage = errorBody.message;
                    }
                } catch {}
                throw new Error(errorMessage);
            }

            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        } finally {
            setLoading(false);
        }
    }, [url, stableOptions]); // Dependencies untuk fetchData: url dan stableOptions

    // 3. Masukkan fetchData ke dependency array
    useEffect(() => {
        fetchData();
        // Hanya perlu menjalankan fetchData karena url dan options sudah menjadi dependencies-nya
    }, [url, fetchData, ...deps]); 

    // Sekarang, ketika `useHook` dipanggil, `fetchData` akan mempertahankan identitasnya
    // kecuali jika `url` atau `options` (via stableOptions) berubah.
    // Jika `deps` kosong, fetch hanya terjadi saat `url` atau `options` berubah.
    // Ini menghilangkan infinite loop.
    
    return { data, loading, error, refetch: fetchData };
}