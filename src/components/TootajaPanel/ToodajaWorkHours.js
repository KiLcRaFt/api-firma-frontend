import React from 'react';

function ToodajaWorkHours({ workHours }) {
    if (workHours.length === 0) return <p>Ei ole tööaegu.</p>;

    return (
        <div>
            <h2>Tööajad</h2>
            <ul>
                {workHours.map((hour) => (
                    <li key={hour.Id}>
                        {hour.Kuupaev}: {hour.Too_algus} - {hour.Too_lypp}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToodajaWorkHours;
