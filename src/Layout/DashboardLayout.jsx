import { Box, Button, Container } from "@mui/material";
import PropTypes from "prop-types";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import logo from "/logo.png";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userRole, isLoading } = useQuery({
    enabled: !!user?.email,
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);

      return res?.data?.role;
    },
  });

  // console.log(userRole);

  if (isLoading) {
    return <p>loading........</p>;
  }
  return (
    <Container maxWidth={"xl"}>
      <div className=" flex">
        <div className=" w-64 min-h-screen bg-slate-300">
          <div className=" min-h-screen p-5 flex flex-col justify-between">
            <div>
              {/* TODO :: role specify  */}

              {/* basic user dashboard route  */}
              {user && userRole === "basic" && (
                <div>
                  <Button variant="contained">
                    <NavLink to={"/dashboard/edit-biodata"}>
                      Edit Biodata
                    </NavLink>
                  </Button>
                  <Button variant="contained">
                    <NavLink to={"/dashboard/view-biodata"}>
                      View Biodata
                    </NavLink>
                  </Button>
                  <Button variant="contained">
                    <NavLink to={"/dashboard/contact-request"}>
                      My Contact Request
                    </NavLink>
                  </Button>
                  <Button variant="contained">
                    <NavLink to={"/dashboard/favourites-biodata"}>
                      Favourites Biodata
                    </NavLink>
                  </Button>
                  <Button variant="contained">
                    <NavLink to={"/dashboard/got-married"}>Got Married</NavLink>
                  </Button>
                </div>
              )}

              {/* TODO :: role specify  */}
              {/* Admin  dashboard route  */}
              {user && userRole === "admin" && (
                <div>
                  <Button variant="contained">
                    <NavLink to={"/dashboard/admin-dashboard"}>
                      Admin Dashboard
                    </NavLink>
                  </Button>
                  <Button variant="contained">
                    <NavLink to={"/dashboard/manage-users"}>
                      Manage Users
                    </NavLink>
                  </Button>
                  <Button variant="contained">
                    <NavLink to={"/dashboard/approved-premium"}>
                      Approved Premium
                    </NavLink>
                  </Button>
                  <Button variant="contained">
                    <NavLink to={"/dashboard/approved-contact-request"}>
                      Approved Contact Request
                    </NavLink>
                  </Button>
                </div>
              )}
            </div>

            {/* shared nav links  */}
            <div className=" flex flex-col">
              <Link to={"/"}>
                <Box
                  component="img"
                  sx={{ height: 100 }}
                  alt="Logo"
                  src={logo}
                />
              </Link>
              <Button onClick={() => logOut()} variant="contained">
                logout
              </Button>
            </div>
          </div>
        </div>
        <div className=" flex-1 p-8">
          <Outlet></Outlet>
        </div>
      </div>
    </Container>
  );
};

export default DashboardLayout;

DashboardLayout.propTypes = {
  props: PropTypes.any,
};
