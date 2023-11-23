import PropTypes from "prop-types";
// import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

const card = (
  <Grid>
    <Typography variant="h3" component="div" align="center">
      How Our Websites Work
    </Typography>
    <Grid
      container
      spacing={10}
      maxWidth={"xl"}
      mx={"auto"}
      display="flex"
      justifyContent="center"
    >
      <Grid item xs={12} md={6} lg={3}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Exclusive Access to Advanced Filters
          </Typography>
          <Typography variant="h5" component="div">
            Precision Partner Search
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Unlock the full potential of your search for the perfect life
            partner. The Premium Membership Card grants you exclusive access to
            advanced search filters, allowing you to tailor your search with
            precision. Find matches based on specific criteria such as
            education, profession, hobbies, and more. Your journey to lasting
            companionship begins with personalized and refined matchmaking.
          </Typography>
          <Typography variant="body2">
            Upgrade to Precision and Find Your Match Today
          </Typography>
        </CardContent>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Priority Listing and Visibility
          </Typography>
          <Typography variant="h5" component="div">
            Stand Out, Find Love
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Rise above the crowd with our Priority Listing feature. The Premium
            Membership Card ensures that your profile is prioritized, making it
            stand out to users actively seeking their life partners. Increase
            your visibility and maximize opportunities for meaningful
            connections. Elevate your profile to increase the chances of finding
            that special someone in this exclusive and prioritized matchmaking
            space.
          </Typography>
          <Typography variant="body2">
            Elevate Your Profile and Stand Out Now
          </Typography>
        </CardContent>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Enhanced Communication Privileges
          </Typography>
          <Typography variant="h5" component="div">
            Empowered Connections
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Take the lead in your journey to find love with enhanced
            communication privileges. The Premium Membership Card gives you
            exclusive rights to express interest, initiate conversations, and
            utilize advanced messaging tools. Forge meaningful connections by
            sending personalized messages. Experience a more engaging and
            rewarding matchmaking process with the power of enhanced
            communication at your fingertips
          </Typography>
          <Typography variant="body2">
            Unlock Enhanced Communication and Connect Today
          </Typography>
        </CardContent>
      </Grid>
    </Grid>
  </Grid>
);

const HowWorks = () => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
};

export default HowWorks;

HowWorks.propTypes = {
  props: PropTypes.any,
};
