import {
    useState
} from "react";

import {
    Outlet
} from "react-router-dom";

import Sidebar
    from "../components/Sidebar";

function DashboardLayout() {

    const [collapsed,
        setCollapsed] =
        useState(false);

    return (

        <div
            className="
                flex
                min-h-screen
                bg-slate-900
                text-white
            "
        >

            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <main
                className={`
                    flex-1
                    transition-all
                    duration-300
                    p-8
                `}
            >

                <Outlet />

            </main>

        </div>

    );
}

export default DashboardLayout;