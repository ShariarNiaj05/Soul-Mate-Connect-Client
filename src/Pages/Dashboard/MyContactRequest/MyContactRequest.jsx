import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Typography } from "@mui/material";

const MyContactRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: requestedBiodatas } = useQuery({
    queryKey: ["requested-Biodata", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res?.data;
    },
  });
  console.log(requestedBiodatas);

  return (
    <div>
      <Typography align="center" variant="h3" color={"primary"}>
        My Contact Request
      </Typography>
      I am available from MyContactRequest
    </div>
  );
};

export default MyContactRequest;

MyContactRequest.propTypes = {
  props: PropTypes.any,
};
