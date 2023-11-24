import PropTypes from "prop-types";
import useBiodata from "../../Hooks/useBiodata";
import { Button, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const Biodatas = () => {
  const [biodatas, isLoading, refetch] = useBiodata();

  if (isLoading) {
    return <p>loading.......</p>;
  }
   console.log(biodatas);
   console.log(Object.keys(biodatas[0]).join(','));
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
        {biodatas.map((biodata) => (
          <div
            key={biodata._id}
            className="shadow-xl p-5 "
          >
            <figure>
              <img src={'https://cdn0.weddingwire.in/article/6998/3_2/1280/jpg/28996-matrimonial-services-dipak-studious-lead-image.webp'} />
            </figure>
            <div className="">
              <h2 className="">Biodata Id: {biodata.biodataId}</h2>
                 <p>Biodata Type: {biodata.biodataType }</p>
                 <p>Age: {biodata.age }</p>
                 <p>Permanent Division: {biodata.permanentDivision }</p>
                 <p>Occupation: {biodata.occupation }</p>
              <div className=" justify-end">
                <Link to={`/biodata-details/${biodata._id}`}><Button variant="contained">View Profile</Button></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Biodatas;

Biodatas.propTypes = {
  props: PropTypes.any,
};
