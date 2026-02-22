"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../lib/api";


export default function AdminInquiriesPage() {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchInquiries = async () => {
        try {
            const res = await api.get("/admin/inquiries");
            setInquiries(Array.isArray(res.data) ? res.data : res.data.data || []);
        } catch (err) {
            console.error("Failed to fetch inquiries", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await api.put(`/admin/inquiries/${id}`, { status: newStatus });
            setInquiries(
                inquiries.map((inq) => (inq._id === id ? { ...inq, status: newStatus } : inq))
            );
            toast.success("Inquiry status updated.");
        } catch (err) {
            console.error("Failed to update inquiry status", err);
            toast.error("Failed to update status");
        }
    };

    if (loading) return <div>Loading inquiries...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Inquiries</h1>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wide">
                            <th className="p-4 font-bold">Date</th>
                            <th className="p-4 font-bold">Customer Details</th>
                            <th className="p-4 font-bold">Message</th>
                            <th className="p-4 font-bold tracking-tight">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquiries.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-slate-500">
                                    No inquiries found.
                                </td>
                            </tr>
                        ) : (
                            inquiries.map((inq) => (
                                <tr key={inq._id} className="border-b border-slate-100 hover:bg-slate-50">
                                    <td className="p-4 text-sm text-slate-500 whitespace-nowrap">
                                        {new Date(inq.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <p className="font-bold text-slate-900">{inq.customer?.name}</p>
                                        <p className="text-sm text-slate-500">{inq.customer?.phone}</p>
                                        <p className="text-sm text-slate-500">{inq.customer?.email}</p>
                                        <p className="text-sm text-slate-500">{inq.customer?.company}</p>
                                    </td>
                                    <td className="p-4 text-sm text-slate-700 max-w-xs">{inq.message}</td>
                                    <td className="p-4 w-40">
                                        <select
                                            value={inq.status || "new"}
                                            onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                                            className={`p-2 rounded text-sm font-bold uppercase w-full border border-transparent hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 ${inq.status === 'responded' || inq.status === 'closed'
                                                ? 'bg-green-100 text-green-700'
                                                : inq.status === 'in_progress'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-amber-100 text-amber-700'
                                                }`}
                                        >
                                            <option value="new">New</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="responded">Responded</option>
                                            <option value="closed">Closed</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
