import React from 'react';

function TootajaInfo({ user }) {
    if (!user) return <p>Palun logige sisse</p>;

    return (
        <div>
            <h1>{user.nimi} {user.perenimi}</h1>
            <p>Email: {user.email}</p>
            <p>Amet: {user.amet}</p>
            <p>Admin: {user.isAdmin ? 'Jah' : 'Ei'}</p>
        </div>
    );
}

export default TootajaInfo;
