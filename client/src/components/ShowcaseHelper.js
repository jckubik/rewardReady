import FindCoupon from "./FindCoupon";
import FindDeal from "./FindDeal";
import ShowcaseItem from "./ShowcaseItem";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "../css/ShowcaseHelper.css";

const ShowcaseHelper = (props) => {
  const elems = [];

  for (let i = 0; i < 10; i++) {
    if (props.type === "deal") {
      elems.push(FindDeal());
    } else {
      elems.push(FindCoupon());
    }
  }

  return (
    <div className="w-full">
      <div
        className={`w-full px-4 py-14 ${
          props.type === "deal" ? "bg-honeydew" : ""
        }`}
      >
        <span className="heading-1 uppercase">{props.title}</span>
        <div className="flex px-8 pt-10 justify-between gap-5 w-full">
          <Swiper
            className="swiper-container"
            slidesPerView={4}
            spaceBetween={50}
            modules={[Navigation]}
            navigation
          >
            {elems.map((item, index) => (
              <SwiperSlide key={index}>
                <ShowcaseItem item={item} showImage={true} type={props.type} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseHelper;
