import FindCoupon from "../components/FindCoupon";
import FindDeal from "../components/FindDeal";
import Hero from "../components/Hero";
import Showcase from "../components/Showcase";
import { useState } from "react";

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <Showcase
        title="Popular Deals"
        type={"deal"}
        backgroundColor="honeydew"
      />
      <Showcase
        title="Popular Coupons"
        type={"coupon"}
        backgroundColor="white"
      />
    </div>
  );
};

export default Home;
