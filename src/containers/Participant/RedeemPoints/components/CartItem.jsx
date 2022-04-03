import React from 'react';
import { Col, Button, Row } from 'reactstrap';

const CartItem = ({data}) =>{
    const {merchant, gift, quantity} = data;
    const {logo, name} = merchant;
    const {giftCode, price} = gift;
    return (
        <Row className='cart-item mb-3'>
            <Col md={3}>
                <img src={logo} alt='merchant'/>
            </Col>
            <Col md={4} className='flex-column'>
                <div><strong>{name}</strong></div>
                <span>{giftCode} Gift Code</span>
            </Col>
            <Col md={2}>
                <span>{`x ${quantity}`}</span>
            </Col>
            <Col md={3}>
                <span>{price} Points</span>
            </Col>
        </Row>
    )
}

export default CartItem