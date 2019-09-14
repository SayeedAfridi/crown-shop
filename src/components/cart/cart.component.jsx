import React from 'react'
import {connect} from 'react-redux'
import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'
import {createStructuredSelector} from 'reselect'
import {selectCartItems} from '../../redux/cart/cart.selectors'

import './cart.style.scss'

const Cart = ({cartItems}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.length ? (
                    cartItems.map(item => (
                        <CartItem key={item.id} item={item} />
                    ))
                ):(
                    <span className='empty'>No items in cart</span>
                )
                    
            }
        </div>
        <CustomButton inverted>Go To Checkout</CustomButton>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default connect(mapStateToProps)(Cart)