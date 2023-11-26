import { Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useBiodata from "../../../../Hooks/useBiodata";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

    const [biodatas, , refetch] = useBiodata()
    
    

  const { data: allUsers, isLoading } = useQuery({
    queryKey: ["user-role"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);

      return res?.data;
    },
  });

  const { data: filteredUsers } = useQuery({
    enabled: !!searchTerm,
    queryKey: ["filtered-users", searchTerm],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${searchTerm}`);
      return res?.data;
    },
  });

  const users = searchTerm ? filteredUsers : allUsers;

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleMakeAdmin = async (id) => {
    const res = await axiosSecure.patch(`/users/${id}`, { userRole: "admin" });
    console.log(res.data.updatedUserRole);
    if (res.data.updatedUserRole.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User role has been update to ADMIN",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
    const handleMakePremium = async (id) => {
      
        const res = await axiosSecure.patch(`/users/${id}`, { userRole: "premium" });
    console.log(res.data.updatedUserRole);
    if (res.data.updatedUserRole.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User role has been update to Premium",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if (isLoading) {
    return <p>loading........</p>;
  }
  return (
    <table>
      <Typography align="center" variant="h3" color={"primary"}>
        Edit or Create Your Biodata
      </Typography>
      <input
        onChange={handleSearch}
        type="search"
        name="search"
        placeholder="search by name"
        className=" border-2 p-3 border-x-lime-600"
      />
      <thead className=" flex justify-center mt-10">
        <tr className=" flex justify-between gap-5 text-center">
          <th>Name</th>
          <th>Email</th>
          <th>Admin Action</th>
          <th>Make Premium Action</th>
        </tr>
      </thead>
      <tbody className=" flex flex-col items-center justify-center mt-5">
       
        {users?.map((user) => (
          <tr
            key={user._id}
            className=" flex justify-between gap-5 text-center mb-10"
          >
            <td>{user.name}</td>
            <td>{user.email}</td>

            <Button
              onClick={() => handleMakeAdmin(user._id)}
              variant="contained"
              color="secondary"
            >
              Make Admin
            </Button>
            <Button
              onClick={ () => handleMakePremium (user?._id)}
              variant="contained"
              color="secondary"
            >
              Make Premium
            </Button>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ManageUsers;

ManageUsers.propTypes = {
  props: PropTypes.any,
};
