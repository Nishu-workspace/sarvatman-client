"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, MessageSquare, LogOut, Menu } from "lucide-react";

export default function AdminLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            router.push("/admin/login");
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
    };

    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    if (!isAuthenticated) return null; // Avoid flashing the layout

    const navItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Products", href: "/admin/products", icon: Package },
        { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
    ];

    return (
        <div className="min-h-screen bg-slate-100 flex">
            {/* Sidebar */}
            <aside
                className={`${sidebarOpen ? "w-64" : "w-20"
                    } bg-slate-900 text-white transition-all duration-300 flex flex-col`}
            >
                <div className="p-4 flex items-center justify-between border-b border-slate-800">
                    <span className={`font-bold text-xl ${sidebarOpen ? "block" : "hidden"}`}>Admin</span>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-slate-800 rounded">
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
                                className={`flex items-center gap-3 p-3 rounded transition-colors ${isActive ? "bg-amber-500 text-black" : "hover:bg-slate-800"
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
                        className="flex items-center gap-3 p-3 w-full text-left rounded hover:bg-slate-800 transition-colors text-red-400"
                    >
                        <LogOut size={20} />
                        <span className={`${sidebarOpen ? "block" : "hidden"} font-medium`}>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow-sm p-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800">Sarvatman Dashboard</h2>
                    <div className="text-sm text-slate-500">Welcome, Admin</div>
                </header>
                <main className="p-6 flex-1 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
