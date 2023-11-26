import PropTypes from 'prop-types'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Typography } from '@mui/material';
import CheckOutForm from './CheckOutForm';
import { useParams } from 'react-router-dom';
const Payment = () => {
    const {biodataId: requestedBiodataId} = useParams()
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
    
    console.log(requestedBiodataId);
 return (
     <div> 
         <Typography align='center' variant='h3' color={'primary'}>Make Your Payment</Typography>
         
         <Elements stripe={stripePromise}>
          <CheckOutForm></CheckOutForm>
        </Elements>
    </div>
 )
}
 
export default Payment
 
 
Payment.propTypes = {
 
 props: PropTypes.any, 
};