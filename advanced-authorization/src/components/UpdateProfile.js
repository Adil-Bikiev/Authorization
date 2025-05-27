import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"
import { updatePassword, verifyBeforeUpdateEmail, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'


export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useNavigate()


    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        try {
            setLoading(true)
            setError("")

            const password = prompt("Please enter your current password to confirm changes.")
            if (!password) {
                throw new Error("Password is required for re-authentication.")
            }

            const credential = EmailAuthProvider.credential(currentUser.email, password)
            await reauthenticateWithCredential(currentUser, credential)

            if (emailRef.current.value !== currentUser.email) {
                await verifyBeforeUpdateEmail(currentUser, emailRef.current.value)
                setError("A verification email has been sent to the new email. Please verify before logging in with the new email.")
                setLoading(false)
                return
            }

            if (passwordRef.current.value) {
                await updatePassword(currentUser, passwordRef.current.value)
            }

            history("/")
        } catch (err) {
            console.error(err)
            switch (err.code) {
                case 'auth/wrong-password':
                    setError("The password you entered is incorrect.")
                    break
                case 'auth/too-many-requests':
                    setError("Too many attempts. Please try again later.")
                    break
                case 'auth/email-already-in-use':
                    setError("The email address is already in use.")
                    break
                case 'auth/invalid-email':
                    setError("The email address is invalid.")
                    break
                case 'auth/weak-password':
                    setError("The password is too weak.")
                    break
                case 'auth/requires-recent-login':
                    setError("Please log in again before updating your account.")
                    break
                default:
                    setError("Failed to update account.")
            }
        } finally {
            setLoading(false)
        }
    }

      
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'> 
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required defaultValue={currentUser.email}/>
                        </Form.Group>
                        <Form.Group id='password'> 
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} placeholder='Leave blank to keep the same'/>
                        </Form.Group>
                        <Form.Group id='password-confirm'> 
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type='password' ref={passwordConfirmRef} placeholder='Leave blank to keep the same'/>
                        </Form.Group>
                        <Button disabled={loading} className='w-100' type='submit' style={{ marginTop: "10px" }}>Update Profile</Button>
                    </Form>
                </Card.Body>
            </Card> 
            <div className='w-100 text-center mt-2'>
                <Link to="/">Cancel</Link>
            </div>
        </>
    )
}
