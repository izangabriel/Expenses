import { useState } from "react"
import Login from "./Login";
import SignUp from "./SignUp";

const Auth = () => {
    const [auth, setAuth] = useState("login")

    return (
        <main className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-[#05070d] px-4 py-8">
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-40 -top-40 h-125 w-125 rounded-full bg-blue-600/15 blur-[140px]" />
                <div className="absolute -bottom-40 -right-40 h-125 w-125 rounded-full bg-purple-600/15 blur-[140px]" />
                <div className="absolute left-1/2 top-1/2 h-67.5 w-87.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[100px]" />
            </div>

            <div className="relative flex w-full max-w-lg flex-col gap-6 rounded-2xl border border-white/10 bg-black/50 p-6 text-white shadow-2xl backdrop-blur-xl sm:p-8">
                <div className="w-full">
                    {auth === "login" ? <Login /> : <SignUp />}
                </div>

                <div className="flex items-center gap-3 text-sm text-white/50">
                    <div className="flex-1 border-t border-white/15" />
                    <span>o</span>
                    <div className="flex-1 border-t border-white/15" />
                </div>

                <p className="text-center text-sm text-white/70">
                    {auth === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
                    <button
                        type="button"
                        onClick={() => setAuth(auth === "login" ? "signUp" : "login")}
                        className="cursor-pointer font-medium text-blue-400 transition-colors hover:text-blue-300 focus-visible:underline"
                    >
                        {auth === "login" ? "Regístrate" : "Inicia sesión"}
                    </button>
                </p>
            </div>
        </main>
    )
}

export default Auth;