import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, uploadProfilePicture } from "../services/profileService";
import type { Profile } from "../types/Profile";

function ProfilePage() {
    const [user, setUser] = useState<Profile | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await getProfile();
                setUser(data.data);
            } catch (error) {
                console.error(error);
            }
        };

        void loadProfile();
    }, []);

    const handleUpload = async () => {
        if (!selectedFile) return;

        try {
            await uploadProfilePicture(selectedFile);
            const updated = await getProfile();
            setUser(updated.data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-slate-400">
                Loading identity vault...
            </div>
        );
    }

    return (
        <div className="vault-bg">

            {/* ✨ Floating glow effects */}
            <div className="glow glow-1" />
            <div className="glow glow-2" />

            <div className="vault-card">

                {/* 🪪 Avatar */}
                <div className="avatar-ring">
                    <img
                        src={
                            user.profilePictureUrl
                                ? `http://localhost:8080${user.profilePictureUrl}`
                                : "/default-avatar.png"
                        }
                        alt="Profile"
                        className="avatar"
                    />
                </div>

                {/* 🏛️ Identity */}
                <h1 className="name">
                    {user.firstName} {user.lastName}
                </h1>

                <p className="role">{user.role}</p>

                {/* 📄 Info */}
                <div className="info">
                    <p><span>ID:</span> {user.studentId}</p>
                    <p><span>Email:</span> {user.email}</p>
                </div>

                {/* 📸 Upload */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setSelectedFile(file);
                    }}
                    className="file"
                />

                <button onClick={handleUpload} className="btn">
                    Upload New Identity Image
                </button>

                <button
                    onClick={() => navigate("/change-password")}
                    className="btn"
                    style={{ marginTop: "10px" }}
                >
                    Change Password
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

                .avatar-ring {
                    width: 120px;
                    height: 120px;
                    margin: 0 auto 15px auto;
                    border-radius: 50%;
                    padding: 3px;
                    background: linear-gradient(45deg, #fbbf24, #ec4899);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .avatar {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    object-fit: cover;
                    transition: 0.3s;
                }

                .avatar:hover {
                    transform: scale(1.05);
                }

                .name {
                    font-size: 22px;
                    font-weight: bold;
                    color: #fbbf24;
                    margin-bottom: 4px;
                }

                .role {
                    font-size: 12px;
                    color: #94a3b8;
                    letter-spacing: 1px;
                    margin-bottom: 16px;
                }

                .info {
                    text-align: left;
                    font-size: 13px;
                    color: #cbd5e1;
                    margin-bottom: 16px;
                    line-height: 1.6;
                }

                .info span {
                    color: #fbbf24;
                    font-weight: 600;
                }

                .file {
                    font-size: 12px;
                    margin-bottom: 12px;
                    color: #94a3b8;
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

export default ProfilePage;