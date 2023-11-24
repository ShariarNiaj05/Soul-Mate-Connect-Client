import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'
 
const Footer = ({props}) => {
 return (
    <Grid>
       <Grid sx={{background: '#142959', py: 3 }}>
          <Typography align='center' color={'white'}>All Rights Reserved Soul Mate Connect</Typography>
       </Grid>
    </Grid>
 )
}
 
export default Footer
 
 
Footer.propTypes = {
 
 props: PropTypes.any, 
};