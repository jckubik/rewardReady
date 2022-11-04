import { useEffect, useState } from "react";
import api from "../utils/api";

const FindDeal = () => {
  const [boolDeals, setBoolDeals] = useState(true);
  const [deals, setDeals] = useState({
    dealId: 0,
    title: "",
    merchantName: "",
    imageUrl: "",
    price: 0.0,
    value: 0.0,
    description: "",
  });
  const [dealReturn, setDealReturn] = useState({
    title: "",
    subtitle: "",
    imgSrc: "",
  });

  async function fetchDeals() {
    try {
      let deal = await api.getRandomDeal();

      setDeals({
        dealId: deal["couponId"],
        title: deal["title"],
        merchantName: deal["merchantName"],
        clickUrl: deal["clickUrl"],
        couponCode: deal["couponCode"],
      });

      setDealReturn({
        title: deal["title"],
        subtitle: deal["merchantName"],
        imgSrc: deal["imageUrl"],
      });

      setBoolDeals(false);
      return deals;
    } catch (err) {
      console.log(err);
    }
  }

  async function boolFetch() {
    if (boolDeals) {
      fetchDeals();
    }
  }

  useEffect(() => {
    boolFetch();
  });

  return dealReturn;
};

export default FindDeal;
