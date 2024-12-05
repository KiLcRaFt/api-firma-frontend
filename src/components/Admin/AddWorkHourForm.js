import React, { useState } from 'react';
import axios from 'axios';

const AddWorkHourForm = ({ employees, onWorkHourAdded }) => {
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('Kasutaja ei ole volitatud');
            return;
        }

        if (!selectedEmployeeId || !date || !startTime || !endTime) {
            alert('Palun täitke kõik väljad');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5095/admin/tooaeg_lisamine', {
                TootajaId: selectedEmployeeId,
                kuupaev: date,
                tooAlgus: startTime,
                tooLypp: endTime,
            }, {
                headers: { UserId: userId },
            });

            console.log('Lisatud töötund:', response.data);
            onWorkHourAdded();
        } catch (err) {
            console.error('Viga töötunni lisamisel:', err);
            alert('Viga töötunni lisamisel');
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center py-12">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Lisa töötunnid</h2>
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label htmlFor="employee" className="block text-lg font-medium text-gray-700">Töötaja</label>
                        <select
                            id="employee"
                            value={selectedEmployeeId}
                            onChange={(e) => setSelectedEmployeeId(e.target.value)}
                            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        >
                            <option value="">Valige töötaja</option>
                            {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.nimi + " " + employee.perenimi}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-lg font-medium text-gray-700">Kuupäev</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="startTime" className="block text-lg font-medium text-gray-700">Algusaeg</label>
                        <input
                            type="time"
                            id="startTime"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="endTime" className="block text-lg font-medium text-gray-700">Lõpp aeg</label>
                        <input
                            type="time"
                            id="endTime"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
                        >
                            Lisa töötund
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddWorkHourForm;
