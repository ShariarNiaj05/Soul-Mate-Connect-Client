import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
import { Grid } from "@mui/material";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Grid>
        <Outlet></Outlet>
      </Grid>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
