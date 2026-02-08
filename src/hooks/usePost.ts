
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface UsePostOptions {
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    onUnauthorized?: () => void;
    showErrorToast?: boolean;
}

interface UsePostReturn<T> {
    post: (url: string, jenis: "POST" | "PUT", data?: any, options?: RequestInit) => Promise<T | null>;
    proses: boolean;
    error: string | null;
    resetError: () => void;
    data: T | null;
}

export function usePost<T = any>(options: UsePostOptions = {}): UsePostReturn<T> {
    const [proses, setProses] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | null>(null);
    const router = useRouter();

    const { onSuccess, onError, onUnauthorized, showErrorToast = true } = options;

    const post = useCallback(async (
        url: string,
        jenis: "POST" | "PUT",
        data?: any,
        requestOptions: RequestInit = {}
    ): Promise<T | null> => {
        setProses(true);
        setError(null);

        try {
            const defaultOptions: RequestInit = {
                method: jenis,
                headers: {
                    'Content-Type': 'application/json',
                    ...requestOptions.headers,
                },
                body: data ? JSON.stringify(data) : undefined,
                ...requestOptions,
            };

            const response = await fetch(url, defaultOptions);

            // Handle Unauthorized (401)
            if (response.status === 401) {
                if (onUnauthorized) {
                    onUnauthorized();
                } else {
                    // Default unauthorized behavior - redirect to login
                    router.push('/login');
                }
                return null;
            }

            // Handle other error statuses
            if (!response.ok) {
                let errorMessage = `Error: ${response.status}`;

                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch {
                    // If response is not JSON, use status text
                    errorMessage = response.statusText || errorMessage;
                }

                throw new Error(errorMessage);
            }

            // Parse successful response
            const responseData = await response.json();
            setData(responseData);

            if (onSuccess) {
                onSuccess(responseData);
            }

            return responseData;

        } catch (err: any) {
            const errorMessage = err.message || 'An unexpected error occurred';
            setError(errorMessage);

            // Show toast notification if enabled
            if (showErrorToast && typeof window !== 'undefined') {
                // You can integrate with your toast library here
                console.error('Error:', errorMessage);
                // Example: toast.error(errorMessage);
            }

            if (onError) {
                onError(err);
            }

            return null;
        } finally {
            setProses(false);
        }
    }, [onSuccess, onError, onUnauthorized, showErrorToast, router]);

    const resetError = useCallback(() => {
        setError(null);
    }, []);

    return {
        post,
        proses,
        error,
        resetError,
        data,
    };
}
