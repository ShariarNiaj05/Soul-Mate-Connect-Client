import { Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PremiumMemberProfiles = () => {
  const [premiumBiodatas, setPremiumBiodatas] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get("/premium-biodatas")
      .then((res) => setPremiumBiodatas(res.data));
  }, [axiosPublic]);

  return (
    <div className=" max-w-screen-xl mx-auto my-10 ">
      <Typography align="center" variant="h3" color={"primary"}>
        Premium Members
      </Typography>

      <div className=" my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {premiumBiodatas.map((premiumBiodata) => (
          <div
            key={premiumBiodata._id}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src={premiumBiodata.profileImage}
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Name: {premiumBiodata.name}
              </h5>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Biodata ID: {premiumBiodata.biodataId}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Biodata Type: {premiumBiodata.biodataType}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Age: {premiumBiodata.age}
              </span>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Permanent Division: {premiumBiodata.permanentDivision}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Occupation: {premiumBiodata.occupation}
              </p>
              <Link to={`/biodata-details/${premiumBiodata._id}`}>
                <Button variant="contained" color="primary">
                  View Profile
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumMemberProfiles;

PremiumMemberProfiles.propTypes = {
  props: PropTypes.any,
};
