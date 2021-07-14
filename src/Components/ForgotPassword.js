
import { Form, Card, Button, Alert } from 'react-bootstrap'

import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function ForgotPassword() {

    const emailRef = useRef();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const { resetPassword } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage("");
            setError("");
            setLoading(true); //define o estado do butao p/ criar
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for further instructions")
        } catch {
            setError("Failed to reset password");
        }
        //define o estado do butao p/ evitar cria varios usuários
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Reset Password
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        <Link to="/login">Back to login</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sig Up</Link>
            </div>
        </>
    )
}
