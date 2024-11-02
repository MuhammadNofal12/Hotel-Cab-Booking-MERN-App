import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import ToastEmitter from "../../components/notification/Notification";

export default function PaymentForm(props) {
  const [success, setsuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

    const stripe = useStripe();
    const Elements = useElements();
  useEffect(() => {
    debugger
    const fetchClientSecret = async () => {
      const data = await axios.post("http://localhost:8800/payment/create", {
        amount: props.fees,
      });
      setClientSecret(data.data.clientSecret);
    };
    fetchClientSecret();
    console.log("client secret:", clientSecret);
  }, []);
  const confirmPayment = async (e) => {
    debugger
    console.log("in confirm payment");
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: Elements.getElement(CardElement),
    });
    if (!error) {
      await stripe
        .confirmCardPayment(clientSecret, {
          payment_method: paymentMethod,
        })
        .then((result) => {
          console.log(paymentMethod)
          // console.log("suceess");
          // alert("payment successfull");
          const notification = {
            msg: "payment successfull",
            type: "success",
          };
          ToastEmitter(notification);
          props.setPayment(true);
        })
        .catch((err) => {
          // console.log("error");
          // alert("error");
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: Elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          amount: 1,
          id,
        });
        if (response.data.success) {
          console.log("sucessfull payment");
          setsuccess(true);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form>
          <fieldset className="FormGroup">
            <div className="FormRow font-weight-bold">
              <CardElement></CardElement>
            </div>
            <div className="d-flex justify-content-center">
              <button
                className="btn mt-5  irfan-dropdown"
                type="button"
                onClick={confirmPayment}
              >
                checkout to pay
              </button>
            </div>
          </fieldset>
        </form>
      ) : (
        <></>
      )}
    </>
  );
}
