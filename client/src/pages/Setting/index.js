import { Outlet } from "react-router";
import SubHeader from "../../components/SubHeader";

const Setting = () => {
  return (
    <>
      <SubHeader />
      <Outlet />
    </>
  );
};

export default Setting;
