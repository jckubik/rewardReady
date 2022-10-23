import React from "react";

export default class Hero extends React.Component {
  render() {
    return (
      <div className="w-full relative">
        <div className="absolute bg-brunswick-green h-5 w-full"></div>
        <div className="w-full px-4 py-10">
          <div className="font-inter text-4xl font-extrabold">
            <p className="text-left text-oxford-blue ">MAXIMIZE REWARDS.</p>
            <p className="text-left text-shamrock-green">
              FIND DEALS & COUPONS.
            </p>
          </div>
          <div className="flex gap-x-16 items-center justify-center pt-5">
            <img
              className="h-20"
              alt="adidas logo"
              src={require("../assets/adidas_logo.png")}
            />
            <img
              className="h-20"
              alt="nike logo"
              src={require("../assets/nike_logo.jpg")}
            />
            <img
              className="h-20"
              alt="target logo"
              src={require("../assets/target_logo.png")}
            />
            <img
              className="h-20"
              alt="under armour logo"
              src={require("../assets/under_armour_logo.png")}
            />
            <img
              className="h-20"
              alt="walmart logo"
              src={require("../assets/walmart_logo.png")}
            />
          </div>
          <div className="flex justify-center items-center pt-12">
            <button type="button" className="cta-btn">
              SAVE NOW
            </button>
          </div>
        </div>
      </div>
    );
  }
}
