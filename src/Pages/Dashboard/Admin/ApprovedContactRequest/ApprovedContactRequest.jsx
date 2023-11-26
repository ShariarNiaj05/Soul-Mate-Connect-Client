import { Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ApprovedContactRequest = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: requestForApproval = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["contact-request"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contact-request`);
      return res?.data;
    },
  });

  const handleApproved = async (id) => {
    const res = await axiosSecure.patch(`/contact-request/${id}`)
    console.log(res);
    if (res?.data?.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Contact request has been updated",
        showConfirmButton: false,
        timer: 1500
      });
      refetch()
    }
  };
  if (isLoading) {
    return <p>loading..........</p>;
  }
  return (
    <table>
      <Typography align="center" variant="h3" color={"primary"}>
        Approve Contact Request
      </Typography>
      <thead className=" flex justify-center mt-10">
        <tr className=" flex justify-between gap-5 text-center">
          <th>Name</th>
          <th>Email</th>
          <th>Biodata Id</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody className=" flex justify-center mt-5">
        <div>
          {requestForApproval.map((item) => (
            <tr
              key={item._id}
              className=" flex justify-between gap-5 text-center mb-10"
            >
              <td>{item.requestName}</td>
              <td>{item.requestEmail}</td>
              <td>{item.requestBiodataId}</td>
              <Button
                onClick={() => handleApproved(item._id)}
                variant="contained"
                color="secondary"
              >
                Approve Request
              </Button>
            </tr>
          ))}
        </div>
      </tbody>
    </table>
  );
};

export default ApprovedContactRequest;

ApprovedContactRequest.propTypes = {
  props: PropTypes.any,
};
