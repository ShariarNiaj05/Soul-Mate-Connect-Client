import { Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ApprovedPremium = () => {
  const [allBiodata, setAllBiodata] = useState([]);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure()
  useEffect(() => {
    setTimeout(async () => {
      const res = await axiosPublic.get(`/biodatas`);
      setAllBiodata(res.data);
    }, 500);
  }, [axiosPublic]);
  
  const handleMakePremium = async (id) => {
    const res = await axiosSecure.patch(`/biodata/make-premium/${id}`)
    if (res?.data?.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Biodata Updated To Premium",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
  return (
    <table>
      <Typography align="center" variant="h3" color={"primary"}>
        Premium Approval Request
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
          {allBiodata.map(
            (biodata) =>
              biodata.biodataStatus === "requested for premium" && (
                <tr
                  key={biodata._id}
                  className=" flex justify-between gap-5 text-center mb-10"
                >
                  <td>{biodata?.name}</td>
                  <td>{biodata?.email}</td>
                  <td>{biodata?.biodataId}</td>
                  <Button onClick={() => handleMakePremium(biodata._id)} variant="contained" color="secondary">
                    Make Premium
                  </Button>
                </tr>
              )
          )}
        </div>
      </tbody>
    </table>
  );
};

export default ApprovedPremium;

ApprovedPremium.propTypes = {
  props: PropTypes.any,
};
