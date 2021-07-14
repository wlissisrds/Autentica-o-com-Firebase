import { Form, Card, Button, Alert } from 'react-bootstrap'

import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Login() {

    
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    
    const {login} = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true); //define o estado do butao p/ criar
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/")
        } catch {
            setError("Failed to log in")
        }
        //define o estado do butao p/ evitar cria varios usuários
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sig Up</Link>
            </div>
        </>
    )
}
