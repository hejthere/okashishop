import React from 'react'
import { Container } from 'react-bootstrap'
import { useAuth } from '../../firebaseAuth/AuthContext'

export default function CheckOut() {

    const { currentUser } = useAuth()

    return (
        <Container>
            <div>Hi ! {currentUser.email} </div>
        </Container>
    )
}
