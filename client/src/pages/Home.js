import FindCoupon from "../components/FindCoupon";
import FindDeal from "../components/FindDeal";
import Hero from "../components/Hero";
import Showcase from "../components/Showcase";
import { useState } from "react";

const Home = () => {
  const [coupon, setCoupon] = useState({
    title: "",
    subtitle: "",
    imgSrc: "../assets/shoes.jpg"
  })

  const [coupon2, setCoupon2] = useState({
    title: "",
    subtitle: "",
    imgSrc: "../assets/shoes.jpg"
  })

  const [coupon3, setCoupon3] = useState({
    title: "",
    subtitle: "",
    imgSrc: "../assets/shoes.jpg"
  })

  const [coupon4, setCoupon4] = useState({
    title: "",
    subtitle: "",
    imgSrc: "../assets/shoes.jpg"
  })

  const [deal, setDeal] = useState({
    title: "",
    subtitle: "",
    imgSrc: "../assets/shoes.jpg"
  })

  const [deal2, setDeal2] = useState({
    title: "",
    subtitle: "",
    imgSrc: "../assets/shoes.jpg"
  })

  const [deal3, setDeal3] = useState({
    title: "",
    subtitle: "",
    imgSrc: "../assets/shoes.jpg"
  })

  const [deal4, setDeal4] = useState({
    title: "",
    subtitle: "",
    imgSrc: "../assets/shoes.jpg"
  })

  const changeCoupon = (couponData) => {
    setCoupon(couponData)
  }
  const changeCoupon2 = (couponData) => {
    setCoupon2(couponData)
  }
  const changeCoupon3 = (couponData) => {
    setCoupon3(couponData)
  }
  const changeCoupon4 = (couponData) => {
    setCoupon4(couponData)
  }

  const changeDeal = (dealData) => {
    setDeal(dealData)
  }
  const changeDeal2 = (dealData) => {
    setDeal2(dealData)
  }
  const changeDeal3 = (dealData) => {
    setDeal3(dealData)
  }
  const changeDeal4 = (dealData) => {
    setDeal4(dealData)
  }

  let items = [
    {
      title: deal.title,
      subtitle: deal.subtitle,
      imgSrc: deal.imgSrc,
    },
    {
      title: deal2.title,
      subtitle: deal2.subtitle,
      imgSrc: deal2.imgSrc,
    },
    {
      title: deal3.title,
      subtitle: deal3.subtitle,
      imgSrc: deal3.imgSrc,
    },
    {
      title: deal4.title,
      subtitle: deal4.subtitle,
      imgSrc: deal4.imgSrc,
    },
  ];
  let items2 = [
    {
      title: coupon.title,
      subtitle: coupon.subtitle,
      imgSrc: coupon.imgSrc
    },
    {
      title: coupon2.title,
      subtitle: coupon2.subtitle,
      imgSrc: coupon2.imgSrc
    },
    {
      title: coupon3.title,
      subtitle: coupon3.subtitle,
      imgSrc: coupon3.imgSrc
    },
    {
      title: coupon4.title,
      subtitle: coupon4.subtitle,
      imgSrc: coupon4.imgSrc
    }
  ];

  return (
    <div className="w-full">
      <Hero />
      <Showcase
        title="Popular Deals"
        items={items}
        backgroundColor="honeydew"
      />
      <FindDeal changeDeal={changeDeal} />
      <FindDeal changeDeal={changeDeal2} />
      <FindDeal changeDeal={changeDeal3} />
      <FindDeal changeDeal={changeDeal4} />
      <FindCoupon changeCoupon={changeCoupon} />
      <FindCoupon changeCoupon={changeCoupon2} />
      <FindCoupon changeCoupon={changeCoupon3} />
      <FindCoupon changeCoupon={changeCoupon4} />
      <Showcase title="Popular Coupons" items={items2} backgroundColor="white" />
    </div>
  );
};

export default Home;
