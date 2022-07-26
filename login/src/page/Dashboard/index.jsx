import React from 'react';

export const Dashboard = () => {
    const token = localStorage.getItem('token')
    return(
        <div>
            <h1>Dashboard</h1>
            <h6>Token: {token}</h6>
        </div>
    )
}