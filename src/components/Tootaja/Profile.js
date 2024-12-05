import React from 'react';

const Profile = ({ data }) => {
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Konto</h2>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="font-medium text-lg text-gray-600">Nimi:</span>
                    <span className="text-lg text-gray-800">{data.name}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-medium text-lg text-gray-600">Email:</span>
                    <span className="text-lg text-gray-800">{data.email}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-medium text-lg text-gray-600">Seisukoht tööl:</span>
                    <span className="text-lg text-gray-800">{data.position}</span>
                </div>
            </div>

            <div className="mt-6">
                <button className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
                    Konto muutmine
                </button>
            </div>
        </div>
    );
};

export default Profile;
