import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Context } from '../../Context/AuthContext';
import Table from 'react-bootstrap/Table';


import { Nav, Navbar, Container, Button, Form } from 'react-bootstrap';

export const ListaUsuarios = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type:'',
        mensagem:''
    })

    const { authenticated, handleLogout } = useContext(Context);

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
            <Navbar bg="dark" variant="dark">
              <Container>
                <Navbar.Brand href="/dashboard">Menu Bala</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link href="/usuarios">Usuarios</Nav.Link>
                </Nav>
                <Form>
                <Button variant="outline-warning" type="button" onClick={handleLogout}>Sair</Button>
                </Form>
              </Container>
            </Navbar>
        
            <h1>Usuários</h1>

            <Button variant="outline-success" href="/usuarios/novo">Novo</Button>{' '}

            <Table striped bordered hover className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                {data.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>           
                ))}
                </tbody>
      </Table>
        </div>
    )
}