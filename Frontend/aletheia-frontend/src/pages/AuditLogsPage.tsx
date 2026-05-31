import {
    useEffect,
    useState
} from "react";

import {
    getAuditLogs
} from "../services/adminService";

import type {
    AuditLog
} from "../types/AuditLog";

function AuditLogsPage() {

    const [logs, setLogs] =
        useState<AuditLog[]>([]);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        const loadLogs =
            async () => {

                try {

                    const data =
                        await getAuditLogs();

                    setLogs(data.data);

                } catch (error) {

                    console.error(error);
                }
            };

        void loadLogs();

    }, []);

    const getRelativeTime =
        (dateString: string) => {

            const now =
                new Date();

            const date =
                new Date(dateString);

            const seconds =
                Math.floor(
                    (now.getTime() - date.getTime())
                    / 1000
                );

            const minutes =
                Math.floor(seconds / 60);

            const hours =
                Math.floor(minutes / 60);

            const days =
                Math.floor(hours / 24);

            if (days > 0) {
                return `${days} day${days > 1 ? "s" : ""} ago`;
            }

            if (hours > 0) {
                return `${hours} hour${hours > 1 ? "s" : ""} ago`;
            }

            if (minutes > 0) {
                return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
            }

            return "Just now";
        };

    const filteredLogs =
        logs.filter(log =>

            log.user
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )

            ||

            log.action
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )

            ||

            log.details
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    const todayLogs =
        logs.filter(log => {

            const today =
                new Date()
                    .toDateString();

            return (
                new Date(log.createdAt)
                    .toDateString()
                === today
            );

        }).length;

    const uniqueUsers =
        new Set(
            logs.map(log => log.user)
        ).size;

    const getBadgeColor =
        (action: string) => {

            const text =
                action.toLowerCase();

            if (
                text.includes("delete")
                ||
                text.includes("archive")
            ) {

                return `
                    bg-pink-500/20
                    text-pink-300
                    border-pink-500/30
                `;
            }

            if (
                text.includes("update")
                ||
                text.includes("edit")
            ) {

                return `
                    bg-amber-500/20
                    text-amber-300
                    border-amber-500/30
                `;
            }

            return `
                bg-emerald-500/20
                text-emerald-300
                border-emerald-500/30
            `;
        };

    return (

        <div
            className="
                min-h-screen
                bg-slate-950
                text-white
                p-8
            "
        >

            {/* Header */}

            <div className="mb-8">

                <h1
                    className="
                        text-5xl
                        font-bold
                        text-amber-400
                        mb-2
                    "
                >
                    Audit Ledger
                </h1>

                <p
                    className="
                        text-slate-400
                    "
                >
                    Track administrator actions
                    and system activities.
                </p>

            </div>

            {/* Stats */}

            <div
                className="
                    grid
                    md:grid-cols-3
                    gap-6
                    mb-8
                "
            >

                <div
                    className="
                        bg-slate-900
                        border
                        border-amber-500/10
                        rounded-2xl
                        p-6
                    "
                >

                    <p className="text-slate-400">
                        Total Logs
                    </p>

                    <h2
                        className="
                            text-4xl
                            font-bold
                            text-amber-400
                        "
                    >
                        {logs.length}
                    </h2>

                </div>

                <div
                    className="
                        bg-slate-900
                        border
                        border-amber-500/10
                        rounded-2xl
                        p-6
                    "
                >

                    <p className="text-slate-400">
                        Today's Activity
                    </p>

                    <h2
                        className="
                            text-4xl
                            font-bold
                            text-emerald-400
                        "
                    >
                        {todayLogs}
                    </h2>

                </div>

                <div
                    className="
                        bg-slate-900
                        border
                        border-amber-500/10
                        rounded-2xl
                        p-6
                    "
                >

                    <p className="text-slate-400">
                        Active Users
                    </p>

                    <h2
                        className="
                            text-4xl
                            font-bold
                            text-sky-400
                        "
                    >
                        {uniqueUsers}
                    </h2>

                </div>

            </div>

            {/* Search */}

            <input
                type="text"
                placeholder="Search audit logs..."
                value={search}
                onChange={(e) =>
                    setSearch(
                        e.target.value
                    )
                }
                className="
                    w-full
                    bg-slate-900
                    border
                    border-slate-700
                    rounded-xl
                    p-4
                    mb-8
                    focus:outline-none
                    focus:border-amber-500
                "
            />

            {/* Ledger */}

            <div
                className="
                    space-y-4
                "
            >

                {filteredLogs.map(log => (

                    <div
                        key={log.id}
                        className="
                            bg-slate-900
                            border
                            border-slate-800
                            rounded-2xl
                            p-5
                            hover:border-amber-500/30
                            hover:-translate-y-1
                            transition
                        "
                    >

                        <div
                            className="
                                flex
                                justify-between
                                items-start
                                gap-4
                            "
                        >

                            <div>

                                <h3
                                    className="
                                        text-lg
                                        font-semibold
                                        text-white
                                    "
                                >
                                    {log.user}
                                </h3>

                                <p
                                    className="
                                        text-slate-400
                                        text-sm
                                        mt-1
                                    "
                                >
                                    {log.details}
                                </p>

                            </div>

                            <span
                                className={`
                                    px-3
                                    py-1
                                    rounded-full
                                    text-xs
                                    font-bold
                                    border
                                    ${getBadgeColor(log.action)}
                                `}
                            >
                                {log.action}
                            </span>

                        </div>

                        <div
                            className="
                                flex
                                justify-between
                                items-center
                                mt-4
                                pt-4
                                border-t
                                border-slate-800
                            "
                        >

                            <span
                                className="
                                    text-xs
                                    text-slate-500
                                "
                            >
                                {new Date(
                                    log.createdAt
                                ).toLocaleString()}
                            </span>

                            <span
                                className="
                                    text-xs
                                    text-amber-400
                                "
                            >
                                {getRelativeTime(
                                    log.createdAt
                                )}
                            </span>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default AuditLogsPage;