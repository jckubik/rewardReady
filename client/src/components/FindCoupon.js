import { useEffect, useState } from "react";
import api from "../utils/api";

const FindCoupon = () => {
  const [boolCoupons, setBoolCoupons] = useState(true);
  const [coupons, setCoupons] = useState({
    couponId: 0,
    title: "",
    merchantName: "",
    clickUrl: "",
    couponCode: "",
  });
  const [couponReturn, setCouponReturn] = useState({
    title: "",
    subtitle: "",
  });

  async function fetchCoupons() {
    try {
      let coupon = await api.getRandomCoupon();

      setCoupons({
        couponId: coupon["couponId"],
        title: coupon["title"],
        merchantName: coupon["merchantName"],
        clickUrl: coupon["clickUrl"],
        couponCode: coupon["couponCode"],
      });

      setCouponReturn({
        title: coupon["title"],
        subtitle: coupon["merchantName"],
      });

      setBoolCoupons(false);
      return coupons;
    } catch (err) {
      console.log(err);
    }
  }

  async function boolFetch() {
    if (boolCoupons) {
      fetchCoupons();
    }
  }

  useEffect(() => {
    boolFetch();
  });

  return couponReturn;
};

export default FindCoupon;
