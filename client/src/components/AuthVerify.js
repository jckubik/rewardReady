import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reduxSlices/userSlice";
import { isLoggedIn } from "../utils/auth";

const AuthVerify = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const location = useLocation();
  const navigate = useNavigate();

  const handleAuthCheck = () => {
    if (user) {
      if (!isLoggedIn()) {
        dispatch(logout());
        navigate("/", { replace: true });
      }
    }
  };
  useEffect(() => {
    handleAuthCheck();
  }, [location, navigate]);
  return <></>;
};

export default AuthVerify;
