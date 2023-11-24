import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import Loader from "../Components/Loader/Loader";

 


// eslint-disable-next-line react/prop-types
const AdminRoutes = ( {children} ) => {
    const {user, loading} = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation();
  
    if (loading || isAdminLoading) {
      return <Loader></Loader>
    }
    if (user && isAdmin) {
      return children;
    }
    return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
}
 
export default AdminRoutes
 
 
AdminRoutes.propTypes = {
 
};