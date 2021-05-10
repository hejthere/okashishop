import React from 'react';
import { Col, Row, Container, Image } from 'react-bootstrap'
import tea from '../../pictures/ocha.jpg';
import dishes from '../../pictures/osara.jpg';
import './section.css';

export default function Section() {

    const sectionListContent = [
        {
            picture: tea,
            description: 'Looking for tea leaf?',
            hiddenText: "Order with us!"
        },
        {
            picture: dishes,
            description: 'Join our event!',
            hiddenText: 'Coming soon!'
        }
    ]

    const productItem = sectionListContent.map(item => {
        return (
            <Col key={item.description} className='p-0 section-container'>
                <div className="section-hidden-text-container">
                    <div className="section-hidden-text">{item.hiddenText}</div>
                </div>
                <Image className='section-picture' src={item.picture} fluid='true' />
                <div className="section-text-container">
                    <div className="section-text">{item.description}</div>
                </div>

            </Col>
        )
    })

    return (
        <Container fluid='true'>
            <Row xs={1} md={2} lg={2} className='m-0'>
                {productItem}
            </Row>
        </Container>
    )
}