"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../../../../lib/api";

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        category: "",
        description: "",
        imageUrl: "",
        brochureUrl: "",
        status: "draft",
        features: [""],
        displaySpecs: [{ key: "", value: "" }],
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadingBrochure, setUploadingBrochure] = useState(false);

    const handleFileUpload = async (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        const setUploading = type === "image" ? setUploadingImage : setUploadingBrochure;
        const fieldName = type === "image" ? "imageUrl" : "brochureUrl";

        const formDataFile = new FormData();
        formDataFile.append("file", file);

        try {
            setUploading(true);
            const res = await api.post("/upload", formDataFile, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (res.data.success) {
                setFormData(prev => ({ ...prev, [fieldName]: res.data.url }));
                toast.success(`${type === "image" ? "Image" : "Brochure"} uploaded successfully!`);
            }
        } catch (err) {
            console.error(`Failed to upload ${type}`, err);
            toast.error(`Failed to upload ${type}`);
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Fetch all products to find the one by ID
                const allRes = await api.get("/admin/getall");
                const products = Array.isArray(allRes.data) ? allRes.data : allRes.data.data;
                
                // Use string comparison for ID to avoid type mismatches
                const product = products.find((p) => String(p._id) === String(id));

                if (product) {
                    // Helper to convert object/map back to array of {key, value}
                    const parseSpecs = (specs) => {
                        if (!specs || typeof specs !== "object" || Object.keys(specs).length === 0) return [{ key: "", value: "" }];
                        return Object.entries(specs).map(([key, value]) => ({ key, value }));
                    };

                    setFormData({
                        name: product.name || "",
                        slug: product.slug || "",
                        category: product.category || "",
                        description: product.description || "",
                        imageUrl: product.imageUrl || "",
                        brochureUrl: product.brochureUrl || "",
                        status: product.status || "draft",
                        features: Array.isArray(product.features) && product.features.length > 0 ? product.features : [""],
                        displaySpecs: parseSpecs(product.displaySpecs),
                    });
                }
            } catch (err) {
                console.error("Failed to fetch product", err);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const addFeature = () => {
        setFormData({ ...formData, features: [...formData.features, ""] });
    };

    const removeFeature = (index) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeatures });
    };

    // Generic handler for specs arrays (displaySpecs, allSpecs)
    const handleSpecChange = (type, index, field, value) => {
        const newSpecs = [...formData[type]];
        newSpecs[index][field] = value;
        setFormData({ ...formData, [type]: newSpecs });
    };

    const addSpec = (type) => {
        setFormData({ ...formData, [type]: [...formData[type], { key: "", value: "" }] });
    };

    const removeSpec = (type, index) => {
        const newSpecs = formData[type].filter((_, i) => i !== index);
        setFormData({ ...formData, [type]: newSpecs });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        // Convert array of {key, value} objects back to a Map/Object for the backend
        const formatSpecs = (specsArray) => {
            return specsArray.reduce((acc, curr) => {
                if (curr.key && curr.value) acc[curr.key] = curr.value;
                return acc;
            }, {});
        };

        const payload = {
            ...formData,
            features: formData.features.filter(f => f.trim() !== ""),
            displaySpecs: formatSpecs(formData.displaySpecs),
        };

        try {
            await api.put(`/admin/products/${id}`, payload);
            toast.success("Product updated successfully!");
            router.push("/admin/products");
        } catch (err) {
            console.error("Failed to update product", err);
            toast.error(err.response?.data?.message || "Failed to update product");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div>Loading product...</div>;

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6 flex items-center gap-4">
                <Link href="/admin/products" className="p-2 bg-white rounded-full shadow-sm hover:bg-slate-50 transition">
                    <ArrowLeft size={20} className="text-slate-600" />
                </Link>
                <h1 className="text-2xl font-bold text-slate-900">Edit Product</h1>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-900 mb-2">Product Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded p-2 focus:ring-2 focus:ring-amber-500 outline-none text-slate-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-900 mb-2">Slug <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="slug"
                                required
                                value={formData.slug}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded p-2 focus:ring-2 focus:ring-amber-500 outline-none text-slate-900"
                            />
                        </div>
                    </div>



                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-900 mb-2">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded p-2 focus:ring-2 focus:ring-amber-500 outline-none text-slate-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-900 mb-2">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded p-2 focus:ring-2 focus:ring-amber-500 outline-none bg-white text-slate-900"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-900 mb-2">Product Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, "image")}
                                className="w-full border border-slate-300 rounded p-2 focus:ring-2 focus:ring-amber-500 outline-none text-slate-900 bg-white"
                                disabled={uploadingImage}
                            />
                            {uploadingImage && <p className="text-sm text-slate-500 mt-1">Uploading...</p>}
                            {formData.imageUrl && (
                                <div className="mt-2">
                                    <img src={formData.imageUrl} alt="Preview" className="h-32 object-contain border border-slate-200 rounded" />
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-900 mb-2">Brochure (PDF)</label>
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => handleFileUpload(e, "brochure")}
                                className="w-full border border-slate-300 rounded p-2 focus:ring-2 focus:ring-amber-500 outline-none text-slate-900 bg-white"
                                disabled={uploadingBrochure}
                            />
                            {uploadingBrochure && <p className="text-sm text-slate-500 mt-1">Uploading...</p>}
                            {formData.brochureUrl && (
                                <div className="mt-2 text-sm text-slate-600">
                                    Current Brochure: <a href={formData.brochureUrl} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 underline">View PDF</a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-900 mb-2">Description</label>
                        <textarea
                            name="description"
                            rows="5"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border border-slate-300 rounded p-2 focus:ring-2 focus:ring-amber-500 outline-none"
                        ></textarea>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-bold text-slate-900">Features</label>
                            <button
                                type="button"
                                onClick={addFeature}
                                className="text-xs bg-slate-200 text-slate-900 px-3 py-1 rounded font-bold hover:bg-slate-300 transition"
                            >
                                + Add Feature
                            </button>
                        </div>
                        {formData.features.map((feature, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                                    className="flex-1 border border-slate-300 rounded p-2 focus:ring-2 focus:ring-amber-500 outline-none text-slate-900"
                                    placeholder="e.g. High precision sensor..."
                                />
                                {formData.features.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeFeature(index)}
                                        className="bg-red-50 text-red-600 px-3 py-2 rounded hover:bg-red-100 font-bold"
                                    >
                                        X
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Display Specs */}
                    <div className="pt-4 border-t border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-bold text-slate-900">Display (Key Highlight) Specs</label>
                            <button
                                type="button"
                                onClick={() => addSpec("displaySpecs")}
                                className="text-xs bg-slate-200 text-slate-900 px-3 py-1 rounded font-bold hover:bg-slate-300 transition"
                            >
                                + Add Spec
                            </button>
                        </div>
                        {formData.displaySpecs.map((spec, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={spec.key}
                                    onChange={(e) => handleSpecChange("displaySpecs", index, "key", e.target.value)}
                                    className="w-1/3 border border-slate-300 rounded p-2 focus:ring-2 focus:ring-amber-500 outline-none text-slate-900"
                                    placeholder="e.g. Engine"
                                />
                                <input
                                    type="text"
                                    value={spec.value}
                                    onChange={(e) => handleSpecChange("displaySpecs", index, "value", e.target.value)}
                                    className="flex-1 border border-slate-300 rounded p-2 focus:ring-2 focus:ring-amber-500 outline-none"
                                    placeholder="e.g. 74 HP @ 2200 RPM"
                                />
                                {formData.displaySpecs.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeSpec("displaySpecs", index)}
                                        className="bg-red-50 text-red-600 px-3 py-2 rounded hover:bg-red-100 font-bold"
                                    >
                                        X
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-100">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-slate-900 text-white font-bold py-2 px-6 rounded hover:bg-slate-800 transition disabled:opacity-50"
                        >
                            {submitting ? "Saving..." : "Update Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
