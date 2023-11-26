import PropTypes from 'prop-types'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Typography } from '@mui/material';
import CheckOutForm from './CheckOutForm';
import { useParams } from 'react-router-dom';
const Payment = () => {
    const {biodataId: requestedBiodataId} = useParams()
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

 return (
     <div> 
         <Typography align='center' variant='h3' color={'primary'}>Make Your Payment</Typography>
         
         <Elements stripe={stripePromise}>
          <CheckOutForm requestedBiodataId={requestedBiodataId}></CheckOutForm>
        </Elements>
    </div>
 )
}
 
export default Payment
 
 
Payment.propTypes = {
 
 props: PropTypes.any, 
};