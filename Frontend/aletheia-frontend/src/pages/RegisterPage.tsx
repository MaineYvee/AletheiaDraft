import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [studentId, setStudentId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        // triggers flip animation on load
        const timer = setTimeout(() => setFlipped(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await register({
                studentId,
                firstName,
                lastName,
                email,
                password
            });

            alert("Registration successful. Check your email for verification.");
            navigate("/login");

        } catch (error) {
            console.error(error);
            alert("Registration failed");
        }
    };

    return (
        <div className="
            min-h-screen
            bg-gradient-to-b
            from-[#0b0f14]
            via-[#111827]
            to-[#05070a]
            flex
            justify-center
            items-center
            px-4
            perspective-[1200px]
        ">

            <div
                className={`
                    w-full
                    max-w-xl
                    transform
                    transition-all
                    duration-700
                    ease-out
                    ${flipped ? "rotate-y-0 opacity-100" : "rotate-y-90 opacity-0"}
                `}
                style={{
                    transformStyle: "preserve-3d"
                }}
            >

                <form
                    onSubmit={handleRegister}
                    className="
                        bg-slate-900/80
                        border
                        border-amber-500/20
                        p-10
                        rounded-3xl
                        shadow-2xl
                        shadow-amber-500/10
                    "
                >

                    <h1 className="
                        text-4xl
                        text-center
                        text-transparent
                        bg-clip-text
                        bg-gradient-to-r
                        from-amber-300
                        to-amber-600
                        font-bold
                        mb-8
                    ">
                        Create Account
                    </h1>

                    <div className="grid grid-cols-2 gap-4">

                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="
                                bg-slate-950
                                border border-slate-700
                                p-4 rounded-xl text-white
                                focus:outline-none
                                focus:border-amber-400
                            "
                        />

                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="
                                bg-slate-950
                                border border-slate-700
                                p-4 rounded-xl text-white
                                focus:outline-none
                                focus:border-amber-400
                            "
                        />

                    </div>

                    <input
                        type="text"
                        placeholder="Student ID"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="
                            w-full mt-4
                            bg-slate-950
                            border border-slate-700
                            p-4 rounded-xl text-white
                            focus:outline-none
                            focus:border-amber-400
                        "
                    />

                    <input
                        type="email"
                        placeholder="NU Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="
                            w-full mt-4
                            bg-slate-950
                            border border-slate-700
                            p-4 rounded-xl text-white
                            focus:outline-none
                            focus:border-amber-400
                        "
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="
                            w-full mt-4 mb-6
                            bg-slate-950
                            border border-slate-700
                            p-4 rounded-xl text-white
                            focus:outline-none
                            focus:border-amber-400
                        "
                    />

                    <button
                        type="submit"
                        className="
                            w-full
                            bg-gradient-to-r
                            from-amber-400
                            to-yellow-500
                            text-black
                            p-4 rounded-xl
                            font-semibold
                            hover:scale-105
                            transition
                        "
                    >
                        Register
                    </button>

                </form>
            </div>

            {/* Flip animation styles */}
            <style>{`
                .perspective-\\[1200px\\] {
                    perspective: 1200px;
                }

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

export default RegisterPage;