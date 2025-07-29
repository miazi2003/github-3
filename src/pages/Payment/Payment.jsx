import { Elements } from "@stripe/react-stripe-js";

import React from "react";
import { useParams } from "react-router";
import PaymentForm from "./PaymentForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key)
const Payment = () => {
  const { id } = useParams();
  return (
    <div>
      <p>payment parcel id : {id}</p>
      <Elements stripe={stripePromise}>
        <PaymentForm></PaymentForm>
      </Elements>
    </div>
  );
};

export default Payment;
