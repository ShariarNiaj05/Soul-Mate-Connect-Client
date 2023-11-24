import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";

const BiodataDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const { data: biodataDetails = {}, isLoading } = useQuery({
    queryKey: ["biodata-details"],
    queryFn: async () => {
      const res = await axiosSecure(`/biodata-details/${id}`);
      return res.data;
    },
  });
  console.log(biodataDetails);
  return (
    <div className=" flex flex-col lg:flex-row gap-5">
      <div className=" flex-1">
        {/* e biodata details information on the left side */}
        <div className="bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src="https://cdn0.weddingwire.in/article/6998/3_2/1280/jpg/28996-matrimonial-services-dipak-studious-lead-image.webp"
              
              className="rounded-xl"
            />
          </figure>
          <div className="items-center text-center">
            <h2 className="">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions">
              <button className="btn btn-primary">Add to Favourites</button>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex-1">
        {/* Show the similar biodata based on user gender .When the
details biodata gender is male then show the male biodata .
 */}
        <p>
          Show the similar biodata based on user gender .When the details
          biodata gender is male then show the male biodata .
        </p>
      </div>
    </div>
  );
};

export default BiodataDetails;

BiodataDetails.propTypes = {
  props: PropTypes.any,
};
