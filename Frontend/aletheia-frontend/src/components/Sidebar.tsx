import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="
            relative
            w-64
            min-h-screen
            p-6
            text-white
            bg-gradient-to-b
            from-[#0b0f14]
            via-[#0f172a]
            to-[#05070a]
            border-r
            border-amber-500/10
        ">

            {/* 🕯️ subtle glow (same system as dashboard) */}
            <div className="sidebar-glow"></div>

            {/* 🏛️ Brand */}
            <h1 className="
                text-2xl font-bold mb-10
                text-transparent bg-clip-text
                bg-gradient-to-r
                from-amber-300 to-amber-600
                tracking-wide
            ">
                Aletheia
            </h1>

            {/* 🧭 Navigation */}
            <nav className="flex flex-col gap-2 text-sm">

                <NavItem to="/profile" label="My Profile" />
                <NavItem to="/dashboard" label="Dashboard" />
                <NavItem to="/books" label="Books" />
                <NavItem to="/borrowed" label="My Borrowed Books" />
                <NavItem to="/history" label="Borrow History" />
                <NavItem to="/reservations" label="Reservations" />

                {/* 🚪 Logout */}
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/";
                    }}
                    className="
                    mt-10
                    w-full
                    px-4 py-3
                    rounded-lg

                    bg-gradient-to-r
                    from-red-500
                    to-pink-600

                    text-white
                    font-semibold

                    border border-red-500/30

                    hover:scale-[1.03]
                    hover:shadow-lg
                    hover:shadow-red-500/20

                    transition
                ">

                    Logout
                </button>

            </nav>

            {/* 🎨 Styles */}
            <style>{`
                /* 🕯️ sidebar ambient glow */
                .sidebar-glow {
                    position: absolute;
                    top: 20%;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 220px;
                    height: 220px;
                    background: radial-gradient(
                        circle,
                        rgba(255,191,0,0.12),
                        transparent 70%
                    );
                    filter: blur(25px);
                    pointer-events: none;
                }

                /* 📌 nav item base */
                .nav-item {
                    padding: 12px 14px;
                    border-radius: 10px;
                    color: #cbd5e1;
                    border: 1px solid transparent;
                    transition: 0.2s ease;
                }

                .nav-item:hover {
                    background: rgba(251,191,36,0.08);
                    border-color: rgba(251,191,36,0.2);
                    color: #fbbf24;
                    transform: translateX(4px);
                }
            `}</style>

        </div>
    );
}

/* 🧭 Reusable Nav Item */
function NavItem({ to, label }) {
    return (
        <Link to={to} className="nav-item">
            {label}
        </Link>
    );
}

export default Sidebar;