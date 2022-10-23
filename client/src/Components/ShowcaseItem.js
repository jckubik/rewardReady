import React from "react";

export default class ShowcaseItem extends React.Component {
  render() {
    return (
      <div>
        <img
          className="object-cover w-60 h-36"
          src={require("../assets/shoes.jpg")}
        />
        <div className="pt-4">
          <p className="text-inter font-extrabold text-xl text-oxford-blue uppercase">
            {this.props.item.title}
          </p>
          <p className="text-inter font-bold text-base text-brunswick-green">
            {this.props.item.subtitle}
          </p>
        </div>
      </div>
    );
  }
}
