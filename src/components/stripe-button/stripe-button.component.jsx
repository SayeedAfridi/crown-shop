import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeButton = ({price}) => {
    const stripePrice = price * 100;
    const pubKey = 'pk_test_l6QTtNxtCJJcqVJ8yoxhfmtG00BQCz4TqK'
    const onToken = token => {
        console.log(token)
        alert('Payment Succeccfull')
    }
    return(
        <StripeCheckout 
           label='Pay Now'
           name='Crown Clothng Ltd.'
           shippingAddress
           image='https://svgshare.com/i/CUz.svg'
           description={`Your total is $${price}`}
           amount= {stripePrice}
           panelLabel='Pay Now'
           token={onToken}
           stripeKey={pubKey} 
        />
    )
}


export default StripeButton