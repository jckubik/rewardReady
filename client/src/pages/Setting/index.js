import { Outlet } from "react-router";
import SubHeader from "../../Components/SubHeader";

const Setting = () => {
    return (
        <>
            <SubHeader />
            <Outlet />
        </>
    );
};

export default Setting;
