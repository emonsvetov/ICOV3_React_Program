import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Table, Button, Row, UncontrolledPopover, PopoverBody, ButtonToolbar} from 'reactstrap';
import { ORDER_COLUMNS } from './columns';
import { useTable } from 'react-table';
import { connect } from 'react-redux';
import CartItem from './CartItem';
import CartIcon from 'mdi-react/CartIcon';
import CloseIcon from 'mdi-react/CloseIcon';


const makeColumnData = (data) => {
    
    let tableData = [];
    data.forEach(item => {
        let obj = {};
        obj.logo = item.merchant.logo;
        obj.name = item.merchant.name;
        obj.giftCode = item.gift.giftCode;
        obj.quantity = item.quantity;
        obj.price = item.gift.price;
        obj.total = item.gift.price * item.quantity;
        tableData.push(obj);
    })
    return tableData;
}
const CheckoutPage = ({cart}) => {
    const columns = React.useMemo( () => ORDER_COLUMNS, [])
    const data = React.useMemo(() => makeColumnData(cart), [])
    const { getTableProps, headerGroups, rows, prepareRow } 
        = useTable({ columns, data})
    const [points, setPoints] = useState(0);
    let navigate = useNavigate();

    useEffect(() => {
        let amount = 0;
        cart.forEach( item => amount += item.gift.price * item.quantity);
        setPoints(amount);
        }, [cart]);
    
  return (
    <>
        <div className='checkout'>
            <Row>
                <Col md={8}>
                    <h3>Checkout: Confirm Your Order</h3>
                </Col>
                <Col md={4} className='d-flex justify-content-end'>
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
            <div>
                <span>
                    Clicking "Confirm My Order" will confirm this redemption and <strong>{points}Points</strong> will be deducted from your rewards account.
                </span>
            </div>
            <div className='redtext text-center text-decoration-underline'>
                <strong>Once your order has been placed, it cannot be exchanged or cancelled.</strong>
            </div>
            <div className='points-detail-table mt-4'>
                You will receive an immediate confirmation of your order, with instructions on how you can acquire and redeem your gift code.
                <Table striped borderless size="md" {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                            ))}
                        </tr>
                        ))}
                    </thead>
                    <tbody>
                        {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                <td {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                </td>
                                )
                            })}
                            </tr>
                        )
                        })}
                    </tbody>
                </Table>
            </div>
            <Row className='my-4'>
                <Col md={9} className='d-flex justify-content-end'>
                    Total:
                </Col>
                <Col md={3} className='d-flex justify-content-center'>
                    {points.toLocaleString()} Points
                </Col>
            </Row>
            <Row>
                <Col md={9} className='d-flex justify-content-end'>
                    Balance After Purchase:
                </Col>
                <Col md={3} className='d-flex justify-content-center'>
                    {points.toLocaleString()} Points
                </Col>
            </Row>
            <div className='d-flex justify-content-end my-4'>
                <Button  className="btn btn-primary red "  onClick={()=>{}}>Confirm My Order</Button>
            </div>
            
        </div> 
        
    </>
    
)}

export default connect((state) => ({
    cart: state.cart,
}))(CheckoutPage);
