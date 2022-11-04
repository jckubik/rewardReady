import React from "react";
import CouponItem from "./ShowcaseItem";
export default class CouponShowcase extends React.Component {
  render() {
    let backgroundColor = "bg-" + this.props.backgroundColor;
    return (
      <div className="w-full">
        <div className={`w-full px-4 py-14 ${backgroundColor}`}>
          <span className="font-inter font-black text-3xl uppercase">
            {this.props.title}
          </span>
          <div className="flex px-8 pt-10 justify-between">
            <CouponItem />
          </div>
        </div>
      </div>
    );
  }
}