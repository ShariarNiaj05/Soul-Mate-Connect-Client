import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import image1 from "../../../assets/banner/banner1.jpg";
import image2 from "../../../assets/banner/banner2.jpg";
import image3 from "../../../assets/banner/banner3.jpg";
import { Container, Grid } from "@mui/material";
const Banner = () => {
  return (
    <Container sx={{ maxHeight: "800px" }}>
      <Carousel className=" text-center">
        <Grid sx={{ height: "600px" }}>
          <img style={{ height: "100", maxWidth: "100%" }} src={image1} />
        </Grid>
        <Grid sx={{ height: "600px" }}>
          <img style={{ height: "100", maxWidth: "100%" }} src={image2} />
        </Grid>
        <Grid sx={{ height: "600px" }}>
          <img style={{ height: "100", maxWidth: "100%" }} src={image3} />
        </Grid>
      </Carousel>
    </Container>
  );
};

export default Banner;

Banner.propTypes = {
  props: PropTypes.any,
};
