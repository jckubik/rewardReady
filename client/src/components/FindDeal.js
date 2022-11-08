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

<<<<<<< HEAD
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
=======
    async function fetchDeals() {
        const options = {
            method: 'GET',
        };
  
        try {
            let deal = await fetch(`http://localhost:9000/api/deal/random`, options)
            const dealJson = deal.json();
            dealJson.then((obj) => setDeals({
                dealId: obj["couponId"],
                title: obj["title"],
                merchantName: obj["merchantName"],
                clickUrl: obj["clickUrl"],
                couponCode: obj["couponCode"]
            }))
            dealJson.then((obj) => props.changeDeal({
                title: obj["title"],
                subtitle: obj["merchantName"],
                imgSrc: obj["imageUrl"]
            }));
            dealJson.then((obj) => console.log(obj["imageUrl"]))
            setBoolDeals(false);
            return deals;
        } catch (err) {
            console.log(err);
        }
>>>>>>> f2764cd (Fixed missing image for deals)
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

<<<<<<< HEAD
  return dealReturn;
};
=======
    return (
        <div hidden>
            {/* <img
            className="object-cover w-60 h-36"
            alt={this.props.item.title}
            src={this.props.item.imgSrc}
            /> */}
            <div className="pt-4">
                <p className="text-inter font-extrabold text-xl text-oxford-blue uppercase">
                    {deals.title}
                </p>
                <p className="text-inter font-bold text-base text-brunswick-green">
                    {deals.merchantName}
                </p>
            </div>
        </div>
        // <div className='container flex-1'>
        //     <div className='flex-1'>
        //         <label htmlFor='boolCoupon'>Do you want coupons?</label>
>>>>>>> f2764cd (Fixed missing image for deals)

export default FindDeal;
