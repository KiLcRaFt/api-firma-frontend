import React, { useState } from 'react';
import axios from 'axios';

const AddWorkerForm = ({ onWorkerAdded }) => {
    const [formData, setFormData] = useState({
        nimi: '',
        perenimi: '',
        email: '',
        telefoni_number: '',
        salasyna: '',
        is_admin: false,
        amet: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5095/Tootaja/Tootaja_lisamine', null, {
                params: formData
            });
            alert('Töötaja edukalt lisatud!');
            onWorkerAdded(); // Nimekirja uuendamiseks kutsuge vanemmeetodit
            setFormData({
                nimi: '',
                perenimi: '',
                email: '',
                telefoni_number: '',
                salasyna: '',
                is_admin: false,
                amet: ''
            });
        } catch (err) {
            console.error('Viga töötaja lisamisel:', err.response?.data || err.message);
            alert('Viga töötaja lisamisel.');
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center py-12">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Uue töötaja lisamine</h2>
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="space-y-2">
                        <label className="block text-lg font-medium text-gray-700" htmlFor="nimi">Nimi</label>
                        <input
                            type="text"
                            name="nimi"
                            id="nimi"
                            value={formData.nimi}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-lg font-medium text-gray-700" htmlFor="perenimi">Perenimi</label>
                        <input
                            type="text"
                            name="perenimi"
                            id="perenimi"
                            value={formData.perenimi}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-lg font-medium text-gray-700" htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-lg font-medium text-gray-700" htmlFor="telefoni_number">Telefoni number</label>
                        <input
                            type="tel"
                            name="telefoni_number"
                            id="telefoni_number"
                            value={formData.telefoni_number}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-lg font-medium text-gray-700" htmlFor="salasyna">Salasõna</label>
                        <input
                            type="password"
                            name="salasyna"
                            id="salasyna"
                            value={formData.salasyna}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-lg font-medium text-gray-700 flex items-center">
                            <input
                                type="checkbox"
                                name="is_admin"
                                checked={formData.is_admin}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Administraator
                        </label>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-lg font-medium text-gray-700" htmlFor="amet">Amet</label>
                        <input
                            type="text"
                            name="amet"
                            id="amet"
                            value={formData.amet}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                        />
                    </div>

                    <div className="space-y-4">
                        <button
                            type="submit"
                            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
                        >
                            Lisa
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddWorkerForm;
