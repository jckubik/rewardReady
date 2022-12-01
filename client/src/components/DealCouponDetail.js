import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
import api from "../utils/api";

const DealCouponDetail = ({ setShow, item }) => {
  const [cardRecommendation, setCardRecommendation] = useState();
    // useState(api.getCardRecommendationsForUser(subtitle));
  const { 
    dealId, 
    title, 
    subtitle, 
    imgSrc, 
    clickUrl, 
    couponCode, 
    description, 
    discountPrice, 
    originalPrice 
  } = item;

  const card = api.getCardRecommendationsForUser(subtitle)
    .then((result) => console.log(result));
  
  const cursor = clickUrl ? "" : 'cursor-default';

  return (
    <div
    className="bg-[#e4e7ea] flex flex-col gap-5 text-center py-10 px-10 min-w-[500px] rounded-lg"
    onClick={(e) => e.stopPropagation()}
    >
      <div className="grid place-items-end">
        <button className="text-right fit-content" 
          onClick={() => setShow(false)}>
          <FontAwesomeIcon className="hover:text-red-500 font-bold text-xl" icon={solid("x")} />
        </button>
      </div>
      <div className="flex flex-col gap-5 items-center">
        {
          imgSrc ? 
          <a href={ clickUrl } className={cursor}>
            <img
            className="object-cover w-60 h-36"
            alt={title}
            src={imgSrc}
            />
          </a>
          : null
        }
        <a href={ clickUrl } className={cursor}>
          <h2 className="text-xl font-bold">{ title }</h2>
        </a>
        <a href={ clickUrl } className={cursor}>
          <h3>{ subtitle }</h3>
        </a>
        {
          discountPrice && originalPrice ?
            <div className="price-container flex flex-row gap-2">
              <div className="text-right">
                <p>Regular price:</p>
                <p>Discounted price:</p>
              </div>
              <div className="text-left">
                <span className="line-through block">{ originalPrice }</span>
                <span className="font-bold block">{ discountPrice }</span>
              </div>
            </div>
            : couponCode ?
            <div>
              <p>Coupon Code:</p>
              <p>{ couponCode }</p>
            </div>
            : null
        }
        {
          cardRecommendation ? 
          <div>
            {cardRecommendation}
          </div>
          : null
        }
        {
          description ? 
          <div className="max-w-lg h-48 overflow-auto">
            <p>{ description }</p>
          </div>
          : null
        }
      </div>
    </div>
  );
};

export default DealCouponDetail;