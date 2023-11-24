import { Button, Container } from "@mui/material";
import PropTypes from "prop-types";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  return (
    <Container maxWidth={"xl"}>
      <div className=" flex">
        <div className=" w-64 min-h-screen bg-slate-300">
          <div className=" min-h-screen p-5 flex flex-col justify-between">
            <div>
              {/* TODO :: role specify  */}

              {/* basic user dashboard route  */}
              {
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
                    <NavLink to={"/dashboard/got-married"}>
                    Got Married
                    </NavLink>
                  </Button>
                </div>
              }

              {/* TODO :: role specify  */}
              {/* Admin  dashboard route  */}
              {
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
              }
            </div>

            {/* shared nav links  */}
            <Button onClick={() => logOut()} variant="contained">
              logout
            </Button>
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
