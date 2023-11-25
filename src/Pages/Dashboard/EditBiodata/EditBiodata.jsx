import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import useAuth from "../../../Hooks/useAuth";
import Select from "react-select";
import Swal from 'sweetalert2'
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

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
const occupationOption = [
  { value: "student", label: "Student" },
  { value: "job", label: "Job" },
  { value: "rangpur", label: "Rangpur" },
  { value: "doctor", label: "Doctor" },
  { value: "teacher", label: "Teacher" },
  { value: "rangpur", label: "Rangpur" },
  { value: "architect", label: "Architect" },
  { value: "lawyer", label: "Lawyer" },
  { value: "engineer", label: "Engineer" },
];
const expectedPartnerHeightOption = [
  { value: "150", label: "150" },
  { value: "155", label: "155" },
  { value: "160", label: "160" },
  { value: "165", label: "165" },
  { value: "170", label: "170" },
  { value: "175", label: "175" },
  { value: "180", label: "180" },
  { value: "185", label: "185" },
  { value: "190", label: "190" },
];
const expectedPartnerWeightOption = [
  { value: "55", label: "55" },
  { value: "60", label: "60" },
  { value: "65", label: "65" },
  { value: "70", label: "70" },
  { value: "75", label: "75" },
  { value: "80", label: "80" },
  { value: "85", label: "85" },
  { value: "90", label: "90" },
  { value: "95", label: "95" },
];

const raceOptions = [
  { value: "asian", label: "Asian" },
  { value: "caucasian", label: "Caucasian" },
  { value: "south_asian", label: "South Asian" },
  { value: "middle_eastern", label: "Middle Eastern" },
  { value: "european", label: "European" },
  { value: "african", label: "African" },
  { value: "east_asian", label: "East Asian" },
];

const Checkbox = ({ children, ...props }) => (
  <label style={{ marginRight: "1em" }}>
    <input type="checkbox" {...props} />
    {children}
  </label>
);

const EditBiodata = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()


  const handleSubmitBiodata =  async(e) => {
    e.preventDefault();
    const form = e.target;
    const name = user?.displayName;
    const email = user?.email;
    const biodataType = form.biodataType.value;
    const profileImage = user?.photoURL;
    const permanentDivision = form.permanentDivision.value;
    const presentDivision = form.presentDivision.value;
    const age = parseInt(form.age.value);
    const occupation = form.occupation.value;
    const dateOfBirth = form.dateOfBirth.value;
    const height = parseInt(form.height.value);
    const weight = parseInt(form.weight.value);
    const race = form.race.value;
    const fathersName = form.fathersName.value;
    const mothersName = form.mothersName.value;
    const expectedPartnerAge = parseInt(form.expectedPartnerAge.value);
    const expectedPartnerHeight = parseInt(form.expectedPartnerHeight.value);
    const expectedPartnerWeight = parseInt(form.expectedPartnerWeight.value);
    const mobileNumber = form.mobileNumber.value;

    const biodataInfo = {
      email,
      biodataType,
      name: name,
      profileImage,
      permanentDivision,
      presentDivision,
      age,
      occupation,
      dateOfBirth,
      height,
      weight,
      race,
      fathersName,
      mothersName,
      expectedPartnerAge,
      expectedPartnerHeight,
      expectedPartnerWeight,
      mobileNumber,
      biodataStatus: "basic",
    };
    const {data} = await axiosSecure.put('/biodatas', biodataInfo)
    
    
    console.log(data);
    if (data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Biodata Created Successfully",
        showConfirmButton: false,
        timer: 1500
      });
    }
    if (data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Biodata Updated Successfully",
        showConfirmButton: false,
        timer: 1500
      });
    }
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
            />
            <label className={formLabelStyle}>Image Link</label>
          </div>

          {/* permanentDivision, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <Select
              className=""
              classNamePrefix="select"
              defaultValue={permanentDivisionOption[0]}
              name="permanentDivision"
              options={permanentDivisionOption}
              required
            />
            <label className={formLabelStyle}>permanentDivision</label>
          </div>
          {/* presentDivision, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <Select
              className=""
              classNamePrefix="select"
              defaultValue={permanentDivisionOption[0]}
              name="presentDivision"
              options={permanentDivisionOption}
              required
            />
            <label className={formLabelStyle}>presentDivision</label>
          </div>
          {/* age, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="age"
              type="number"
              className={formInputStyle}
              defaultValue={"25"}
              required
            />
            <label className={formLabelStyle}>Age</label>
          </div>
          {/* occupation, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <Select
              className=""
              classNamePrefix="select"
              defaultValue={occupationOption[0]}
              name="occupation"
              options={occupationOption}
              required
            />
            <label className={formLabelStyle}>occupation</label>
          </div>
          {/* dateOfBirth, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input type="date" name="dateOfBirth" id="" required/>
            <label className={formLabelStyle}>Date Of Birth</label>
          </div>
          {/* height */}
          <div className="relative h-11 w-full min-w-[200px]">
            <Select
              className=""
              classNamePrefix="select"
              defaultValue={expectedPartnerHeightOption[0]}
              name="height"
              options={expectedPartnerHeightOption}
              required
            />
            <label className={formLabelStyle}>height</label>
          </div>
          {/* weight, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <Select
              className=""
              classNamePrefix="select"
              defaultValue={expectedPartnerWeightOption[0]}
              name="weight"
              options={expectedPartnerWeightOption}
              required
            />
            <label className={formLabelStyle}>weight</label>
          </div>
          {/* race, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <Select
              className=""
              classNamePrefix="select"
              defaultValue={raceOptions[0]}
              name="race"
              options={raceOptions}
              required
            />
            <label className={formLabelStyle}>race</label>
          </div>
          {/* fathersName, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="fathersName"
              type="text"
              className={formInputStyle}
              required
            />
            <label className={formLabelStyle}>fathersName</label>
          </div>
          {/* mothersName, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="mothersName"
              type="text"
              className={formInputStyle}
              
              required
            />
            <label className={formLabelStyle}>mothersName</label>
          </div>
          {/* expectedPartnerAge, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              name="expectedPartnerAge"
              type="text"
              className={formInputStyle}
              defaultValue={"25"}
              required
            />
            <label className={formLabelStyle}>expectedPartnerAge</label>
          </div>
          {/* expectedPartnerHeight, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <Select
              className=""
              classNamePrefix="select"
              defaultValue={expectedPartnerHeightOption[0]}
              name="expectedPartnerHeight"
              options={expectedPartnerHeightOption}
              required
            />
            <label className={formLabelStyle}>expectedPartnerHeight</label>
          </div>
          {/* expectedPartnerWeight, */}
          <div className="relative h-11 w-full min-w-[200px]">
            <Select
              className=""
              classNamePrefix="select"
              defaultValue={expectedPartnerWeightOption[0]}
              name="expectedPartnerWeight"
              options={expectedPartnerWeightOption}
              required
            />
            <label className={formLabelStyle}>expectedPartnerWeight</label>
          </div>
          {/* mobileNumber, */}
          <div className="relative h-11 w-full min-w-[200px]">
          <input
              name="mobileNumber"
              type="text"
              className={formInputStyle}
              
              required
            />
            <label className={formLabelStyle}>mobileNumber</label>
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
