import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import useAuth from "../../../Hooks/useAuth";
import Select from "react-select";

const formInputStyle =
  "peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border  placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50";

const formLabelStyle =
  "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500";

const biodataTypeOption = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];
const permanentDivisionOption = [
  { value: "dhaka", label: "Dhaka" },
  { value: "chattagram", label: "Chattagram" },
  { value: "rangpur", label: "Rangpur" },
  { value: "barisal", label: "Barisal" },
  { value: "khulna", label: "Khulna" },
  { value: "maymansign", label: "Maymansign" },
  { value: "sylhet", label: "Sylhet" },
];

const Checkbox = ({ children, ...props }) => (
  <label style={{ marginRight: "1em" }}>
    <input type="checkbox" {...props} />
    {children}
  </label>
);

const EditBiodata = () => {
  const { user } = useAuth();
  const handleSubmitBiodata = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = user?.displayName;
    const email = user?.email;
    const biodataType = form.biodataType.value;
    const profileImage = user?.photoURL;
    const permanentDivision = form.permanentDivision.value;
    const presentDivision = form.presentDivision.value;
    const age = form.age.value;
    const occupation = form.occupation.value;
    const dateOfBirth = form.dateOfBirth.value;
    const height = form.height.value;
    const weight = form.weight.value;
    const race = form.race.value;
    const fathersName = form.fathersName.value;
    const mothersName = form.mothersName.value;
    const expectedPartnerAge = form.expectedPartnerAge.value;
    const expectedPartnerHeight = form.expectedPartnerHeight.value;
    const expectedPartnerWeight = form.expectedPartnerWeight.value;
    const mobileNumber = form.mobileNumber.value;

    const biodataInfo = {
      email,
      biodataType,
      name: name,
      profileImage,
    //   permanentDivision,
    //   presentDivision,
    //   age,
    //   occupation,
    //   dateOfBirth,
    //   height,
    //   weight,
    //   race,
    //   fathersName,
    //   mothersName,
    //   expectedPartnerAge,
    //   expectedPartnerHeight,
    //   expectedPartnerWeight,
    //   mobileNumber,
    };
    console.log(biodataInfo);
  };
  return (
    <Grid>
      <Typography align="center" variant="h3" color={"primary"}>
        Edit or Create Your Biodata
      </Typography>
      <div>
        <form onSubmit={handleSubmitBiodata} className=" flex flex-col gap-3">
          {/* name  */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="name"
              type="text"
              className={formInputStyle}
              defaultValue={user?.displayName}
              required
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
            <Select
              className=""
              classNamePrefix="select"
              defaultValue={biodataTypeOption[0]}
              name="biodataType"
              options={biodataTypeOption}
              required
            />
            <label className={formLabelStyle}></label>
          </div>
          {/* profileImage, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="profileImage"
              type="text"
              className={formInputStyle}
              defaultValue={user?.photoURL}
              required
            />
            <label className={formLabelStyle}>Image Link</label>
          </div>

          {/* permanentDivision, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <Select
              className=""
              classNamePrefix="select"
              defaultValue={biodataTypeOption[0]}
              name="biodataType"
              options={biodataTypeOption}
              required
            />
            <label className={formLabelStyle}></label>
          </div>
          {/* presentDivision, */}
          <div className="relative h-11 w-full min-w-[200px]">
           
            <label className={formLabelStyle}></label>
          </div>
          {/* age, */}
          <div className="relative h-11 w-full min-w-[200px]">
          <input
              name="profileImage"
              type="text"
              className={formInputStyle}
              defaultValue={user?.photoURL}
              required
            />
           <label className={formLabelStyle}></label>
         </div>
          {/* occupation, */}
          <div className="relative h-11 w-full min-w-[200px]">
          <Select
              className=""
              classNamePrefix="select"
              defaultValue={biodataTypeOption[0]}
              name="biodataType"
              options={biodataTypeOption}
              required
            />
           <label className={formLabelStyle}></label>
         </div>
          {/* dateOfBirth, */}
          <div className="relative h-11 w-full min-w-[200px]">
           <input type="date" name="" id="" />
           <label className={formLabelStyle}></label>
         </div>
          {/* height, */}
          <div className="relative h-11 w-full min-w-[200px]">
          <Select
              className=""
              classNamePrefix="select"
              defaultValue={biodataTypeOption[0]}
              name="biodataType"
              options={biodataTypeOption}
              required
            />
           <label className={formLabelStyle}></label>
         </div>
          {/* weight, */}
          <div className="relative h-11 w-full min-w-[200px]">
          <Select
              className=""
              classNamePrefix="select"
              defaultValue={biodataTypeOption[0]}
              name="biodataType"
              options={biodataTypeOption}
              required
            />
           <label className={formLabelStyle}></label>
         </div>
          {/* race, */}
          <div className="relative h-11 w-full min-w-[200px]">
          <Select
              className=""
              classNamePrefix="select"
              defaultValue={biodataTypeOption[0]}
              name="biodataType"
              options={biodataTypeOption}
              required
            />
           <label className={formLabelStyle}></label>
         </div>
          {/* fathersName, */}
          <div className="relative h-11 w-full min-w-[200px]">
           
           <label className={formLabelStyle}></label>
         </div>
          {/* mothersName, */}
          <div className="relative h-11 w-full min-w-[200px]">
           
           <label className={formLabelStyle}></label>
         </div>
          {/* expectedPartnerAge, */}
          <div className="relative h-11 w-full min-w-[200px]">
          
           <label className={formLabelStyle}></label>
         </div>
          {/* expectedPartnerHeight, */}
          <div className="relative h-11 w-full min-w-[200px]">
          <Select
              className=""
              classNamePrefix="select"
              defaultValue={biodataTypeOption[0]}
              name="biodataType"
              options={biodataTypeOption}
              required
            />
           <label className={formLabelStyle}></label>
         </div>
          {/* expectedPartnerWeight, */}
          <div className="relative h-11 w-full min-w-[200px]">
          <Select
              className=""
              classNamePrefix="select"
              defaultValue={biodataTypeOption[0]}
              name="biodataType"
              options={biodataTypeOption}
              required
            />
           <label className={formLabelStyle}></label>
         </div>
          {/* mobileNumber, */}
          <div className="relative h-11 w-full min-w-[200px]">
           
           <label className={formLabelStyle}></label>
         </div>
          {/* submit or update button  */}
          <div className=" flex justify-evenly mt-5">
            <input
              type="submit"
              value="Create"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            />
            <input
              type="submit"
              value="Save"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            />
          </div>
        </form>
      </div>
    </Grid>
  );
};

export default EditBiodata;

EditBiodata.propTypes = {
  props: PropTypes.any,
};
