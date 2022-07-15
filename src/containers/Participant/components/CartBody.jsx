import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Col, Button, Row, PopoverBody} from 'reactstrap';
import CloseIcon from 'mdi-react/CloseIcon';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';

const CartBody = ( { cart } ) => {
    const [points, setPoints] = useState(0);
    let navigate = useNavigate();

    useEffect(() => {
        let amount = 0;
        cart.forEach( item => amount += item.gift.price * item.quantity);
        setPoints(amount);
    }, [cart]);
    
    if( !cart.length ) return <PopoverBody>
        <div className='d-flex justify-content-end'>
            <CloseIcon className='cursor-pointer'/>
        </div>
        <div className='text-center mb-3'>
            Your Shopping Cart is Empty
        </div>
        
    </PopoverBody>
    
    return (
        <>
            <PopoverBody>
                <div className='d-flex justify-content-end'>
                    <CloseIcon className='cursor-pointer'/>
                </div>
                {
                cart?.map((item, index) =>{
                    return <CartItem key={index} data ={item}/>
                })}  
                <hr/>
                <Row>
                    <Col md={9} className="d-flex justify-content-center mb-3">
                        <strong>Total:</strong>
                    </Col>    
                    <Col md={3} >
                        <span>{points} Points</span>
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
            </PopoverBody>
          
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
    };
  };
  
export default connect(mapStateToProps)(CartBody);


