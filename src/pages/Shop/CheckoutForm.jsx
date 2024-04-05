import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FaPaypal } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";


const CheckoutForm = ({ cart, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [cardError,setCardError] = useState('')
  const [cardSuccess,setCardSuccess] = useState('')
  const [clientSecret, setClientSecret] = useState("");

  useEffect(()=>{
    if(typeof price !== 'number' || price<1){
      return;
    }
    axiosSecure.post('/create-payment-intent', {price}).
    then(res=>{
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    })
  },[price , axiosSecure]);


  const handleSubmit = async (event) => {
     // Block native form submission.
     event.preventDefault();

     if (!stripe || !elements) {
       // Stripe.js has not loaded yet. Make sure to disable
       // form submission until Stripe.js has loaded.
       return;
     }
 
     // Get a reference to a mounted CardElement. Elements knows how
     // to find your CardElement because there can only ever be one of
     // each type of element.
     const card = elements.getElement(CardElement);
 
     if (card == null) {
       return;
     }
 
     // Use your card Element with other Stripe.js APIs
     // Create Card
     const {error, paymentMethod} = await stripe.createPaymentMethod({
       type: 'card',
       card,
     });
     if (error) {
       console.log('[error]', error);
       setCardError(error.message)
       
     } else {
       console.log('[PaymentMethod]', paymentMethod);
       setCardSuccess(`Success! Your Order Id is ${paymentMethod.id}`)
     }
     const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || 'Anonymous',
            email: user?.email || 'Unknown',
          },
        },
      },
      );

      if(confirmError){
        console.log(confirmError)
      }

      if(paymentIntent.status === "succeeded"){

       console.log(paymentIntent.id);
       setCardError(`Your Transaction id is ${paymentIntent.id}`);
        const paymentInfo = {
          name:user.displayName,
          email:user.email,
          transactionid: paymentIntent.id,
          price,
          quantity: cart.length,
          status: "order pending",
          itemName: cart.map(item=>item.name),
          cartItems: cart.map(item=>item._id),
          menuItems: cart.map(item=>item.menuItemId)
        }

        // console.log(paymentInfo);
        //send the data to backend
        axiosSecure.post('/payments',paymentInfo)
        .then(res=> {
          console.log(res.data);
          Swal.fire({
            title: "Payment Successful",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          }).then((result)=>{
            if(result.isConfirmed){
              
              navigate('/order');
            }
          })
        }).catch(error=>console.log(error))
      }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center w-full ">
      {/* Left Side */}
      <div className="w-full md:w-1/3 space-y-3 rounded-xl shadow-2xl py-4 px-5 flex flex-col justify-center items-center h-56">
        <h3 className="font-bold text-xl">Order Summary</h3>
        <p className="font-semibold">
          Total Price: <span className="text-purple-700">${price}</span>
        </p>
        <p className="font-semibold">
          Number of Items:{" "}
          <span className="text-purple-700">{cart.length}</span>
        </p>
      </div>
      {/* Right Side */}
      <div className="w-full md:w-2/3 space-y-3 card shrink-0  rounded-xl shadow-2xl py-4 px-5 flex flex-col justify-center  mx-4">
        <h4 className="font-bold text-lg text-purple-700 mx-auto">
          Payment Process
        </h4>
        <h4 className="font-medium text-md mx-auto">Credit/Debit Card</h4>

        {/* stripe payment */}
        <div className="mx-auto w-4/5">
          <form onSubmit={handleSubmit}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
            <button
              type="submit"
              className="btn btn-ghost text-white hover:text-purple-700 w-full mt-8  bg-purple-700"
              disabled={!stripe}
            >
              Pay
            </button>
          </form>
          

          {
            cardError ? (<p className="text-red mt-2">{cardError}</p>) : ""
          }
          {
            cardSuccess ? (<p className="text-green mt-2">{cardSuccess}</p>) : ""
          }
            
          

          <div className="mt-5 text-center">
            <hr />
              <button className=" btn rounded-md transition-all bg-orange-500 text-white hover:text-black w-1/3 mt-5"> <FaPaypal/>Pay With PayPal</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutForm;
