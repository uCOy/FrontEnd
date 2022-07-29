import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export const ListaUsuarios = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type:'',
        mensagem:''
    })

    const getUsers = async () => {

        const valueToken = localStorage.getItem('token');
        const headers = {
            'headers': {
                'Authorization': 'Bearer ' + valueToken
            }
        }

        await api.get("/users", headers)
            .then( (response) => {
                setData(response.data.users)
            }).catch( (err) => {
                if(err.response){
                    setStatus({
                        type:'error',
                        mensagem: err.response.data.mensagem
                    })
                } else {
                    setStatus({
                        type:'error',
                        mensagem: 'Erro: tente mais tarde...'
                    })
                }
            })
    }

    useEffect( () => {
        getUsers();
    }, [])

    return(
        <div>
            <ul>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/usuarios">Usuários</Link>
                </li>
            </ul>
            <h1>Usuários</h1>

            {data.map(user => (
                <div key={user.id}>
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                    <hr/>
                </div>
            ))}
        </div>
    )
}