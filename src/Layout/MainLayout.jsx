import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
import { Grid } from "@mui/material";

const MainLayout = () => {
  return (
    <>
      <div className=" mb-5">
        <Navbar></Navbar>
      </div>
      {/* <Grid>
        
      </Grid> */}

      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
};

export default MainLayout;
