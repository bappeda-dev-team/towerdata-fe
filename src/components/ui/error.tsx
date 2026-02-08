// ErrorMessage.jsx
import React from 'react';

export const ErrorMessage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-red-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-xl border border-red-200">
                <div className="text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        ></path>
                    </svg>
                    <h2 className="mt-6 text-3xl font-extrabold text-red-800">
                        Terjadi Kesalahan!
                    </h2>
                    <p className="mt-2 text-sm text-red-600">
                        Maaf, kami tidak dapat memuat data. Silakan coba lagi nanti.
                    </p>
                </div>
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                    <p className="font-bold">Detail Error:</p>
                    <p>terdapat kesalahan pada server atau Backend, cek berkala koneksi internet atau hubungi tim developer</p>
                </div>
                <div className="text-center">
                    <button
                        onClick={() => window.location.reload()}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Coba Lagi
                    </button>
                </div>
            </div>
        </div>
    );
};

export const TahunNull = () => (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-xl border border-blue-200 text-center">
        <svg
          className="mx-auto h-12 w-12 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div className="flex items-center justify-center gap-1 mt-3">
          <h2 className="text-3xl font-extrabold text-blue-800">
            Pilih
          </h2>
          <h2 className="text-3xl font-extrabold text-red-500">
            Tahun
          </h2>
        </div>
        <p className="mt-2 text-sm text-blue-600">
          Untuk menampilkan data, mohon pilih tahun di header terlebih dahulu.
        </p>
      </div>
    </div>
  );