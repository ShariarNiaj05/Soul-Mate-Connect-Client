import { Container, Typography } from "@mui/material";
import PropTypes from "prop-types";

const Contact = () => {
  return (
    <Container>
      <Typography align="center" variant="h2" color={"primary"} mb={5}>
        Contact Us
      </Typography>
      <div>
        <p>
          Have questions, suggestions, or just want to say hello? We'd love to
          hear from you! At Soul Mate Connect, we value your feedback and are
          here to assist you.
        </p>
      </div>
    </Container>
  );
};

export default Contact;

Contact.propTypes = {
  props: PropTypes.any,
};
