import React, { useState, useEffect } from 'react';
import { getTootajad } from '../../api';

function TootajadList() {
    const [tootajad, setTootajad] = useState([]);

    useEffect(() => {
        getTootajad().then(setTootajad);
    }, []);

    return (
        <div>
            <h2>Töötajad</h2>
            <ul>
                {tootajad.map((tootaja) => (
                    <li key={tootaja.id}>
                        {tootaja.nimi} {tootaja.perenimi} - {tootaja.amet}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TootajadList;