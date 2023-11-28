import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import useBiodata from "../../Hooks/useBiodata";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const BiodataDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();

  const { data: userRole, isLoading: userRoleLoading } = useQuery({
    enabled: !!user?.email,
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);

      return res?.data?.role;
    },
  });

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

  const handleAddToFavourite = async () => {
    const favouritesBiodataInfo = {
      email: user?.email,
      biodataId: biodataDetails.biodataId,
      personName: biodataDetails.name,
      permanentAddress: biodataDetails.permanentDivision,
      PersonOccupation: biodataDetails.occupation,
    };

    const res = await axiosSecure.post("/favourites", favouritesBiodataInfo);
    if (res.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Biodata added to favourites collection",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if (biodataDetailsLoading || userRoleLoading || isLoading) {
    return <p>loading...................</p>;
  }
  console.log(userRole, biodatas);

  return (
    <div className=" flex flex-col lg:flex-row gap-5">
      <div className=" flex-1 p-3">
        {/* e biodata details information on the left side */}
        <div className="bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src={biodataDetails?.profileImage}
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
            <p>
              email:
              {userRole === "premium" ? (
                biodataDetails.email
              ) : (
                <Link to={`/dashboard/checkout/${biodataDetails.biodataId}`}>
                  <Button>Request Contact Information</Button>
                </Link>
              )}
            </p>
            <p>
              mobileNumber:
              {userRole === "premium" ? (
                biodataDetails.mobileNumber
              ) : (
                <Link to={`/dashboard/checkout/${biodataDetails.biodataId}`}>
                  <Button>Request Contact Information</Button>
                </Link>
              )}
            </p>
            <div className="">
              <Button onClick={handleAddToFavourite} variant="contained">
                Add to Favourites
              </Button>
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
                <img src={singleSimilarBiodata.profileImage} />
              </figure>
              <div className="">
                <h2 className="">
                  Biodata Id: {singleSimilarBiodata.biodataId}
                </h2>
                <p>occupation: {singleSimilarBiodata.occupation}</p>
                <p>age: {singleSimilarBiodata.age}</p>
                <p>dateOfBirth: {singleSimilarBiodata.dateOfBirth}</p>
                <p>height: {singleSimilarBiodata.height}</p>
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
