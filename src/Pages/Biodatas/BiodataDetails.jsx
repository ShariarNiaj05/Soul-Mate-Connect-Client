import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import useBiodata from "../../Hooks/useBiodata";

const BiodataDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  // details biodata
  const { data: biodataDetails = {}, isLoading: biodataDetailsLoading } =
    useQuery({
      queryKey: ["biodata-details"],
      queryFn: async () => {
        const res = await axiosSecure(`/biodata-details/${id}`);
        return res.data;
      },
    });

  // similar bio data filter
  const [biodatas, isLoading, refetch] = useBiodata();

  const similarBiodata = biodatas.filter(
    (similarBiodata) =>
      similarBiodata.biodataType === biodataDetails.biodataType
  );

  console.log(similarBiodata);
  //   console.log(biodataDetails);
  return (
    <div className=" flex flex-col lg:flex-row gap-5">
      <div className=" flex-1 p-3">
        {/* e biodata details information on the left side */}
        <div className="bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src="https://cdn0.weddingwire.in/article/6998/3_2/1280/jpg/28996-matrimonial-services-dipak-studious-lead-image.webp"
              className="rounded-xl max-h-96 w-full object-contain"
            />
          </figure>
          <div className="items-center text-center">
            <h2 className="">Name: {biodataDetails.name}</h2>
            <p>biodataId: {biodataDetails.biodataId}</p>
            <p>biodataType,: {biodataDetails.biodataType}</p>
            <p>permanentDivision: {biodataDetails.permanentDivision}</p>
            <p>presentDivision: {biodataDetails.presentDivision}</p>
            <p>age: {biodataDetails.age}</p>
            <p>occupation: {biodataDetails.occupation}</p>
            <p>dateOfBirth: {biodataDetails.dateOfBirth}</p>
            <p>height: {biodataDetails.height}</p>
            <p>weight: {biodataDetails.weight}</p>
            <p>race: {biodataDetails.race}</p>
            <p>fathersName: {biodataDetails.fathersName}</p>
            <p>mothersName: {biodataDetails.mothersName}</p>
            <p>expectedPartnerAge: {biodataDetails.expectedPartnerAge}</p>
            <p>expectedPartnerHeight: {biodataDetails.expectedPartnerHeight}</p>
            <p>expectedPartnerWeight: {biodataDetails.expectedPartnerWeight}</p>
            <p>email: {biodataDetails.email}</p>
            <p>mobileNumber: {biodataDetails.mobileNumber}</p>
            <div className="">
              <Button variant="contained">Add to Favourites</Button>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex-1">
        {/* Show the similar biodata based on user gender .When the
details biodata gender is male then show the male biodata .
 */}
        <div className=" grid grid-cols-2 gap-5">
          {similarBiodata.map((singleSimilarBiodata) => (
            <div
              key={singleSimilarBiodata._id}
              className="w-96 bg-base-100 shadow-xl"
            >
              <figure>
                <img
                  src={singleSimilarBiodata.profileImage}
                  
                />
              </figure>
              <div className="">
                      <h2 className="">Biodata Id: { singleSimilarBiodata.biodataId}</h2>
                      <p>occupation: { singleSimilarBiodata.occupation}</p>
                      <p>age: { singleSimilarBiodata.age}</p>
                      <p>dateOfBirth: { singleSimilarBiodata.dateOfBirth}</p>
                      <p>height: { singleSimilarBiodata.height}</p>
               
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BiodataDetails;

BiodataDetails.propTypes = {
  props: PropTypes.any,
};
