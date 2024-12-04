import React from "react";

const AdminPage = ({onLogout}) => {
    return (
        <div>
            <h1>Admin Page</h1>
            <button onClick={onLogout}>Logout</button>
        </div>
    );
};

export default AdminPage;
