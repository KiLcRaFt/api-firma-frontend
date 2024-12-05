import React, { useState } from "react";

const WorkHoursTable = ({ workHours, tootajad, onDelete, onUpdate }) => {
    const [editingWorkHour, setEditingWorkHour] = useState(null);
    const [updatedWorkHourData, setUpdatedWorkHourData] = useState({
        kuupaev: "",
        tooAlgus: "",
        tooLypp: "",
    });

    const handleUpdateClick = (workHour) => {
        setEditingWorkHour(workHour.id);
        setUpdatedWorkHourData({
            kuupaev: workHour.kuupaev,
            tooAlgus: workHour.tooAlgus,
            tooLypp: workHour.tooLypp,
        });
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdatedWorkHourData({
            ...updatedWorkHourData,
            [name]: value,
        });
    };

    const handleUpdateSubmit = async (workHourId) => {
        const workHour = workHours.find((wh) => wh.id === workHourId);
        if (!workHour) {
            console.error("Work hour not found.");
            return;
        }

        const updatedWorkData = {
            ...updatedWorkHourData,
            tootajaId: workHour.tootajaId,
        };

        try {
            await onUpdate(workHourId, updatedWorkData);
            setEditingWorkHour(null);
        } catch (err) {
            console.error("Error updating work hour:", err);
        }
    };

    const formatTime = (time) => {
        if (!time) return "";
        const [hours, minutes] = time.split(":");
        return `${hours}:${minutes}`;
    };

    if (!workHours || workHours.length === 0) {
        return <p className="text-center text-gray-500">Загрузка рабочих часов...</p>;
    }

    if (!tootajad || tootajad.length === 0) {
        return <p className="text-center text-gray-500">Загрузка сотрудников...</p>;
    }

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            {editingWorkHour ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Tööaja ajakohastamine
                    </h3>
                    <label className="block mb-4">
                        <span className="text-gray-700">Kuupäev:</span>
                        <input
                            type="date"
                            name="kuupaev"
                            value={updatedWorkHourData.kuupaev}
                            onChange={handleUpdateChange}
                            className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-700">Algus:</span>
                        <input
                            type="time"
                            name="tooAlgus"
                            value={updatedWorkHourData.tooAlgus}
                            onChange={handleUpdateChange}
                            className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-700">Lõpp:</span>
                        <input
                            type="time"
                            name="tooLypp"
                            value={updatedWorkHourData.tooLypp}
                            onChange={handleUpdateChange}
                            className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        />
                    </label>
                    <div className="flex gap-4">
                        <button
                            onClick={() => handleUpdateSubmit(editingWorkHour)}
                            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all"
                        >
                            Salvesta
                        </button>
                        <button
                            onClick={() => setEditingWorkHour(null)}
                            className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition-all"
                        >
                            Tühista
                        </button>
                    </div>
                </div>
            ) : (
                <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="p-4 text-left">Töötaja</th>
                        <th className="p-4 text-left">Kuupäev</th>
                        <th className="p-4 text-left">Algus</th>
                        <th className="p-4 text-left">Lõpp</th>
                        <th className="p-4 text-left">Tegevused</th>
                    </tr>
                    </thead>
                    <tbody>
                    {workHours.map((workHour) => {
                        const employee = tootajad.find((emp) => emp.id === workHour.tootajaId);

                        return (
                            <tr
                                key={workHour.id}
                                className="border-b hover:bg-gray-100 transition-all text-black"
                            >
                                <td className="p-4">
                                    {employee
                                        ? `${employee.nimi} ${employee.perenimi}`
                                        : "Tundmatu töötaja"}
                                </td>
                                <td className="p-4">
                                    {new Date(workHour.kuupaev).toLocaleDateString()}
                                </td>
                                <td className="p-4 text-black">{formatTime(workHour.tooAlgus)}</td>
                                <td className="p-4 text-black">{formatTime(workHour.tooLypp)}</td>
                                <td className="p-4 flex gap-2">
                                    <button
                                        onClick={() => onDelete(workHour.id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                                    >
                                        Kustuta
                                    </button>
                                    <button
                                        onClick={() => handleUpdateClick(workHour)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                                    >
                                        Ajakohasta
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default WorkHoursTable;
