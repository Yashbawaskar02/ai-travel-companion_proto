import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [city, setCity] = useState('');
    const [days, setDays] = useState('');
    const [itinerary, setItinerary] = useState('');
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
            return;
        }
        try {
            const parsed = JSON.parse(storedUser);
            setUserName(parsed?.name || 'User');
        } catch {
            setUserName('User');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleGenerateItinerary = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setItinerary('');
        try {
            const res = await axios.post('http://localhost:5000/api/travel/plan', { city, days: Number(days) });
            setItinerary(res.data.itinerary);
        } catch (err: any) {
            const msg = err?.response?.data?.error || 'Failed to generate itinerary';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <nav className="w-full flex justify-between items-center bg-blue-500 p-4 text-white">
                <h1 className="text-xl font-bold">Travel Planner</h1>
                <div className="flex items-center gap-4">
                    <span className="hidden sm:inline">Welcome, {userName}</span>
                    <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">Logout</button>
                </div>
            </nav>
            <div className="mt-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-2">Welcome, {userName}</h2>
                <p className="mb-4 text-gray-700">Generate Your Itinerary</p>
                {error && <p className="text-red-600 mb-2">{error}</p>}
                <form className="flex flex-col" onSubmit={handleGenerateItinerary}>
                    <input
                        type="text"
                        placeholder="City Name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="mb-4 p-2 border rounded"
                    />
                    <input
                        type="number"
                        placeholder="Number of Days"
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                        className="mb-4 p-2 border rounded"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 disabled:opacity-60 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {loading ? 'Generating...' : 'Generate Itinerary'}
                    </button>
                </form>
                {itinerary && (
                    <div className="mt-6 p-4 border rounded shadow-md bg-gray-100">
                        <h3 className="font-semibold">Your Itinerary:</h3>
                        <p>{itinerary}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;