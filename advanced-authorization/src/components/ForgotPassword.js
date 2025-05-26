import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"

export default function ForgotPassword() {
    const emailRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useNavigate()

    async function handleSubmit(e){
        e.preventDefault();
 
        try {
            setError('');
            setLoading(true);
            // await login(emailRef.current.value, passwordRef.current.value);
            emailRef.current.value = '';
            // passwordRef.current.value = '';
            history('/')
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
                    <h2 className='text-center mb-4'>Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'> 
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className='w-100' type='submit' style={{ marginTop: "10px" }}>Reset Password</Button>
                    </Form>
                    <Link to="/login">Log In</Link>
                </Card.Body>
            </Card> 
            <div className='w-100 text-center mt-2'>
                <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}
