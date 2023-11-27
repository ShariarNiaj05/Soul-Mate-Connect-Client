import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Biodatas from "../Pages/Biodatas/Biodatas";
import BiodataDetails from "../Pages/Biodatas/BiodataDetails";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import DashboardLayout from "../Layout/DashboardLayout";
import EditBiodata from "../Pages/Dashboard/EditBiodata/EditBiodata";
import ViewBiodata from "../Pages/Dashboard/ViewBiodata/ViewBiodata";
import FavouritesBiodata from "../Pages/Dashboard/FavouritesBiodata/FavouritesBiodata";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";
import ApprovedPremium from "../Pages/Dashboard/Admin/ApprovedPremium/ApprovedPremium";
import ApprovedContactRequest from "../Pages/Dashboard/Admin/ApprovedContactRequest/ApprovedContactRequest";
import Payment from "../Pages/Payment/Payment";
import MyContactRequest from "../Pages/Dashboard/MyContactRequest/MyContactRequest";
import AdminDashboard from "../Pages/Dashboard/Admin/AdminDashboard/AdminDashboard";
import GotMarried from "../Pages/Dashboard/GotMarried/GotMarried";
import SuccessStory from "../Pages/Dashboard/Admin/SuccessStory/AdminSuccessStory";
import AdminSuccessStory from "../Pages/Dashboard/Admin/SuccessStory/AdminSuccessStory";

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
        element: <Biodatas></Biodatas>,
      },
      {
        path: "biodata-details/:id",
        element: (
          <PrivateRoutes>
            <BiodataDetails></BiodataDetails>
          </PrivateRoutes>
        ),
      },
      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "contact",
        element: <Contact></Contact>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>
    ),
    children: [
      // user routes
      {
        path: "edit-biodata",
        element: <EditBiodata></EditBiodata>,
      },
      {
        path: "view-biodata",
        element: <ViewBiodata></ViewBiodata>,
      },
      {
        path: "contact-request",
        element: <MyContactRequest></MyContactRequest>,
      },
      {
        path: "favourites-biodata",
        element: <FavouritesBiodata></FavouritesBiodata>,
      },
      {
        path: "got-married",
        element: <GotMarried></GotMarried>
      },
      {
        path: "checkout/:biodataId",
        element: <Payment></Payment>
      },

      // admin routes
      {
        path: "admin-dashboard",
        element: <AdminDashboard></AdminDashboard>
      },
      {
        path: "manage-users",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "approved-premium",
        element: <ApprovedPremium></ApprovedPremium>,
      },
      {
        path: "approved-contact-request",
        element: <ApprovedContactRequest></ApprovedContactRequest>,
      },
      {
        path: "success-story",
        element: <AdminSuccessStory></AdminSuccessStory>
      },
      
    ],
  },
]);

export default router;
