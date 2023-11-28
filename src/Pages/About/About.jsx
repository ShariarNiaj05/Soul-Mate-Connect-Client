import { Container, Typography } from "@mui/material";
import PropTypes from "prop-types";

const About = () => {
  return (
    <Container>
      <Typography align="center" variant="h2" color={"primary"} mb={5}>
        About Us
      </Typography>
      <div>
        <Typography align="left" variant="h4" color={"primary"}>
          Welcome to Soul Mate Connect
        </Typography>
        <p>
          Discovering your soulmate is a journey that begins with connection,
          and at Soul Mate Connect, we are dedicated to facilitating that
          extraordinary journey for you. Established with a deep understanding
          of the significance of finding a life partner, our platform strives to
          redefine the way people connect for a lifetime of love and
          companionship.
        </p>
      </div>
      <div>
        <Typography align="left" variant="h4" color={"primary"} mt={5}>
          Our Vision
        </Typography>
        <p>
          At Soul Mate Connect, we envision a world where every individual finds
          their perfect match, a companion with whom they can share life's joys
          and navigate its challenges. Our platform is designed to create
          meaningful connections, fostering the bonds that lead to lifelong
          partnerships.
        </p>
      </div>
      <div>
        <Typography align="left" variant="h4" color={"primary"} mt={5}> 
          Crafting Love Stories
        </Typography>
        <p>
          Since our inception, we've been crafting love stories that transcend
          time and distance. Our commitment is rooted in the belief that
          everyone deserves a chance at true happiness through a loving and
          supportive relationship. Soul Mate Connect is not just a platform;
          it's a sanctuary where hearts meet, and where the journey to love
          begins.
        </p>
      </div>
    </Container>
  );
};

export default About;

About.propTypes = {
  props: PropTypes.any,
};
