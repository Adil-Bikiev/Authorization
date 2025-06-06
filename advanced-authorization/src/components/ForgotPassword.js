import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link } from "react-router-dom"

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e){
        e.preventDefault();
 
        try {
            setMessage('')
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value)
            emailRef.current.value = '';
            // passwordRef.current.value = '';
            setMessage('Check your inbox for further instructions')
        } catch (error) {
            console.error(error); 
            setError("Failed to reset password");
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
                    {message && <Alert variant="success">{message}</Alert>}                    
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
