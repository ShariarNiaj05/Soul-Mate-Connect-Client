import { Button } from '@mui/material';
import PropTypes from 'prop-types'
 
const ApprovedPremium = () => {
   
 return (
   <table>
   <thead className=" flex justify-center mt-10">
     <tr className=" flex justify-between gap-5 text-center">
       <th>Name</th>
       <th>Biodata Id</th>
       <th>Permanent Address</th>
       <th>Occupation</th>
       <th>Action</th>
     </tr>
   </thead>
   <tbody className=" flex justify-center mt-5">
     {/* table data row  */}
     <div>
       <tr className=" flex justify-between gap-5 text-center mb-10">
         <td>{"singleFavouriteBiodata.personName"}</td>
         <td>{"singleFavouriteBiodata.biodataId"}</td>
         <td>{"singleFavouriteBiodata.permanentAddress"}</td>
         <td>{"singleFavouriteBiodata.PersonOccupation"}</td>
         <Button variant="contained" color="secondary">
           Delete
         </Button>
       </tr>
     </div>
   </tbody>
 </table>
 )
}
 
export default ApprovedPremium
 
 
ApprovedPremium.propTypes = {
 
 props: PropTypes.any, 
};