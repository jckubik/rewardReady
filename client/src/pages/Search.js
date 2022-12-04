import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import api from "../utils/api";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "../css/ShowcaseHelper.css";
import { Navigation } from "swiper";
const Search = () => {
  // get the search query from the url
  const query = new URLSearchParams(window.location.search).get("q");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const default_image = require("../assets/defaultCoupon.jpeg");

  useEffect(() => {
    (async () =>
      await api.search(query).then((res) => {
        setData(res);
        setLoading(false);
      }))();
  }, [query]);
  console.log(data);
  if (loading) return <div>Loading...</div>;
  return (
    <div className="w-full">
      <div className="w-full px-4 py-14">
        <h1 className="mx-auto text-2xl font-bold py-3">
          Search results for {query}
        </h1>
        <div className="heading-1 uppercase px-14 pt-8">Deals</div>
        {data?.deals.length !== 0 ? (
          <div className="flex grid grid-cols-4 px-8 pt-10 justify-between gap-5 w-full">
            {data?.deals.map((item, index) => {
              return (
                <a key={index} href={item.clickUrl} target="_blank">
                  <article className="card">
                    <div className="card-image">
                      <img
                        className="object-cover w-60 h-36"
                        src={item.imageUrl}
                        alt={item.title}
                      />
                    </div>
                    <div className="card-content">
                      <h2 className="card-name text-inter font-extrabold text-xl text-oxford-blue uppercase">
                        {item.title}
                      </h2>
                      <ol className="card-list text-inter font-bold text-base text-brunswick-green">
                        <li>
                          Retailer: <span>{item.merchantName}</span>
                        </li>
                        <li>
                          Current Price: <span>{item.price}</span>
                        </li>
                        <li>
                          Original Price:{" "}
                          <span>
                            {item.value == ""
                              ? "No previous price on record"
                              : item.value}
                          </span>
                        </li>
                      </ol>
                    </div>
                  </article>
                </a>
              );
            })}
          </div>
        ) : (
          <h1 className="mx-auto text-center text-xl py-3">No results found</h1>
        )}
      </div>
      <div className="w-full bg-honeydew px-4 py-14">
        <div className="heading-1 uppercase px-14 mt-5">Coupons</div>
        {data?.coupons.length !== 0 ? (
          <div className="flex px-8 pt-10 grid grid-cols-4 justify-between gap-5 w-full">
            {data?.coupons.map((item, index) => {
              return (
                <a key={index} href={item.clickUrl} target="_blank">
                  <article className="card">
                    <div className="card-image">
                      <img
                        className="object-cover w-60 h-36"
                        src={default_image}
                        alt={item.title}
                      />
                    </div>
                    <div className="card-content">
                      <h2 className="card-name text-inter font-extrabold text-xl text-oxford-blue uppercase">
                        {item.title}
                      </h2>
                      <ol className="card-list text-inter font-bold text-base text-brunswick-green">
                        <li>
                          Retailer: <span>{item.merchantName}</span>
                        </li>
                        <li>
                          Coupon Code: <span>{item.couponCode}</span>
                        </li>
                      </ol>
                    </div>
                  </article>
                </a>
              );
            })}
          </div>
        ) : (
          <h1 className="mx-auto text-center text-xl py-3">No results found</h1>
        )}
      </div>
    </div>
  );
};

export default Search;
