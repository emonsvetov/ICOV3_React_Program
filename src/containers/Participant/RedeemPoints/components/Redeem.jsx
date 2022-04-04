import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Button, Row, UncontrolledPopover, PopoverBody, ButtonToolbar} from 'reactstrap';
import Select from 'react-select';
import CartIcon from 'mdi-react/CartIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import store from '../../../App/store';
import { setCart } from '../../../../redux/actions/cartActions';
import { connect } from 'react-redux';
import CartItem from './CartItem';

const merchant_logo = `/img/merchants/1.png`;
const GiftCodeOptions = [
    {label: '$5.00 Gift Code = 200 Points', value: 1}
]

const Redeem = ({cart}) => {
    // const [cart, setCart] = useState([]);
    const [points, setPoints] = useState(0);
    let navigate = useNavigate();
    useEffect(() => {
        let amount = 0;
        cart.forEach( item => amount += item.gift.price * item.quantity);
        setPoints(amount);
      }, [cart]);
    const addCart = () =>{
        let gift = {giftCode: '$5.00', price: 200}
        let cartList = cart;
        let containing = false;
        cartList.forEach((item, index)=>{
            if(item.merchant.name == 'Starbucks'){
                containing = true;
                item.quantity ++;
            }
        })
        
        if(!containing){
            let merchant = {logo: merchant_logo, name: 'Starbucks'}
            let quantity = 1;
            let item ={gift, merchant, quantity};
            cartList.push(item)
        }
        store.dispatch(setCart(cartList))
        // setCart(cartList);
    }
    
  return (
    <>
        <div className='redeem'>
            <Row>
                <Col md={4}>
                    <h3>Get Your Gift Code</h3>
                </Col>
                <Col md={8} className='d-flex justify-content-end'>
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
                        <PopoverBody>
                            <div className='d-flex justify-content-end'>
                                <CloseIcon className='cursor-pointer'/>
                            </div>
                            {cart?.map((item, index) =>{
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
                    </UncontrolledPopover>
                </Col>
            </Row>
            
            <Row className='get-giftcode mt-3'>
                <Col md={2}>
                    <img src={merchant_logo}/>
                </Col>
                <Col md={10}>
                    <h4>Starbucks</h4>
                    <div className='desc'>
                        Treat yourself - or someone else - to something special at Starbucks with a Starbucks card, whcih you can use towards premium cofee, tea, refreshers, lunch, pastries and more.
                        And if you register your card with the My Starbucks Rewards loyalty program, you can get even more free food and drinks.
                    </div>
                    <div className='mt-3'>
                        Visit Merchant Website
                    </div>
                    <div className='my-3 w-50'>
                        <Select
                            options={GiftCodeOptions}
                            clearable={false}
                            className="react-select"
                            placeholder={' --- '}
                            classNamePrefix="react-select"
                            value={GiftCodeOptions[0]}
                        />
                    </div>
                    <div className='w-25'>
                        <Button className='btn btn-primary w-100 red' onClick={() => addCart()}>Add to Cart</Button>
                    </div>
                    
                </Col>
            </Row>
            <Row className='redemption-instructions mt-5'>
                <h3>Redemptions Instructions</h3>
                <div className='redtext my-3'>
                    After redeeming your gift code, you will be asked for a challenge key. The challenge key is the pin number listed to the right of your gift card link. You may need to type this number in, instead of copy and pasting.
                </div>
                <div>
                    Terms & Conditions: Reload your Card, check your balance and find out how to register and protect your Card balance at participating Starbucks stores, starbucks.com/card or 1-800-782-7282. 
                    Your Starbucks Card may only be used for making purchases at participating Starbucks stories. 
                    Cannot be redeemed for cash unless required by law. Refunds only provided for unused Cards with the original receipt. 
                    This card does not expire, nor does Starbucks charge fees. Complete terms and conditions available on our website. 
                    Use of this Card constitutes acceptance of these terms and conditions.
                </div>
            </Row>
        </div> 
        
    </>
    
)}

export default connect((state) => ({
    cart: state.cart,
}))(Redeem);
