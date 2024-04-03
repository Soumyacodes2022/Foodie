import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './checkoutForm';
import { loadStripe } from '@stripe/stripe-js';
import useCart from '../../hooks/useCart';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);
const Payment = () => {
  const [cart] = useCart();
  const cartTotal = cart.reduce((sum, item)=> {
    return sum + (item.quantity*item.price)
  },0)
  const totalPrice = parseFloat(cartTotal.toFixed(2))
  return (
    <div className='section-container py-28'>
       <Elements stripe={stripePromise}>
      <CheckoutForm cart = {cart}  price={totalPrice}/>
    </Elements>
    </div>
  )
}

export default Payment
