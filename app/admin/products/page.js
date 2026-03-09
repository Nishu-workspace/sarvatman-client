"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import api from "../../../lib/api";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const res = await api.get("/admin/getall");
            // backend returns array directly or inside data
            setProducts(Array.isArray(res.data) ? res.data : res.data.data || []);
        } catch (err) {
            console.error("Failed to fetch admin products", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await api.delete(`/admin/products/${id}`);
                setProducts(products.filter((p) => p._id !== id));
                toast.success("Product deleted successfully!");
            } catch (err) {
                console.error("Failed to delete product", err);
                toast.error("Failed to delete product");
            }
        }
    };

    if (loading) return <div>Loading products...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Products Management</h1>
                <Link
                    href="/admin/products/new"
                    className="bg-amber-500 text-black px-4 py-2 rounded font-bold hover:bg-amber-400 transition flex items-center gap-2"
                >
                    <Plus size={18} /> Add Product
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 text-sm uppercase tracking-wide">
                            <th className="p-4 font-bold">Name</th>
                            <th className="p-4 font-bold">Category</th>
                            <th className="p-4 font-bold">Status</th>
                            <th className="p-4 font-bold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-slate-700 font-medium">
                                    No products found. Click "Add Product" to create one.
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product._id} className="border-b border-slate-100 hover:bg-slate-50">
                                    <td className="p-4 font-medium text-slate-900">{product.name}</td>
                                    <td className="p-4 text-slate-600">{product.category || "N/A"}</td>
                                    <td className="p-4">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-bold uppercase ${product.status === "published"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-amber-100 text-amber-700"
                                                }`}
                                        >
                                            {product.status || "draft"}
                                        </span>
                                    </td>
                                    <td className="p-4 flex items-center justify-end gap-3 text-slate-700">
                                        <Link href={`/admin/products/${product._id}/edit`} className="hover:text-amber-600">
                                            <Edit size={18} />
                                        </Link>
                                        <button onClick={() => handleDelete(product._id)} className="hover:text-red-600">
                                            <Trash2 size={18} />
                                        </button>
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
