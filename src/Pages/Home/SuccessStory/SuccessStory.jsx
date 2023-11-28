import PropTypes from "prop-types";
import { CardMedia, Container, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const SuccessStory = () => {
  const [successStories, setSuccessStories] = useState([]);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    setTimeout(async () => {
      const res = await axiosPublic.get("/success-story");
      console.log(res);
      setSuccessStories(res.data);
    }, 500);
  }, [axiosPublic]);
  console.log(successStories);
  return (
    <div>
      <Typography align="center" variant="h3" color={"primary"}>
        Success Story
      </Typography>

      <>
        <Container>
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {successStories.map((successStory) => (
              <SwiperSlide key={successStory._id}>
                <div>
                  <Typography variant="h6" align="center">
                    {new Date(successStory.marriageDate).toLocaleDateString()}
                  </Typography>
                  <CardMedia
                    component="img"
                    height="400px"
                    sx={{ objectFit: "contain", maxHeight: "250px" }}
                    image={successStory.coupleImage}
                    alt="Paella dish"
                  />
                  <Typography sx={{ mb: 1.5, p: "60px" }}>
                    {successStory.successStoryText}
                  </Typography>
                  <Rating
                    style={{
                      maxWidth: 150,
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      justifySelf: "center",
                    }}
                    value={successStory.reviewStars}
                    readOnly
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </>
    </div>
  );
};

export default SuccessStory;

SuccessStory.propTypes = {
  props: PropTypes.any,
};
