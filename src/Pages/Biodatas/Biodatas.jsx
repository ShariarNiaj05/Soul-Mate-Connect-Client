import PropTypes from "prop-types";
import useBiodata from "../../Hooks/useBiodata";
import { Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import useAuth from "../../Hooks/useAuth";

const Biodatas = () => {
  const [biodatas, setBiodatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState({
    minAge: "18",
    maxAge: "80",
    biodataType: "",
    division: "",
  });

  const axiosPublic = useAxiosPublic();

  // const [biodatas, isLoading, refetch] = useBiodata();

  const handleFilter = (e) => {
    e.preventDefault();
    setFilters({ ...filters, [e.target.name]: e.target.value });
    // refetch();
  };

  const handleMinAgeChange = (e) => {
    setFilters({ ...filters, minAge: e.target.value });
  };

  const handleMaxAgeChange = (e) => {
    setFilters({ ...filters, maxAge: e.target.value });
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["filtered-biodatas", filters, currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(`/biodatas?page=${currentPage}&size=${itemsPerPage}`, { params: filters });
      setBiodatas(res.data);
      // refetch()
      return res.data;
    },
  });

  const { data: totalCount, isLoading: pageCountLoading } = useQuery({
    queryKey: ["biodata-count"],
    queryFn: async () => {
      const res = await axiosPublic.get("/biodata-count");
      return res.data.count;
    },
  });
  

  const itemsPerPage = 8;
  const numberOfPages = Math.ceil(totalCount / itemsPerPage);


  if (isLoading || pageCountLoading) {
    return <p>loading.......</p>;
  }
  
  const pages = [...Array(numberOfPages).keys()];

  
  console.log(data);

  const formInputStyle =
    "peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border  placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50";

  const formLabelStyle =
    "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500";

  return (
    <div className=" flex mt-10 max-w-screen-2xl mx-auto flex-col lg:flex-row gap-5 grid-cols-12">
      <div className=" col-span-6">
        <div>
          <form onSubmit={handleFilter}>
            {/* filter using min age  */}
            <div className="relative mb-6">
              <input
                type="range"
                value={filters.minAge}
                min="18"
                max="80"
                onChange={handleMinAgeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                Min Age: {filters.minAge}
              </span>
            </div>

            {/* filter using max age  */}
            <div className="relative mb-6">
              <input
                type="range"
                value={filters.maxAge}
                min="18"
                max="80"
                onChange={handleMaxAgeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                Max Age: {filters.maxAge}
              </span>
            </div>

            {/* filter using biodata type  */}
            <div className="relative h-11 w-full min-w-[200px] mt-5">
              <label className={formLabelStyle}>Biodata Type: </label>
              <select
                name="biodataType"
                value={filters.biodataType}
                onChange={handleFilter}
                className={formInputStyle}
              >
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* filter using division  */}
            <div className="relative h-11 w-full min-w-[200px] mt-5">
              <label className={formLabelStyle}>Division: </label>
              <select
                name="division"
                value={filters.division}
                onChange={handleFilter}
                className={formInputStyle}
              >
                <option value="">All</option>
                <option value="dhaka">Dhaka</option>
                <option value="chattagram">Chattagram</option>
                <option value="rangpur">Rangpur</option>
                <option value="barisal">Barisal</option>
                <option value="khulna">Khulna</option>
                <option value="maymansign">Maymansign</option>
                <option value="sylhet">Sylhet</option>
              </select>
            </div>
          </form>
        </div>
      </div>
      <div className=" col-span-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
          {biodatas.map((biodata) => (
            <div key={biodata._id} className="shadow-xl p-5 ">
              <figure>
                <img src={biodata?.profileImage} />
              </figure>
              <div className="">
                <h2 className="">Biodata Id: {biodata.biodataId}</h2>
                <p>Biodata Type: {biodata.biodataType}</p>
                <p>Age: {biodata.age}</p>
                <p>Permanent Division: {biodata.permanentDivision}</p>
                <p>Occupation: {biodata.occupation}</p>
                <div className=" justify-end">
                  <Link to={`/biodata-details/${biodata._id}`}>
                    <Button variant="contained">View Profile</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className=" text-center my-5">
          {/* pagination  */}
          Pages:
          {pages.map((page, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(page)}
              className={
                currentPage === page
                  ? " bg-lime-800 text-white px-2 mr-3 rounded"
                  : " bg-white text-black px-2 mr-3 rounded"
              }
            >
              {page + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Biodatas;

Biodatas.propTypes = {
  props: PropTypes.any,
};
