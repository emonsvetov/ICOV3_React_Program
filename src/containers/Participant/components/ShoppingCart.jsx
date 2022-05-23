import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Col, Button, Row, UncontrolledPopover, PopoverBody, ButtonToolbar} from 'reactstrap';
import CartIcon from 'mdi-react/CartIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import CartBody from './CartBody';

const ShoppingCart = ( { cart } ) => {
    const [points, setPoints] = useState(0);
    let navigate = useNavigate();
    
    useEffect(() => {
        let amount = 0;
        cart.forEach( item => amount += item.gift.price * item.quantity);
        setPoints(amount);
    }, [cart]);

    return (
        <>
            <span className='cursor-pointer' id="PopoverFocus">
                <CartIcon  className='redtext'/> 
                <strong>Cart</strong>
            </span>
            <span className='mx-3'>{points} Points</span>
            <UncontrolledPopover
                placement="bottom"
                target="PopoverFocus"
                trigger="legacy"
                className='cart'
            >
                <CartBody />
            </UncontrolledPopover>
          
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
    };
  };
  
  export default connect(mapStateToProps)(ShoppingCart);

