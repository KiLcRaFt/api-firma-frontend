import React from 'react';

const Profile = ({ data }) => {
    return (
        <div>
            <h2>Профиль</h2>
            <p>Имя: {data.name}</p>
            <p>Email: {data.email}</p>
            <p>Должность: {data.position}</p>
        </div>
    );
};

export default Profile;
