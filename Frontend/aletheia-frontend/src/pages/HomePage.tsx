import { Link, Navigate } from "react-router-dom";

function HomePage() {
    const token = localStorage.getItem("token");

    if (token) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="
            relative
            min-h-screen
            flex
            flex-col
            justify-center
            items-center
            px-6
            text-white
            overflow-hidden
            bg-gradient-to-b
            from-[#0b0f14]
            via-[#111827]
            to-[#05070a]
        ">

            {/* Floating books background */}
            <div className="absolute inset-0 pointer-events-none">
                <FloatingBook delay="0s" left="10%" size="40px" />
                <FloatingBook delay="2s" left="25%" size="55px" />
                <FloatingBook delay="4s" left="40%" size="35px" />
                <FloatingBook delay="1s" left="60%" size="50px" />
                <FloatingBook delay="3s" left="75%" size="45px" />
                <FloatingBook delay="5s" left="85%" size="60px" />
            </div>

            {/* Glow */}
            <div className="
                absolute
                w-[500px]
                h-[500px]
                bg-amber-500/10
                blur-3xl
                rounded-full
                top-20
            "></div>

            {/* Title */}
            <h1 className="
                text-7xl
                font-extrabold
                tracking-widest
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-amber-300
                via-yellow-400
                to-amber-600
                drop-shadow-[0_0_15px_rgba(255,191,0,0.3)]
                mb-4
                z-10
            ">
                ALETHEIA
            </h1>

            <p className="text-2xl text-amber-200 mb-2 z-10">
                NU Laguna Library Management System
            </p>

            <p className="text-slate-400 text-center max-w-xl mb-10 z-10">
                Knowledge. Discovery. Growth. Borrow books, manage reservations,
                and explore academic resources like a timeless archive.
            </p>

            <div className="flex gap-6 z-10">
                <Link
                    to="/login"
                    className="
                        px-8 py-4 rounded-xl font-semibold text-black
                        bg-gradient-to-r from-amber-400 to-yellow-500
                        shadow-lg shadow-amber-500/20
                        hover:scale-105 transition
                    "
                >
                    Enter Library
                </Link>

                <Link
                    to="/register"
                    className="
                        px-8 py-4 rounded-xl font-semibold
                        border border-amber-400 text-amber-200
                        hover:bg-amber-500 hover:text-black
                        transition
                    "
                >
                    Create Account
                </Link>
            </div>

            {/* Floating book component */}
            <FloatingBookStyles />
        </div>
    );
}

/* Floating Book Component */
function FloatingBook({ left, delay, size }) {
    return (
        <div
            className="absolute animate-float text-amber-300 opacity-20"
            style={{
                left,
                fontSize: size,
                animationDelay: delay,
            }}
        >
            📚
        </div>
    );
}

/* Keyframes */
function FloatingBookStyles() {
    return (
        <style>{`
            @keyframes floatUp {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                20% {
                    opacity: 0.25;
                }
                50% {
                    opacity: 0.15;
                }
                100% {
                    transform: translateY(-20vh) rotate(360deg);
                    opacity: 0;
                }
            }

            .animate-float {
                animation: floatUp 10s linear infinite;
            }
        `}</style>
    );
}

export default HomePage;