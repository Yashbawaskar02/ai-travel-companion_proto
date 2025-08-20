import React from 'react';

const LandingPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-center text-blue-600">AI Travel Companion</h1>
            <p className="mt-4 text-lg text-center text-gray-700">
                Your personal assistant for planning the perfect trip.
            </p>
            <a href="/register" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                Get Started
            </a>
        </div>
    );
};

export default LandingPage;