import { useState } from "react";
import { changePassword } from "../services/profileService";

function ChangePasswordPage() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleSubmit = async () => {
        try {
            await changePassword(oldPassword, newPassword);
            alert("Password updated");
        } catch (error) {
            console.error(error);
            alert("Failed to update password");
        }
    };

    return (
        <div className="vault-bg">

            {/* ✨ Glow (same as profile) */}
            <div className="glow glow-1" />
            <div className="glow glow-2" />

            {/* 🧾 Card */}
            <div className="vault-card">

                <h1 className="title">Security Vault</h1>
                <p className="subtitle">Update your authentication key</p>

                <input
                    type="password"
                    placeholder="Current Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="input"
                />

                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="input"
                />

                <button onClick={handleSubmit} className="btn">
                    Update Password
                </button>
            </div>

            {/* 🎨 Styles */}
            <style>{`
                .vault-bg {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: radial-gradient(circle at top, #111827, #05070a);
                    position: relative;
                    overflow: hidden;
                    color: white;
                }

                .glow {
                    position: absolute;
                    width: 400px;
                    height: 400px;
                    border-radius: 50%;
                    filter: blur(120px);
                    opacity: 0.2;
                    animation: float 8s infinite ease-in-out;
                }

                .glow-1 {
                    background: #fbbf24;
                    top: -100px;
                    left: -100px;
                }

                .glow-2 {
                    background: #ec4899;
                    bottom: -120px;
                    right: -120px;
                }

                @keyframes float {
                    0%,100% { transform: translateY(0); }
                    50% { transform: translateY(30px); }
                }

                .vault-card {
                    width: 380px;
                    padding: 30px;
                    border-radius: 20px;
                    background: rgba(15, 23, 42, 0.7);
                    border: 1px solid rgba(251,191,36,0.15);
                    backdrop-filter: blur(12px);
                    text-align: center;
                    box-shadow: 0 0 40px rgba(251,191,36,0.08);
                    z-index: 10;
                }

                .title {
                    font-size: 22px;
                    font-weight: bold;
                    color: #fbbf24;
                    margin-bottom: 6px;
                }

                .subtitle {
                    font-size: 12px;
                    color: #94a3b8;
                    margin-bottom: 18px;
                }

                .input {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 12px;

                    border-radius: 10px;
                    background: #0f172a;
                    border: 1px solid rgba(148,163,184,0.2);
                    color: white;
                    outline: none;
                    transition: 0.2s;
                }

                .input:focus {
                    border-color: rgba(251,191,36,0.5);
                    box-shadow: 0 0 12px rgba(251,191,36,0.15);
                    transform: scale(1.02);
                }

                .btn {
                    width: 100%;
                    padding: 10px;
                    border-radius: 10px;
                    background: linear-gradient(to right, #3b82f6, #2563eb);
                    color: white;
                    font-weight: 600;
                    transition: 0.2s;
                }

                .btn:hover {
                    transform: scale(1.03);
                    box-shadow: 0 0 18px rgba(59,130,246,0.3);
                }
            `}</style>
        </div>
    );
}

export default ChangePasswordPage;