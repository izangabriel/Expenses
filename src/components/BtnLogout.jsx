import { useAuth } from "../contexts/AuthContext"

const BtnLogout = () => {
    const { logout } = useAuth();

    return (
        <>
            <button
                type="button" onClick={() => logout()}
                className="cursor-pointer rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400">
                Cerrar sesion
            </button>
        </>
    )
}

export default BtnLogout