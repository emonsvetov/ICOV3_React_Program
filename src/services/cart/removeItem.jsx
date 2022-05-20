import store from '@/containers/App/store';
import {getAuthCart, updateAuthCart} from '@/containers/App/auth'
import { setCart } from '@/redux/actions/cartActions';

export const onClickRemoveItem = (index, factor_valuation)    => {
    // alert(index)
    if(window.confirm( 'Are you sure to remove item from your cart?'))
    {
        removeItem(index, factor_valuation);
    }
}

const removeItem = (i, factor_valuation) => {
    //console.log('i: '+i);
    const cart = getAuthCart();
    console.log(cart)
    // return;
    let minusPoints = 0;
    let minusTotal = 0;
    //console.log(cart);
    for(let j in cart.items)  {
        //console.log('j');
        //console.log(j);
        if( parseInt(i) === parseInt(j) )   {
            console.log('splicing: ' + j);
            let item = cart.items[j];
            minusPoints += parseInt(item.redemption_value * factor_valuation * item.qty);
            minusTotal += parseFloat(item.redemption_value * item.qty);
            cart.items.splice(j, 1);
        }
        //console.log(cart.items[j]);
    }
    //console.log(minusPoints);
    //console.log(minusTotal);
    cart.total_dollar -= minusTotal;
    cart.total_points -= minusPoints;
    if(updateAuthCart(cart)) {
        store.dispatch(setCart(cart))
    }
}