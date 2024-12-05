import React, { useState } from "react";
import EditWorkerForm from "./EditWorkerForm";

const WorkerTable = ({ workers, onDeleteWorker, onUpdate }) => {
    const [editingWorkerId, setEditingWorkerId] = useState(null);
    const [filter, setFilter] = useState('');
    const [sortField, setSortField] = useState('');

    // Filtreerimine ees- või perekonnanime järgi
    const filteredWorkers = workers.filter(
        (worker) =>
            worker.nimi.toLowerCase().includes(filter.toLowerCase()) ||
            worker.perenimi.toLowerCase().includes(filter.toLowerCase())
    );

    // Sorteerimine
    const sortedWorkers = [...filteredWorkers].sort((a, b) => {
        if (!sortField) return 0;
        if (a[sortField] < b[sortField]) return -1;
        if (a[sortField] > b[sortField]) return 1;
        return 0;
    });

    const handleEditClick = (workerId) => {
        setEditingWorkerId(workerId);
    };

    const handleCancelEdit = () => {
        setEditingWorkerId(null);
    };

    return (
        <div className="p-6 bg-white bg-opacity-10 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Töötajad</h2>
            {workers.length > 0 ? (
                <div className="overflow-x-auto">
                    <div className="mb-4 flex space-x-4 text-black">
                        <input
                            type="text"
                            placeholder="Filtreeri nime/sildi järgi"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                        <select
                            onChange={(e) => setSortField(e.target.value)}
                            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        >
                            <option value="">Sorteeri...</option>
                            <option value="nimi">Esimesi nimedega</option>
                            <option value="perenimi">Perekonnanime järgi</option>
                            <option value="amet">Rolli järgi</option>
                        </select>
                    </div>

                    <table className="w-full text-left border-separate border-spacing-y-3">
                        <thead className="bg-indigo-600 bg-opacity-75 text-white rounded-lg">
                        <tr>
                            <th className="p-3">Nimi</th>
                            <th className="p-3">Perenimi</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Telefoni number</th>
                            <th className="p-3">Tegevused</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedWorkers.map((worker) => (
                            <tr
                                key={worker.id}
                                className="bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30 text-white rounded-lg transition duration-300"
                            >
                                <td className="p-3">{worker.nimi}</td>
                                <td className="p-3">{worker.perenimi}</td>
                                <td className="p-3">{worker.email}</td>
                                <td className="p-3">{worker.telefoni_number}</td>
                                <td className="p-3 space-x-3">
                                    <button
                                        onClick={() => onDeleteWorker(worker.id)}
                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-md transition duration-300"
                                    >
                                        Kustuta
                                    </button>

                                    {editingWorkerId === worker.id ? (
                                        <EditWorkerForm
                                            worker={worker}
                                            onUpdate={onUpdate}
                                            onCancel={handleCancelEdit}
                                        />
                                    ) : (
                                        <button
                                            onClick={() => handleEditClick(worker.id)}
                                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md transition duration-300"
                                        >
                                            Muuda
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-white text-lg">Ei ole töötajaid, keda kuvada.</p>
            )}
        </div>
    );
};

export default WorkerTable;
