import { useEffect } from "react";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reduxSlices/userSlice";
import { isLoggedIn } from "../utils/auth";

const AuthVerify = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const location = useLocation();

  const handleAuthCheck = () => {
    if (user) {
      if (!isLoggedIn()) {
        dispatch(logout());
      }
    }
  };
  useEffect(() => {
    handleAuthCheck();
  }, [location]);
  return <></>;
};

export default AuthVerify;
