import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

const SignUp = () => {
    const { signUp } = useAuth();
    const [dataForm, setDataForm] = useState({ email: "", password: "" });
    const [errorMsg, setErrorMsg] = useState("");
    const [registered, setRegistered] = useState(false);

    const handleForm = async (e) => {
        e.preventDefault();
        if (!dataForm.email.trim() || !dataForm.password.trim()) return;

        const success = await signUp(dataForm.email, dataForm.password);

        if (success) {
            setRegistered(true);
        } else {
            setErrorMsg('No se pudo completar el registro');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm(prev => ({ ...prev, [name]: value }));
    };

    const inputClass =
        "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white " +
        "placeholder:text-white/40 outline-none transition-colors " +
        "focus:border-blue-500/60 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/20";

    return (
        <div className="w-full">
            <h2 className="mb-4 text-center text-2xl font-semibold">Registro</h2>

            {registered ? (
                <p
                    role="status"
                    className="rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-300"
                >
                    Revisa tu correo para confirmar tu cuenta antes de iniciar sesión.
                </p>
            ) : (
                <form onSubmit={handleForm} className="flex flex-col gap-3">
                    <input
                        type="email"
                        name="email"
                        value={dataForm.email}
                        onChange={handleChange}
                        placeholder="Correo electrónico"
                        aria-label="Correo electrónico"
                        autoComplete="email"
                        required
                        className={inputClass}
                    />
                    <input
                        type="password"
                        name="password"
                        value={dataForm.password}
                        onChange={handleChange}
                        placeholder="Contraseña"
                        aria-label="Contraseña"
                        autoComplete="new-password"
                        minLength={8}
                        required
                        className={inputClass}
                    />

                    <button
                        type="submit"
                        className="mt-1 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Regístrate
                    </button>

                    {errorMsg && (
                        <p role="alert" className="text-center text-sm text-red-400">
                            {errorMsg}
                        </p>
                    )}
                </form>
            )}
        </div>
    );
};

export default SignUp;