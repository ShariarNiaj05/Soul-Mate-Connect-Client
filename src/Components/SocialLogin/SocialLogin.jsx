import { useContext } from "react";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Button } from "@mui/material";
const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        const userInfo = {
          name: user.displayName,
          email: user?.email,
          role: "basic",
        };

        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log("user added to DB");

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User Profile created Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });

        Swal.fire({
          title: "Login Successful",
          showClass: {
            popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `,
          },
          hideClass: {
            popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `,
          },
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "login failed",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <div>
      <Button onClick={handleGoogleSignIn} variant="contained">
        Login With Google
      </Button>
    </div>
  );
};

export default SocialLogin;
