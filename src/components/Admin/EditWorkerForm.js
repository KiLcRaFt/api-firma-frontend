import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditWorkerForm = ({ worker, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState({
        nimi: worker.nimi,
        perenimi: worker.perenimi,
        email: worker.email,
        telefoni_number: worker.telefoni_number,
        salasyna: '',
        is_admin: worker.is_admin || false,
        amet: worker.amet || '',
    });

    useEffect(() => {
        setFormData({
            nimi: worker.nimi,
            perenimi: worker.perenimi,
            email: worker.email,
            telefoni_number: worker.telefoni_number,
            salasyna: '',
            is_admin: worker.is_admin || false,
            amet: worker.amet || '',
        });
    }, [worker]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put('http://localhost:5095/Tootaja/Tootaja_muudmine', null, {
                params: {
                    tootajaId: worker.id,
                    nimi: formData.nimi,
                    perenimi: formData.perenimi,
                    email: formData.email,
                    telefoni_number: formData.telefoni_number,
                    salasyna: formData.salasyna,
                    is_admin: formData.is_admin,
                    amet: formData.amet,
                },
            });

            if (response.status === 204) {
                alert("Töötajate andmed on edukalt uuendatud!");
                onUpdate(); // Обновление данных
            }
        } catch (err) {
            console.error("Viga töötaja uuendamisel:", err);
            alert('Viga töötaja andmete uuendamisel.');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg relative">
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                    ✕
                </button>
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Muuda töötaja</h2>
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
                            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-black"
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
                            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-black"
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
                            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-black"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-lg font-medium text-gray-700" htmlFor="telefoni_number">Telefони номер</label>
                        <input
                            type="tel"
                            name="telefoni_number"
                            id="telefoni_number"
                            value={formData.telefoni_number}
                            onChange={handleChange}
                            required
                            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-black"
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
                            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-black"
                        />
                    </div>

                    <div className="space-y-2 flex items-center">
                        <input
                            type="checkbox"
                            name="is_admin"
                            checked={formData.is_admin}
                            onChange={() => setFormData({ ...formData, is_admin: !formData.is_admin })}
                            className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-lg font-medium text-gray-700">Roll (admin)</label>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-lg font-medium text-gray-700" htmlFor="amet">Amet</label>
                        <input
                            type="text"
                            name="amet"
                            id="amet"
                            value={formData.amet}
                            onChange={handleChange}
                            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-black"
                        />
                    </div>

                    <div className="flex justify-between space-x-4">
                        <button
                            type="submit"
                            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300"
                        >
                            Ajakohastamine
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="w-full py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all duration-300"
                        >
                            Tühista
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditWorkerForm;
