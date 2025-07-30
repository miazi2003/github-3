import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";

import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure";
const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: bookingInfo = {} } = useQuery({
    queryKey: ["bookings", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${id}`);
      return res.data;
    },
  });

  console.log("bookingInfo", bookingInfo);

  const amount = bookingInfo.price;
  const amountInCents = amount * 100;
  console.log(amountInCents);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: stripeError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (stripeError) {
      console.log("[error]", stripeError);
      setError(stripeError.message);
    } else {
      console.log("[paymentMethod]", paymentMethod);
      setError(null);
    }

    //create payment intent

    const res = await axiosSecure.post("/create-payment-intent", {
      amountInCents,
      bookingId: id,
    });

    const clientSecret = res.data.clientSecret;
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
      setError(result.error.message);
    } else {
      setError("");
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");
        console.log("res intent ", result.paymentIntent);
      }
    }

    console.log("transaction id", result.paymentIntent.id);

    const transactionId = result.paymentIntent.id;

    if (result.paymentIntent.status === "succeeded") {
      const updateRes = await axiosSecure.put(
        `/updatePayment/${id}`,
        {
          transactionId: transactionId,
          paymentStatus: "Paid",
        }
      );
      console.log("res", updateRes.data);

      axiosSecure
        .post("/tracking", {
          trackingId: bookingInfo.trackingId,
          updates: [
            {
              status: "paid",
              timestamp: new Date().toISOString(),
              location: "",
              note: `Transaction ${transactionId}`,
            },
          ],
        })
        .then(() => {
          console.log("Paid status appended to tracking");
        })
        .catch((err) => {
          console.error("Error appending tracking:", err);
        });

      await Swal.fire({
        title: "payment Successful!",
        text: `Your payment ${transactionId} has been succeed!`,
        icon: "success",
      });

      const bookingData = {
        bookingId: id,
        transactionId,
        amount,
        paidBy: user?.displayName,
        email: user?.email,
        paidAt: new Date(),
        paymentStatus: "paid",
      };

      const savRes = await axiosSecure.post(
        "/savePayments",
        bookingData
      );
      console.log("payment saved", savRes.data);

      navigate("/dashBoard");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Payment Has been failed!",
      });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md max-w-md mx-auto"
      >
        <CardElement className="p-2 border rounded w-full" />

        <button
          disabled={!stripe}
          type="submit"
          className="btn btn-primary w-full"
        >
          Pay {""} ${amount}
        </button>

        <p className="text-red-500">
          {error ? `Error: ${error}` : "No error found"}
        </p>
      </form>
    </div>
  );
};

export default PaymentForm;
