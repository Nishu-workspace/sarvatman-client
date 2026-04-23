"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, MessageSquare, LogOut, Menu } from "lucide-react";
import api from "../../lib/api";
import toast from "react-hot-toast";

export default function AdminLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            if (pathname === "/admin/login") {
                setIsChecking(false);
                return;
            }

            const token = localStorage.getItem("adminToken");
            if (!token) {
                router.push("/admin/login");
                return;
            }

            try {
                // We'll verify the token by trying to fetch inquiries.
                // If the token is invalid/expired, the API should return 401/403.
                await api.get("/admin/inquiries");
                setIsAuthenticated(true);
            } catch (err) {
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    localStorage.removeItem("adminToken");
                    toast.error("Session expired. Please login again.");
                    router.push("/admin/login");
                } else {
                    // Let them in anyway if it's a network error or 500
                    setIsAuthenticated(true);
                }
            } finally {
                setIsChecking(false);
            }
        };

        verifyToken();
    }, [pathname, router]);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
    };

    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    if (isChecking || (!isAuthenticated && pathname !== "/admin/login")) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-slate-600 font-medium">Verifying access...</div>
            </div>
        );
    }

    const navItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Products", href: "/admin/products", icon: Package },
        { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex text-slate-900">
            {/* Sidebar */}
            <aside
                className={`${sidebarOpen ? "w-64" : "w-20"
                    } bg-slate-900 text-white transition-all duration-300 flex flex-col`}
            >
                <div className="p-4 flex items-center justify-between border-b border-slate-800">
                    <span className={`font-bold text-xl ${sidebarOpen ? "block" : "hidden"}`}>Admin</span>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white">
                        <Menu size={24} />
                    </button>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 p-3 rounded transition-colors ${isActive ? "bg-amber-500 text-slate-900" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                    }`}
                            >
                                <item.icon size={20} />
                                <span className={`${sidebarOpen ? "block" : "hidden"} font-medium`}>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 p-3 w-full text-left rounded hover:bg-slate-800 transition-colors text-red-400 hover:text-red-300"
                    >
                        <LogOut size={20} />
                        <span className={`${sidebarOpen ? "block" : "hidden"} font-medium`}>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow-sm border-b border-slate-200 p-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900">Sarvatman Dashboard</h2>
                    <div className="text-sm font-medium text-slate-700">Welcome, Admin</div>
                </header>
                <main className="p-6 flex-1 overflow-auto bg-slate-50">{children}</main>
            </div>
        </div>
    );
}
