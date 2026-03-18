"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../lib/api";
import { Trash2, Mail, X } from "lucide-react";

export default function AdminInquiriesPage() {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");

    // Reply Modal State (commented out — using mailto: for now)
    // const [replyModalOpen, setReplyModalOpen] = useState(false);
    // const [selectedInquiry, setSelectedInquiry] = useState(null);
    // const [replyMessage, setReplyMessage] = useState("");
    // const [sendingReply, setSendingReply] = useState(false);

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

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this inquiry?")) return;
        try {
            await api.delete(`/admin/inquiries/${id}`);
            setInquiries(inquiries.filter((inq) => inq._id !== id));
            toast.success("Inquiry deleted successfully");
        } catch (err) {
            console.error("Failed to delete inquiry", err);
            toast.error("Failed to delete inquiry");
        }
    };

    // Old reply modal handler (commented out — using mailto: for now)
    // const handleReplySubmit = async (e) => {
    //     e.preventDefault();
    //     if (!replyMessage.trim()) return;
    //     setSendingReply(true);
    //     try {
    //         await api.post(`/admin/inquiries/${selectedInquiry._id}/reply`, { replyMessage });
    //         setInquiries(
    //             inquiries.map((inq) => (inq._id === selectedInquiry._id ? { ...inq, status: "responded" } : inq))
    //         );
    //         toast.success("Reply sent successfully");
    //         setReplyModalOpen(false);
    //         setReplyMessage("");
    //         setSelectedInquiry(null);
    //     } catch (err) {
    //         console.error("Failed to send reply", err);
    //         toast.error("Failed to send reply");
    //     } finally {
    //         setSendingReply(false);
    //     }
    // };

    // const openReplyModal = (inq) => {
    //     if (!inq.customer?.email || inq.customer.email === "no-email@provided.com") {
    //         return toast.error("No valid email address provided for this inquiry.");
    //     }
    //     setSelectedInquiry(inq);
    //     setReplyMessage("");
    //     setReplyModalOpen(true);
    // };

    const filteredInquiries = inquiries.filter(
        (inq) => filter === "all" || inq.status === filter
    );

    if (loading) return <div>Loading inquiries...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Inquiries</h1>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                    <option value="all">All Inquiries</option>
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="responded">Responded</option>
                    <option value="closed">Closed</option>
                </select>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 text-sm uppercase tracking-wide">
                            <th className="p-4 font-bold">Date</th>
                            <th className="p-4 font-bold">Customer Details</th>
                            <th className="p-4 font-bold">Message</th>
                            <th className="p-4 font-bold tracking-tight">Status</th>
                            <th className="p-4 font-bold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInquiries.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-slate-700 font-medium">
                                    No inquiries found.
                                </td>
                            </tr>
                        ) : (
                            filteredInquiries.map((inq) => (
                                <tr key={inq._id} className="border-b border-slate-100 hover:bg-slate-50">
                                    <td className="p-4 text-sm text-slate-700 font-medium whitespace-nowrap">
                                        {new Date(inq.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <p className="font-bold text-slate-900">{inq.customer?.name}</p>
                                        <p className="text-sm text-slate-700">{inq.customer?.phone}</p>
                                        <p className="text-sm text-slate-700">{inq.customer?.email}</p>
                                        <p className="text-sm text-slate-700">{inq.customer?.company}</p>
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
                                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                                        {inq.customer?.email && inq.customer.email !== "no-email@provided.com" ? (
                                            <a
                                                href={`mailto:${inq.customer.email}?subject=Re: ${encodeURIComponent(inq.message || 'Your Inquiry to Sarvatman')}`}
                                                className="inline-block p-2 text-blue-600 hover:bg-blue-50 rounded"
                                                title="Reply via Email"
                                            >
                                                <Mail size={18} />
                                            </a>
                                        ) : (
                                            <span className="inline-block p-2 text-slate-300 cursor-not-allowed" title="No email provided">
                                                <Mail size={18} />
                                            </span>
                                        )}
                                        <button
                                            onClick={() => handleDelete(inq._id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                                            title="Delete Inquiry"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Old Reply Modal (commented out — using mailto: for now) */}
            {/* {replyModalOpen && selectedInquiry && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative">
                        <button
                            onClick={() => setReplyModalOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">
                            Reply to {selectedInquiry.customer?.name}
                        </h2>
                        <form onSubmit={handleReplySubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    To: {selectedInquiry.customer?.email}
                                </label>
                                <textarea
                                    className="w-full border border-slate-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[150px]"
                                    placeholder="Type your reply here..."
                                    value={replyMessage}
                                    onChange={(e) => setReplyMessage(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setReplyModalOpen(false)}
                                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded hover:bg-slate-50 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={sendingReply}
                                    className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-800 font-medium disabled:opacity-50"
                                >
                                    {sendingReply ? "Sending..." : "Send Reply"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )} */}
        </div>
    );
}
