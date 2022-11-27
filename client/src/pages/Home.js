import FindCoupon from "../components/FindCoupon";
import FindDeal from "../components/FindDeal";
import Hero from "../components/Hero";
import Showcase from "../components/Showcase";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import api from "../utils/api";

const Home = () => {
  useEffect(() => {
    const fetchCards = async () => {
      try {
        let cards = await api.getCreditCards();
        console.log(cards);
      } catch (err) {
        console.log(err);
      }
    };
    const insertCard = async () => {
      try {
        let cardID = "5e690b260b077d5830cada30";
        console.log(await api.insertCardToWallet({ cardId: cardID }));
      } catch (err) {
        console.log(err);
      }
    };
    insertCard();
    fetchCards();
  }, []);

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
      <Outlet />
    </div>
  );
};

export default Home;
