import React from "react";
import ShowcaseItem from "./ShowcaseItem";
import { useState } from "react";
export default class Showcase extends React.Component {
  
  render() {
    // const [data, setData] = useState();
    // if (this.props.type === "deal") {

    // } else {

    // }
    let backgroundColor = "bg-" + this.props.backgroundColor;
    return (
      <div className="w-full">
        <div className={`w-full px-4 py-14 ${backgroundColor}`}>
          <span className="font-inter font-black text-3xl uppercase">
            {this.props.title}
          </span>
          <div className="flex px-8 pt-10 justify-between">
            {this.props.items.map((item, index) => (
              <ShowcaseItem key={index} item={item} showImage={this.props.type == "coupon" ? false : true} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
