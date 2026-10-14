import BtnLogout from './BtnLogout'

const NavBar = () => {
    return (
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#05070d]/80 px-4 py-3 backdrop-blur-xl sm:px-6">
            <span className="text-lg font-semibold text-white">ExpensesApp</span>

            <nav aria-label="Principal">
                <BtnLogout />
            </nav>
        </header>
    )
}

export default NavBar