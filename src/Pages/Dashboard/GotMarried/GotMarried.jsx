import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import Select from "react-select";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const GotMarried = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const startRatingoption = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];

  const formInputStyle =
    "peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border  placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50";

  const formLabelStyle =
    "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500";

  const handleSubmitSuccessStory = async (e) => {
    e.preventDefault();
    const form = e.target;
    const selfBiodataNumber = parseInt(form.selfBiodataNumber.value);
    const partnerBiodataNumber = parseInt(form.partnerBiodataNumber.value);
    const coupleImageLink = form.coupleImageLink.value;
    const successStoryReview = form.successStoryReview.value;
    const starRating = form.starRating.value;

    const marriageInfo = {
      selfBiodataNumber,
      partnerBiodataNumber,
      coupleImage: coupleImageLink,
      successStoryText: successStoryReview,
      reviewStars: parseInt(starRating),
      marriageDate: new Date(),
      marriageTimestamp: Date.now(),
    };
    console.log(marriageInfo);
    const { data } = await axiosSecure.post("/success-story", marriageInfo);

    if (data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Congratulation On Your Marriage",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <Typography align="center" variant="h3" color={"primary"}>
        Got Married
      </Typography>
      <div>
        <form
          onSubmit={handleSubmitSuccessStory}
          className=" flex flex-col gap-3"
        >
          {/* Self Biodata Number  */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="selfBiodataNumber"
              type="text"
              className={formInputStyle}
              required
            />
            <label className={formLabelStyle}>Your Biodata Number</label>
          </div>
          {/* Partner Biodata Number  */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="partnerBiodataNumber"
              type="text"
              className={formInputStyle}
              required
            />
            <label className={formLabelStyle}>Partner Biodata Number</label>
          </div>

          {/* Couple Image Link, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="coupleImageLink"
              type="text"
              className={formInputStyle}
              required
            />
            <label className={formLabelStyle}>Image Link</label>
          </div>

          {/* Success Story Review, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <textarea
              name="successStoryReview"
              type="text"
              className={formInputStyle}
              defaultValue={"Write your review"}
              required
            />
            <label className={formLabelStyle}>Success Story Review</label>
          </div>
          {/* star rating  */}
          <div className="relative h-11 w-full min-w-[200px] mt-2">
            <Select
              className=""
              classNamePrefix="select"
              defaultValue={startRatingoption[4]}
              name="starRating"
              options={startRatingoption}
              required
            />
            <label className={formLabelStyle}>Star Rating</label>
          </div>

          {/* submit  button  */}
          <div className=" flex justify-evenly mt-5">
            <input
              type="submit"
              value="Submit"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default GotMarried;

GotMarried.propTypes = {
  props: PropTypes.any,
};
