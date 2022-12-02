import { useState, useEffect } from 'react';
import CouponDealDetail from "./popups/CouponDealDetail";

const ShowcaseItem = (props) => {
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    console.log(showDetail);
  }, [showDetail]);

  return (
    <div className='cursor-pointer' onClick={() => setShowDetail(true)}>
      {props.showImage ? (
        <img
          className="object-cover w-60 h-36"
          alt={props.item.title}
          src={props.item.imgSrc}
        />
      ) : null}
      <div className="pt-4">
        <p className="heading-2 text-oxford-blue uppercase">
          {props.item.title}
        </p>
        <p className="subheading-1 text-brunswick-green">
          {props.item.subtitle}
        </p>
      </div>
      {
        showDetail ? 
          <CouponDealDetail 
            setShow={setShowDetail} 
            type={props.type}
            item={props.item}
          />
          : null
      }
    </div>
  );
};

export default ShowcaseItem;
