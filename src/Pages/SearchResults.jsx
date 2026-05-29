import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "../config.js";

const SearchResults = () => {
    const [results, setResults] = useState({ notices: [], events: [], teachers: [] });
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search).get("q");

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API_BASE_URL}/api/search?q=${query}`);
                const data = await res.json();
                setResults(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        if (query) fetchAllData();
    }, [query]);

    if (loading) return <div className="p-20 text-center text-2xl font-bold text-blue-600 animate-pulse">Searching Everything... 🔍</div>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Results for: <span className="text-blue-600">"{query}"</span></h1>

            {/* Category: Notices */}
            {results.notices.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">📢 Notices & News</h2>
                    <div className="grid gap-4">
                        {results.notices.map(n => (
                            <div key={n._id} className="p-4 bg-white shadow rounded-xl border-l-4 border-orange-500">
                                <h3 className="font-bold">{n.title}</h3>
                                <p className="text-sm text-gray-600">{n.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Category: Teachers */}
            {results.teachers.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-xl font-bold text-green-600 mb-4 flex items-center gap-2">👨‍🏫 Teachers & Staff</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {results.teachers.map(t => (
                            <div key={t._id} className="p-4 bg-white shadow rounded-xl flex items-center gap-4 border border-green-100">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-xl">👤</div>
                                <div>
                                    <h3 className="font-bold">{t.name}</h3>
                                    <p className="text-xs text-gray-500">{t.subject} Specialist</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Empty State */}
            {results.notices.length === 0 && results.events.length === 0 && results.teachers.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-3xl">
                    <p className="text-gray-400 text-6xl mb-4">📭</p>
                    <p className="text-xl text-gray-500 italic">Hume kuch nahi mila. Dubara koshish karein!</p>
                </div>
            )}
        </div>
    );
};

export default SearchResults;