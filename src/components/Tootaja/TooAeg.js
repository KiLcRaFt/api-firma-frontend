import React, { useState } from 'react';

const TooAeg = ({ workHours, onAdd, onUpdate, onDelete }) => {
    const [kuupaev, setKuupaev] = useState("");
    const [tooAlgus, setTooAlgus] = useState("");
    const [tooLypp, setTooLypp] = useState("");

    const [editId, setEditId] = useState(null); // ID редактируемой записи
    const [editKuupaev, setEditKuupaev] = useState(""); // Дата редактирования
    const [editTooAlgus, setEditTooAlgus] = useState(""); // Начало редактирования
    const [editTooLypp, setEditTooLypp] = useState(""); // Конец редактирования

    const hours = Array.isArray(workHours) ? workHours : [];

    return (
        <div className="max-w-3xl mx-auto p-5 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-5">Tööaeg</h2>

            {hours.length > 0 ? (
                <ul className="space-y-4">
                    {hours.map((hour) => (
                        <li key={hour.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-md">
                            <span className="text-lg">{hour.kuupaev}: {hour.too_algus} - {hour.too_lypp}</span>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => onDelete(hour.id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Kustuta
                                </button>
                                <button
                                    onClick={() => {
                                        setEditId(hour.id);
                                        setEditKuupaev(hour.kuupaev);
                                        setEditTooAlgus(hour.too_algus);
                                        setEditTooLypp(hour.too_lypp);
                                    }}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Muudama
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">Näidata ei ole tööaega.</p>
            )}

            {editId && (
                <div className="mt-5 p-5 bg-gray-50 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Töötundide muutmine</h3>
                    <input
                        type="date"
                        value={editKuupaev}
                        onChange={(e) => setEditKuupaev(e.target.value)}
                        className="w-full p-3 mb-3 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="time"
                        value={editTooAlgus}
                        onChange={(e) => setEditTooAlgus(e.target.value)}
                        className="w-full p-3 mb-3 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="time"
                        value={editTooLypp}
                        onChange={(e) => setEditTooLypp(e.target.value)}
                        className="w-full p-3 mb-3 border border-gray-300 rounded-lg"
                    />
                    <div className="flex space-x-4">
                        <button
                            onClick={() => onUpdate(editId, editKuupaev, editTooAlgus, editTooLypp)}
                            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            Salvesta
                        </button>
                        <button
                            onClick={() => setEditId(null)}
                            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                        >
                            Tühistamine
                        </button>
                    </div>
                </div>
            )}

            <h3 className="text-xl font-semibold mt-10 mb-4">Lisage töötunnid</h3>
            <input
                type="date"
                value={kuupaev}
                onChange={(e) => setKuupaev(e.target.value)}
                className="w-full p-3 mb-3 border border-gray-300 rounded-lg"
            />
            <input
                type="time"
                value={tooAlgus}
                onChange={(e) => setTooAlgus(e.target.value)}
                className="w-full p-3 mb-3 border border-gray-300 rounded-lg"
            />
            <input
                type="time"
                value={tooLypp}
                onChange={(e) => setTooLypp(e.target.value)}
                className="w-full p-3 mb-5 border border-gray-300 rounded-lg"
            />
            <button
                onClick={() => onAdd(kuupaev, tooAlgus, tooLypp)}
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Lisama
            </button>
        </div>
    );
};

export default TooAeg;
