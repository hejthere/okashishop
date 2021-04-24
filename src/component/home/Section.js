import React from 'react';
import { Col, Row, Container, Image } from 'react-bootstrap'
import tea from '../../pictures/ocha.jpg';
import dishes from '../../pictures/osara.jpg';
import './home.css';

export default function Section() {

    const productList = [
        {
            picture: tea,
            description: 'Looking for tea leaf?',
            hiddenText: "Order Online & Save Time!"
        },
        {
            picture: dishes,
            description: 'Join our event!',
            hiddenText: 'Coming soon!'
        }
    ]

    const productItem = productList.map(item => {
        return (
            <Col key={item.description} className='p-0 section-container'>
                <Image className='section-picture' src={item.picture} fluid='true' />
                <div className="section-hidden-text">{item.hiddenText}</div>
                <div className="section-text">{item.description}</div>
            </Col>
        )
    })



    return (
        <Container fluid='true'>
            <Row xs={1} md lg={2} className='m-0'>
                {productItem}
            </Row>
        </Container>
    )
}