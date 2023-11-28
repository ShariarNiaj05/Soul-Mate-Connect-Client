import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link, useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
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
    <div className=" flex flex-col lg:flex-row gap-5 p-3">
      <div className=" flex-1 p-3">
      <Typography align='center' variant='h3' color={'primary'}>Details Information</Typography>
        {/* e biodata details information on the left side */}
        <div className="bg-base-100 shadow-xl">
          <div className="flex gap-2 justify-center items-center mb-3">
            <div>
              <figure className="px-10 pt-10">
                <img
                  src={biodataDetails?.profileImage}
                  className="rounded-xl max-h-96 w-full object-contain"
                />
              </figure>
            </div>
            <div>
              <h2 className="">Name: {biodataDetails.name}</h2>
              <p>Biodata Id: {biodataDetails.biodataId}</p>
              <p>Biodata Type,: {biodataDetails.biodataType}</p>
              <p>Permanent Division: {biodataDetails.permanentDivision}</p>
              <p>Present Division: {biodataDetails.presentDivision}</p>
              <p>Age: {biodataDetails.age}</p>
              <p>Occupation: {biodataDetails.occupation}</p>
              <p>Date Of Birth: {biodataDetails.dateOfBirth}</p>
              <p>Height: {biodataDetails.height}</p>
              <p>Weight: {biodataDetails.weight}</p>
              <p>Race: {biodataDetails.race}</p>
              <p>Fathers Name: {biodataDetails.fathersName}</p>
              <p>Mothers Name: {biodataDetails.mothersName}</p>
            </div>
          </div>
          <div className="items-center text-center">
            <p>Expected Partner Age: {biodataDetails.expectedPartnerAge}</p>
            <p>Expected Partner Height: {biodataDetails.expectedPartnerHeight}</p>
            <p>Expected Partner Weight: {biodataDetails.expectedPartnerWeight}</p>
            <p>
              Email:
              {userRole === "premium" ? (
                biodataDetails.email
              ) : (
                <Link to={`/dashboard/checkout/${biodataDetails.biodataId}`}>
                  <Button>Request Contact Information</Button>
                </Link>
              )}
            </p>
            <p>
              Mobile Number:
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
        <div className=" grid grid-cols-2 gap-5 p-3">
          {similarBiodata.map((singleSimilarBiodata) => (
            <div
              key={singleSimilarBiodata._id}
              className=" bg-base-100 shadow-xl flex gap-3 justify-center items-center"
            >
              <div>
                <figure>
                  <img
                    src={singleSimilarBiodata.profileImage}
                    className=" max-h-48"
                  />
                </figure>
              </div>
              <div className="">
                <h2 className="">
                  Biodata Id: {singleSimilarBiodata.biodataId}
                </h2>
                <p>Occupation: {singleSimilarBiodata.occupation}</p>
                <p>Age: {singleSimilarBiodata.age}</p>
                <p>Date Of Birth: {singleSimilarBiodata.dateOfBirth}</p>
                <p>Height: {singleSimilarBiodata.height}</p>
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
