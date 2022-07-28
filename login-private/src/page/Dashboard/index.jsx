import React, { useContext } from 'react';
import { Context } from '../../Context/AuthContext'

export const Dashboard = () => {
    const token = localStorage.getItem('token');

    const { authenticated, handleLogout } = useContext(Context);

    console.log(`Situação do usuário na página Dashboard: ${authenticated}`);

    return(
        <div>
            <h1>Dashboard</h1>
            <h6>Token: {token}</h6>
            <button type="button" onClick={handleLogout}>Sair</button>
        </div>
    )
}