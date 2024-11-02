import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51L4kwXCGMIiTrPToAsJQxZLpVw3is0hBYnFHUjZNHJvcOQfYE0EtKPZ7F1nlN2uJweBbtg8BDH1IcrCgMJsvJctP004p2hSJj0";
const StripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer(props) {
  const [input, setInput] = useState({})
  const onChange = (e) => {
    const { value, name } = e.target;
    setInput({ ...input, [name]: value })
  }
  return (
    <>
      <div className="payment-form w-75 shadowww2">
        <h4 className="d-flex justify-content-center">Enter Payment Details</h4>
        <div className="mt-5">
          <div className="d-flex justify-content-between">
            <div>
              <label for="fname" class="font-weight-bold">
                <i class="fa fa-user icon-color"></i> Full Name
              </label>
              <div className="mt-3">
                <input
                  type="text"
                  id="fname"
                  name="firstname"
                  value={input.firstname}
                  onChange={onChange}
                  placeholder="John M. Doe"
                ></input>
              </div>
            </div>
            <div className="">
              <label>Accepted Cards</label>

              <div class="icon-container mt-3">
                <i class="fa fa-cc-visa color-navy ms-1"></i>
                <i class="fa fa-cc-amex color-blue ms-2"></i>
                <i class="fa fa-cc-mastercard color-red ms-2"></i>
                <i class="fa fa-cc-discover color-orange ms-2"></i>
              </div>
            </div>
          </div>

          <div className="d-flex mt-4  justify-content-between">
            <div>
              <label for="email">
                <i class="fa fa-envelope icon-color"></i> Email
              </label>
              <div className="mt-3">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={input.email}
                  onChange={onChange}
                  placeholder="john@example.com"
                ></input>
              </div>
            </div>
            <div className="">
              <label for="cname">Name on Card</label>
              <div className="mt-3">
                <input
                  type="text"
                  id="cname"
                  name="cardname"
                  value={input.cardname}
                  onChange={onChange}
                  placeholder="John More Doe"
                ></input>
              </div>
            </div>
          </div>

          <div className="d-flex mt-4  justify-content-between">
            <div>
              <label for="adr">
                <i class="fa fa-address-card-o icon-color"></i> Address
              </label>
              <div className="mt-3">
                <input
                  type="text"
                  id="adr"
                  name="address"
                  value={input.address}
                  onChange={onChange}
                  placeholder="542 W. 15th Street"
                ></input>
              </div>
            </div>
            <div className="">
              <label for="city">
                <i class="fa fa-institution icon-color"></i> City
              </label>
              <div className="mt-3">
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={input.city}
                  onChange={onChange}
                  placeholder="New York"
                ></input>
              </div>
            </div>
          </div>

          <div className="d-flex mt-4  justify-content-between">
            <div>
              <label for="state">State</label>
              <div className="mt-3">
                <input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="NY"
                  value={input.state}
                  onChange={onChange}
                ></input>
              </div>
            </div>
            <div>
              <label for="zip">Zip</label>
              <div className="mt-3">
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={input.zip}
                  onChange={onChange}
                  placeholder="10001"
                ></input>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h5 className="mb-5 d-flex justify-content-center">
              Enter Card number, Expiry Date and CVC
            </h5>
            <div>
              <Elements stripe={StripeTestPromise} className="h5">
                <PaymentForm fees={200} setPayment={props.setPayment} cardDetails={input} />
                {/* <PaymentForm fees={props.fees} setPayment={props.setPayment} /> */}
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
