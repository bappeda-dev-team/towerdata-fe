'use client'

import { useState, useEffect } from "react"
import { TbEye, TbEyeClosed } from "react-icons/tb"
import { useBrandingContext } from "@/src/providers/BrandingProvider"

export const FormLogin = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const { branding } = useBrandingContext();

    const [ShowPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                // onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm flex flex-col items-center gap-4"
            >
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-center">LOGIN</h1>
                    <h3 className="text-xl text-center">{branding?.nama_pemda || "pemerintah daerah"}</h3>
                </div>

                {/* {error && <p className="text-red-500 text-sm text-center">{error}</p>} */}

                <div className="flex flex-col items-center w-full gap-2">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border px-3 py-2 rounded w-full"
                        required
                    />
                    <div className="relative w-full">
                        <input
                            value={password}
                            type={!ShowPassword ? "password" : "text"}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className={`w-full border rounded p-2 pr-10`}
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                            onClick={() => setShowPassword(!ShowPassword)}
                        >
                            <p className="p-1 rounded-full text-blue-600 hover:bg-blue-500 hover:text-white">{ShowPassword ? <TbEye /> : <TbEyeClosed />}</p>
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => window.location.href = "/"}
                        disabled={loading}
                        className="bg-blue-600 text-white w-full px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </div>
            </form>
        </div>
    )
}