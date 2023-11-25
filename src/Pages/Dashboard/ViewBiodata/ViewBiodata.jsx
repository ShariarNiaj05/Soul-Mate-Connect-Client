import { Button, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Select from "react-select";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const formInputStyle =
  "peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border  placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50";

const formLabelStyle =
  "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500";
const ViewBiodata = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [myBiodata, setMyBiodata] = useState({});

  useEffect(() => {
    setTimeout(async () => {
      const res = await axiosSecure.get(`/biodatas/${user?.email}`);
      setMyBiodata(res.data);
    }, 500);
  }, [axiosSecure, user?.email]);

  const handlePremium = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "To proceed for premium member!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Request for Premium!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updateResponse = await axiosSecure.patch(
          `/biodatas/status/${myBiodata._id}`,
          { biodataStatus: "requested for premium" }
          );
          console.log(updateResponse);
        if (updateResponse.data.modifiedCount > 0) {
          Swal.fire({
            title: "Requested!",
            text: "Request sent to the admin. Please wait for approval.",
            icon: "success",
          });
          
        }
      }
    });
  };
  return (
    <Grid>
      <Typography align="center" variant="h3" color={"primary"}>
        View & Update to Premium
      </Typography>
      <div>
        <div className=" flex flex-col gap-3">
          {/* name  */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="name"
              type="text"
              className={formInputStyle}
              defaultValue={user?.displayName}
              required
              readOnly
            />
            <label className={formLabelStyle}>Name</label>
          </div>
          {/* email  */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="email"
              type="email"
              className={formInputStyle}
              defaultValue={user?.email}
              required
              readOnly
            />
            <label className={formLabelStyle}>Email</label>
          </div>
          {/* biodata type  */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="email"
              type="email"
              className={formInputStyle}
              defaultValue={myBiodata.biodataType}
              required
              readOnly
            />
            <label className={formLabelStyle}>biodata type</label>
          </div>
          {/* profileImage, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="profileImage"
              type="text"
              className={formInputStyle}
              defaultValue={user?.photoURL}
              required
              readOnly
            />
            <label className={formLabelStyle}>Image Link</label>
          </div>

          {/* permanentDivision, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="email"
              type="email"
              className={formInputStyle}
              defaultValue={myBiodata.permanentDivision}
              required
              readOnly
            />
            <label className={formLabelStyle}>permanentDivision</label>
          </div>
          {/* presentDivision, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="email"
              type="email"
              className={formInputStyle}
              defaultValue={myBiodata.presentDivision}
              required
              readOnly
            />
            <label className={formLabelStyle}>presentDivision</label>
          </div>
          {/* age, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="age"
              type="number"
              className={formInputStyle}
              defaultValue={myBiodata.age}
              required
              readOnly
            />
            <label className={formLabelStyle}>Age</label>
          </div>
          {/* occupation, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="email"
              type="email"
              className={formInputStyle}
              defaultValue={myBiodata.occupation}
              required
              readOnly
            />
            <label className={formLabelStyle}>occupation</label>
          </div>
          {/* dateOfBirth, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="email"
              type="email"
              className={formInputStyle}
              defaultValue={myBiodata.dateOfBirth}
              required
              readOnly
            />
            <label className={formLabelStyle}>Date Of Birth</label>
          </div>
          {/* height */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="email"
              type="email"
              className={formInputStyle}
              defaultValue={myBiodata.height}
              required
              readOnly
            />
            <label className={formLabelStyle}>height</label>
          </div>
          {/* weight, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="email"
              type="email"
              className={formInputStyle}
              defaultValue={myBiodata.weight}
              required
              readOnly
            />
            <label className={formLabelStyle}>weight</label>
          </div>
          {/* race, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="email"
              type="email"
              className={formInputStyle}
              defaultValue={myBiodata.race}
              required
              readOnly
            />
            <label className={formLabelStyle}>race</label>
          </div>
          {/* fathersName, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="fathersName"
              type="text"
              className={formInputStyle}
              defaultValue={myBiodata.fathersName}
              required
              readOnly
            />
            <label className={formLabelStyle}>fathersName</label>
          </div>
          {/* mothersName, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="mothersName"
              type="text"
              className={formInputStyle}
              defaultValue={myBiodata.mothersName}
              required
              readOnly
            />
            <label className={formLabelStyle}>mothersName</label>
          </div>
          {/* expectedPartnerAge, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="expectedPartnerAge"
              type="text"
              className={formInputStyle}
              defaultValue={myBiodata.expectedPartnerAge}
              required
              readOnly
            />
            <label className={formLabelStyle}>expectedPartnerAge</label>
          </div>
          {/* expectedPartnerHeight, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="expectedPartnerAge"
              type="text"
              className={formInputStyle}
              defaultValue={myBiodata.expectedPartnerHeight}
              required
              readOnly
            />
            <label className={formLabelStyle}>expectedPartnerHeight</label>
          </div>
          {/* expectedPartnerWeight, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="expectedPartnerAge"
              type="text"
              className={formInputStyle}
              defaultValue={myBiodata.expectedPartnerWeight}
              required
              readOnly
            />
            <label className={formLabelStyle}>expectedPartnerWeight</label>
          </div>
          {/* mobileNumber, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="mobileNumber"
              type="text"
              className={formInputStyle}
              defaultValue={myBiodata.mobileNumber}
              required
              readOnly
            />
            <label className={formLabelStyle}>mobileNumber</label>
          </div>
          {/* submit or update button  */}
          <div className=" flex justify-evenly mt-5">
            <Button
              onClick={handlePremium}
              variant="contained"
              color="secondary"
            >
              Make Biodata Premium
            </Button>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default ViewBiodata;

ViewBiodata.propTypes = {
  props: PropTypes.any,
};
