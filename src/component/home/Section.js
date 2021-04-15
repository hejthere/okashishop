import React from 'react';
import { Col, Row, Container, Image } from 'react-bootstrap'
import tea from '../../pictures/ocha.jpg';
import dishes from '../../pictures/osara.jpg';
import './home.css';

export default function Section() {

    const productList = [
        {
            picture: tea,
            description: 'Tea Powder'
        },
        {
            picture: dishes,
            description: 'Utensil'

        }
    ]

    const productItem = productList.map(item => {
        return (

            <Col className='p-0 section-container'>
                <Image className='section-picture' src={item.picture} />
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