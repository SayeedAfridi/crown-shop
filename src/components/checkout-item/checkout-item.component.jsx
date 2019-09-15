import React from 'react'
import {connect} from 'react-redux'
import './checkout-item.style.scss'
import {clearItem} from '../../redux/cart/cart.actions'

const CheckoutItem = ({cartItem, clearItem}) => {
    const {name, imageUrl, price, quantity} = cartItem
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img alt='item' src={imageUrl}/>
            </div>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
            <span className='quantity'>{quantity}</span>
            <div className='remove-button' onClick={() => clearItem(cartItem)}>
                &#10005;
            </div>
        </div>
    )
    
}

const mapDispatchtoProps = dispatch =>({
    clearItem: (item) => dispatch(clearItem(item))
})


export default connect(null, mapDispatchtoProps)(CheckoutItem)