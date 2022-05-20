import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, UncontrolledPopover, PopoverBody} from 'reactstrap';
import CartIcon from 'mdi-react/CartIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import CartItem from './CartItem';

import {isEmpty} from '@/shared/helper'
const Cart = ({cart, pointBalance}) => {
    let navigate = useNavigate();

    if( !cart || !pointBalance) return "Loading cart..."
    // console.log(cart)
    // console.log(isEmpty(cart))
    const isEmptyCart = isEmpty(cart) || cart.items.length <= 0
    // return 'Here'
    return (
    <div className="cart cart-popover">
        <span className='cursor-pointer' id="PopoverFocus">
            <CartIcon  className='redtext'/> 
            <strong>Cart</strong>
        </span>
        <span className='mx-3'>{cart?.total_points ? cart.total_points : 0} Points</span>
        <UncontrolledPopover
            placement="bottom"
            target="PopoverFocus"
            trigger="legacy"
            className='cart'
        >
            <PopoverBody>
                <div className='d-flex justify-content-end'>
                    <CloseIcon className='cursor-pointer'/>
                </div>
                {isEmptyCart && <span>Your cart is empty!</span>}
                {!isEmptyCart && cart?.items?.map((item, index) =>{
                    return <CartItem key={`cartitem-${index}`} index={index} item={item} />
                })}
                {!isEmptyCart && <>
                <hr/>
                <Row>
                    <Col md={9} className="d-flex justify-content-center mb-3">
                        <strong>Total:</strong>
                    </Col>    
                    <Col md={3} >
                        <span>{cart.total_points} Points</span>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <Button  className="btn btn-primary w-100 red"  onClick={()=>{}}>View Cart</Button>
                    </Col>
                    <Col md="6">
                        <Button  className="btn btn-primary w-100 red"  onClick={()=>{navigate('/participant/checkout')}}>Checkout</Button>
                    </Col>
                </Row>
                </>}
            </PopoverBody>
        </UncontrolledPopover>
    </div>
    );
}

export default connect((state) => ({
    cart: state.cart,
    pointBalance: state.pointBalance,
    program: state.program
}))(Cart);