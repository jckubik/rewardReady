import FindCoupon from "./FindCoupon";
import FindDeal from "./FindDeal";
import ShowcaseItem from "./ShowcaseItem";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "../css/ShowcaseHelper.css";

const ShowcaseHelper = (props) => {
  const elems = [];
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [slidesPerView, setSlidesPerView] = useState(2);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  // Set the windowSize when user changes size
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize);
    }

    window.addEventListener('resize', handleWindowResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  // Change number of displayed items based on screen size
  useEffect(() => {
    if (windowSize.innerWidth <= 800 && windowSize.innerWidth > 650 ) {
      setSlidesPerView(3);
    } else if (windowSize.innerWidth <= 650 && windowSize.innerWidth > 500) {
      setSlidesPerView(2);
    } else if (windowSize.innerWidth <= 500) {
      setSlidesPerView(1);
    } else {
      setSlidesPerView(4);
    }
  })

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
            slidesPerView={slidesPerView}
            spaceBetween={50}
            modules={[Navigation]}
            navigation
          >
            {elems.map((item, index) => (
              <SwiperSlide key={index} className="">
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
