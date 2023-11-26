import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useBiodata from "../../../Hooks/useBiodata";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const MyContactRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [allRequestedBiodatas, setAllRequestedBiodatas] = useState([]);

  const { data: allBiodatas } = useQuery({
    queryKey: ["all-biodatas"],
    queryFn: async () => {
      const res = await axiosPublic.get("/biodatas");
      // console.log(res.data);
      return res.data;
    },
  });

  const {
    data: requestedBiodatas = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["requested-Biodata", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res?.data;
    },
  });

  //   useEffect(() => {
  //     setAllRequestedBiodatas(requestedBiodatas);
  //   }, [requestedBiodatas]);

  if (isLoading) {
    return <p>loading..........</p>;
  }

  //   const matchedBiodatas = allBiodatas.filter((biodata) =>
  //     allRequestedBiodatas.some(
  //       (requestedBiodata) =>
  //         biodata.biodataId === requestedBiodata.requestBiodataId
  //     )
  //   );

  const handleDelete = async (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/contact-request/${id}`);
        console.log(res);
        if (res?.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your Favourite biodata has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };
  //   console.log(matchedBiodatas);

  return (
    <div>
      <Typography align="center" variant="h3" color={"primary"}>
        My Contact Request
      </Typography>
      <div>
        <table>
          <thead className=" flex justify-center mt-10">
            <tr className=" flex justify-between gap-5 text-center">
              <th>Name</th>
              <th>Biodata Id</th>
              <th>Status</th>
              <th>Mobile Number</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className=" flex justify-center mt-5">
            <div>
              {requestedBiodatas?.map((requestedBiodata) => (
                <tr
                  key={requestedBiodata._id}
                  className=" flex justify-between gap-5 text-center mb-10"
                >
                  <td>{requestedBiodata.requestName}</td>
                  <td>{requestedBiodata.requestBiodataId}</td>

                  <td>{requestedBiodata.status}</td>
                  <td>{requestedBiodata.status === 'approved' ? requestedBiodata.requestMobileNumber : <p>Please wait for admin approval</p>}</td>
                  <td>{requestedBiodata.status === 'approved' ? requestedBiodata.requestEmail : <p>Please wait for admin approval</p>}</td>
                  <Button
                    onClick={() => handleDelete(requestedBiodata._id)}
                    variant="contained"
                    color="secondary"
                  >
                    Delete
                  </Button>
                </tr>
              ))}
            </div>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyContactRequest;

MyContactRequest.propTypes = {
  props: PropTypes.any,
};
