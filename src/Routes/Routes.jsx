import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Biodatas from "../Pages/Biodatas/Biodatas";
import BiodataDetails from "../Pages/Biodatas/BiodataDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <p>error</p>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "home",
        element: <Home></Home>,
      },
      {
        path: "biodatas",
        element: <Biodatas></Biodatas>
      },
      {
        path: "biodata-details/:id",
        element: <BiodataDetails></BiodataDetails>
      },
      {
        path: "about",
        element: <About></About>
      },
      {
        path: "contact",
        element: <Contact></Contact>
      },
    ],
  },
]);

export default router;
