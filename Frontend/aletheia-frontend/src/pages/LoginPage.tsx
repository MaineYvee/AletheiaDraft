import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setFlipped(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await login({ email, password });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);

            if (response.data.role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }
        } catch (error) {
            console.error(error);
            alert("Login failed");
        }
    };

    return (
        <div className="
            relative
            min-h-screen
            overflow-hidden
            flex
            items-center
            justify-center
            px-4
            bg-gradient-to-b
            from-[#0b0f14]
            via-[#111827]
            to-[#05070a]
        ">

            {/* 🕯️ Candle glow */}
            <div className="candle-glow"></div>



            {/* 🪄 Login Card */}
            <div
                className={`
                    w-full max-w-md
                    transform
                    transition-all duration-700 ease-out
                    ${flipped ? "rotate-y-0 opacity-100" : "rotate-y-90 opacity-0"}
                `}
                style={{ transformStyle: "preserve-3d" }}
            >
                <form
                    onSubmit={handleLogin}
                    className="
                        bg-slate-900/80
                        border border-amber-500/20
                        p-10 rounded-3xl
                        shadow-2xl shadow-amber-500/10
                    "
                >
                    <h1 className="
                        text-4xl font-bold text-center mb-2
                        text-transparent bg-clip-text
                        bg-gradient-to-r from-amber-300 to-amber-600
                    ">
                        Welcome Back
                    </h1>

                    <p className="text-center text-slate-400 mb-8">
                        Sign in to your archive access
                    </p>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="
                            w-full mb-4 p-4 rounded-xl
                            bg-slate-950 border border-slate-700
                            text-white
                            focus:outline-none focus:border-amber-400
                        "
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="
                            w-full mb-6 p-4 rounded-xl
                            bg-slate-950 border border-slate-700
                            text-white
                            focus:outline-none focus:border-amber-400
                        "
                    />

                    <button
                        className="
                            w-full p-4 rounded-xl font-semibold
                            bg-gradient-to-r from-amber-400 to-yellow-500
                            text-black hover:scale-105 transition
                        "
                    >
                        Enter Library
                    </button>
                </form>
            </div>

            {/* 🎨 Styles */}
            <style>{`
                /* Candle glow */
                .candle-glow {
                    position: absolute;
                    top: 15%;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(
                        circle,
                        rgba(255, 191, 0, 0.25) 0%,
                        rgba(255, 191, 0, 0.08) 40%,
                        transparent 70%
                    );
                    filter: blur(25px);
                    animation: flicker 3s infinite ease-in-out;
                }

                @keyframes flicker {
                    0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
                    50% { opacity: 1; transform: translateX(-50%) scale(1.05); }
                }

                /* Floating books */
                .floating-book {
                    position: absolute;
                    bottom: -50px;
                    opacity: 0.18;
                    animation: floatUp 12s linear infinite;
                }

                @keyframes floatUp {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 0;
                    }
                    20% { opacity: 0.25; }
                    100% {
                        transform: translateY(-110vh) rotate(360deg);
                        opacity: 0;
                    }
                }

                /* Card flip */
                .rotate-y-90 {
                    transform: rotateY(90deg);
                }

                .rotate-y-0 {
                    transform: rotateY(0deg);
                }
            `}</style>

        </div>
    );
};

export default LoginPage;