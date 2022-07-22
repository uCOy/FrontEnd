import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './styles.css';
import api from '../../services/api';

export function Login() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [status, setStatus] = useState({
    type: '',
    mensagem: '',
    loading: false
  })

  const valorInput = e => setUser({ 
    ...user, 
    [e.target.name]: e.target.value
  })

  const loginSubmit = async e => {
    e.preventDefault();
    // console.log(user.email);
    // console.log(user.password);

    const headers = {
      'Content-Type': 'application/json'
    }

    setStatus({
      loading:true,
    })

    await api.post("login", user, {headers})
    .then((response) => {
      // console.log(response);
      setStatus({
        type: 'success',
        mensagem: response.data.mensagem
      })
    }).catch((err) => {
      setStatus({
        
          type: 'error',
          mensagem: 'Erro: tente mais tarde...'
      })
      if(err.response){
        // console.log(err.response);
        setStatus({
          type: 'error',
          mensagem: err.response.data.mensagem,
          loading: false
        })
      }
      // console.log("Erro: tente mais tarde...");  
    })
  }
    return(
        <div className="background">
          <Container className="box">
              <Form onSubmit={loginSubmit} className="borderForm">
                {status.type == 'error' ? <p>{status.mensagem}</p>: ""}
                {status.type == 'success' ? <p>{status.mensagem}</p>: ""}

                {status.loading ? <p>Validando...</p>: ""}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name="email" onChange={valorInput} placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    {/* Nunca compartilharemos seu e-mail com mais ninguém */}
                  </Form.Text>
                </Form.Group>
      
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" onChange={valorInput} placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button id="button" variant="primary" type="submit" >
                  Submit
                </Button>
              </Form>
          </Container>
        </div>
    )

}