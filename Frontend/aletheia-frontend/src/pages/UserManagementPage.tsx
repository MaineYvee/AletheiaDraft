import {
    useEffect,
    useState
} from "react";

import {
    getUsers
} from "../services/userService";

import type {
    User
} from "../types/User";

function UserManagementPage() {

    const [users, setUsers] =
        useState<User[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        const fetchUsers = async () => {

            try {

                const response =
                    await getUsers();

                setUsers(response.data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);
            }
        };

        void fetchUsers();

    }, []);

    if (loading) {

        return (
            <div className="p-8 text-slate-300">
                Loading users...
            </div>
        );
    }

    const totalUsers =
        users.length;

    const admins =
        users.filter(
            u => u.role === "ADMIN"
        ).length;

    const students =
        users.filter(
            u => u.role !== "ADMIN"
        ).length;

    const activeUsers =
        users.filter(
            u => u.enabled
        ).length;

    const filteredUsers =
        users.filter(user =>

            `${user.firstName} ${user.lastName}`
.toLowerCase()
        .includes(search.toLowerCase())

    ||

    user.email
        .toLowerCase()
        .includes(search.toLowerCase())

    ||

    user.studentId
        .toLowerCase()
        .includes(search.toLowerCase())
);

    return (

        <div className="p-8 min-h-screen bg-slate-950 text-white">

            {/* HEADER */}
            <h1 className="text-4xl font-bold text-amber-400 mb-6">
                User Management
            </h1>

            {/* STATS */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">

                <StatCard title="Total Users" value={totalUsers} />
                <StatCard title="Students" value={students} />
                <StatCard title="Admins" value={admins} />
                <StatCard title="Active Users" value={activeUsers} />

            </div>

            {/* SEARCH */}
            <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
                className="
                    w-full
                    mb-6
                    p-4
                    rounded-xl
                    bg-slate-900
                    border
                    border-slate-700
                    focus:border-amber-500
                    outline-none
                "
            />

            {/* TABLE */}
            <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">

                <table className="w-full text-left">

                    <thead className="bg-slate-950 text-slate-300">

                    <tr>

                        <th className="p-4">ID</th>
                        <th className="p-4">Student ID</th>
                        <th className="p-4">Full Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Role</th>
                        <th className="p-4">Status</th>

                    </tr>

                    </thead>

                    <tbody>

                    {filteredUsers.map((user) => (

                        <tr
                            key={user.id}
                            className="
                                    border-t
                                    border-slate-800
                                    hover:bg-slate-800
                                    transition
                                "
                        >

                            <td className="p-4">
                                {user.id}
                            </td>

                            <td className="p-4 text-slate-300">
                                {user.studentId}
                            </td>

                            <td className="p-4 font-medium">
                                {user.firstName} {user.lastName}
                            </td>

                            <td className="p-4 text-slate-300">
                                {user.email}
                            </td>

                            <td className="p-4">

                                    <span
                                        className={
                                            user.role === "ADMIN"
                                                ? "px-3 py-1 rounded-full bg-amber-500/20 text-amber-300"
                                                : "px-3 py-1 rounded-full bg-sky-500/20 text-sky-300"
                                        }
                                    >
                                        {user.role}
                                    </span>

                            </td>

                            <td className="p-4">

                                    <span
                                        className={
                                            user.enabled
                                                ? "px-3 py-1 rounded-full bg-green-500/20 text-green-300"
                                                : "px-3 py-1 rounded-full bg-pink-500/20 text-pink-300"
                                        }
                                    >
                                        {user.enabled ? "Active" : "Disabled"}
                                    </span>

                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

/* =========================
   STAT CARD COMPONENT
========================= */
function StatCard({
                      title,
                      value
                  }: {
    title: string;
    value: number;
}) {
    return (
        <div className="
            bg-slate-900
            border
            border-amber-500/10
            rounded-2xl
            p-5
            hover:border-amber-500/30
            transition
        ">
            <p className="text-slate-400 text-sm">
                {title}
            </p>

            <h2 className="text-4xl font-bold text-amber-400">
                {value}
            </h2>
        </div>
    );
}

export default UserManagementPage;