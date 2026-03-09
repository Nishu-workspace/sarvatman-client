"use client";
import React, { useEffect, useState } from "react";
import api from "../../lib/api";
import { Package, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    const [stats, setStats] = useState({ products: 0, inquiries: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [productsRes, inquiriesRes] = await Promise.all([
                    api.get("/admin/getall"),
                    api.get("/admin/inquiries"),
                ]);
                setStats({
                    products: productsRes.data.length || productsRes.data.data?.length || 0,
                    inquiries: inquiriesRes.data.length || inquiriesRes.data.data?.length || 0,
                });
            } catch (err) {
                console.error("Failed to load dashboard stats", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div>Loading dashboard...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                    <div className="p-4 bg-amber-100 text-amber-600 rounded-full">
                        <Package size={32} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-700 font-bold uppercase tracking-wide">Total Products</p>
                        <p className="text-3xl font-bold text-slate-900">{stats.products}</p>
                    </div>
                    <Link href="/admin/products" className="ml-auto text-sm text-amber-600 font-medium hover:underline">
                        View All
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                    <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
                        <MessageSquare size={32} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-700 font-bold uppercase tracking-wide">Total Inquiries</p>
                        <p className="text-3xl font-bold text-slate-900">{stats.inquiries}</p>
                    </div>
                    <Link href="/admin/inquiries" className="ml-auto text-sm text-blue-600 font-medium hover:underline">
                        View All
                    </Link>
                </div>
            </div>
        </div>
    );
}
