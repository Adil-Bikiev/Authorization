import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useNavigate()

    async function handleSubmit(e){
        e.preventDefault();
 
        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            emailRef.current.value = '';
            passwordRef.current.value = '';
            history('/')
            window.location.reload();
        } catch (error) {
            console.error(error); 
            setError("Failed to sign in");

        } finally {
            setLoading(false); 
        }
    }
    

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'> 
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id='password'> 
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className='w-100' type='submit' style={{ marginTop: "10px" }}>Log In</Button>
                    </Form>
                    <Link to="/forgot-password">Forgot Password?</Link>
                </Card.Body>
            </Card> 
            <div className='w-100 text-center mt-2'>
                <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}
