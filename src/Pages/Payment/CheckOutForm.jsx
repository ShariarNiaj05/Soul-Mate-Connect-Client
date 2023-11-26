import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
const CheckOutForm = ({ requestedBiodataId }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [allBiodata, setAllBiodata] = useState([]);
  const [myBiodata, setMyBiodata] = useState({});
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();

  // console.log(requestedBiodataId);

  const formInputStyle =
    "peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border  placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50";

  const formLabelStyle =
    "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500";

  useEffect(() => {
    setTimeout(async () => {
      const res = await axiosSecure.get(`/biodatas/${user?.email}`);
      setMyBiodata(res.data);
    }, 500);
  }, [axiosSecure, user?.email]);

  useEffect(() => {
    setTimeout(async () => {
      const res = await axiosPublic.get(`/biodatas`);
      setAllBiodata(res.data);
    }, 500);
  }, [axiosPublic]);

  const filteredBiodata = allBiodata.find(
    (matchedBiodata) => matchedBiodata.biodataId == requestedBiodataId
  );
  console.log(filteredBiodata);

  const totalPrice = 500;

  useEffect(() => {
    if (totalPrice) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked for payment");
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    //   confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "Anonymous",
            name: user?.displayName || "Anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error", confirmError);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        //   now save the payment in the DB
        const payment = {
          email: user?.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(),
          myBiodataId: myBiodata?.biodataId,
          requestBiodataId: parseInt(requestedBiodataId),
          requestName: filteredBiodata.name,
          requestEmail: filteredBiodata.email,
          requestMobileNumber: filteredBiodata.mobileNumber,

          status: "pending",
        };

        const res = await axiosSecure.post("/payments", payment);
        console.log("payment saved", res.data);
        // refetch()
        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment Successful",
            showConfirmButton: false,
            timer: 1500,
          });

            navigate('/dashboard/contact-request')
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative h-11 w-full min-w-[200px] mb-5">
        <input
          name="email"
          type="email"
          className={formInputStyle}
          defaultValue={user?.email}
          required
          readOnly
        />
        <label className={formLabelStyle}>Email</label>
      </div>
      <div className="relative h-11 w-full min-w-[200px] mb-5">
        <input
          name="myBiodataId"
          type="text"
          className={formInputStyle}
          defaultValue={myBiodata?.biodataId}
          required
          readOnly
        />
        <label className={formLabelStyle}>My Biodata Id</label>
      </div>

      <div className="relative h-11 w-full min-w-[200px] mb-5">
        <input
          name="requestBiodataId"
          type="text"
          className={formInputStyle}
          defaultValue={requestedBiodataId}
          required
          readOnly
        />
        <label className={formLabelStyle}>request Biodata Id</label>
      </div>

      <div className="relative h-11 w-full min-w-[200px] mb-5">
        <input
          name="amount"
          type="text"
          className={formInputStyle}
          defaultValue={"500"}
          required
          readOnly
        />
        <label className={formLabelStyle}>Payment Amount</label>
      </div>

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
      ></CardElement>
      <button
        className=" btn btn-sm btn-primary my-4"
        type="submit"
        // disabled={!stripe || !clientSecret}
      >
        Make Payment
      </button>
      <p className=" text-red-600">{error}</p>
      {transactionId && (
        <p className=" text-green-600">Your transaction ID: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckOutForm;

CheckOutForm.propTypes = {
  props: PropTypes.any,
};
