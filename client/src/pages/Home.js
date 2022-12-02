import Hero from "../components/Hero";
import Showcase from "../components/Showcase";
import { Outlet } from "react-router";

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <Showcase title="Popular Deals" type={"deal"} />
      <Showcase title="Popular Coupons" type={"coupon"} />
      <Outlet />
    </div>
  );
};

export default Home;
