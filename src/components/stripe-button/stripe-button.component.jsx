import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100; // convert to cent
    const publishableKey = 'pk_test_51JzjjdK413KpUYg07cdJ71aPt126HIEkz8SGee5x0kT8GCd8iOxi57XCc0bssFpeTRkAqCU77WnyKkQ2ioLmgYnY00PmecxJws';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='React Ecommerce Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;