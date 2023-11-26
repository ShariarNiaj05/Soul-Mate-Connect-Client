import { Button, Container, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const FavouritesBiodata = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: favouritesBiodata = [], isLoading, refetch } = useQuery({
    enabled: !!user?.email,
    queryKey: ["favourites-biodata", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favourites/${user?.email}`);
      return res.data;
    },
  });
    console.log(favouritesBiodata);
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then( async (result) => {
              if (result.isConfirmed) {
                  const res = await axiosSecure.delete(`/favourites/${id}`)
                  console.log(res);
                  if (res?.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Favourite biodata has been deleted.",
                        icon: "success"
                    });
                    refetch()
                  }
                  
                  
              
            }
          });
    }

    if (isLoading) {
        return <p>loading...........</p>
    }
  return (
    <Container>
      <Typography align="center" variant="h3" color={"primary"}>
        My Favourites Biodata
      </Typography>
      <Grid>
        <thead className=" flex justify-center mt-10">
          <tr className=" flex justify-between gap-5 text-center">
            <th>Name</th>
            <th>Biodata Id</th>
            <th>Permanent Address</th>
            <th>Occupation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className=" flex justify-center mt-5">
   
          <div>
            {favouritesBiodata.map((singleFavouriteBiodata) => (
              <tr
                key={singleFavouriteBiodata._id}
                className=" flex justify-between gap-5 text-center mb-10"
              >
                <td>{singleFavouriteBiodata.personName}</td>
                <td>{singleFavouriteBiodata.biodataId}</td>
                <td>{singleFavouriteBiodata.permanentAddress}</td>
                <td>{singleFavouriteBiodata.PersonOccupation}</td>
                <Button onClick={() => handleDelete(singleFavouriteBiodata._id)} variant="contained" color="secondary">
                  Delete
                </Button>
              </tr>
            ))}
          </div>
        </tbody>
      </Grid>
    </Container>
  );
};

export default FavouritesBiodata;

FavouritesBiodata.propTypes = {
  props: PropTypes.any,
};
