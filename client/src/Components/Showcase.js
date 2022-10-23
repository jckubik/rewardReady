import React from "react";
import ShowcaseItem from "./ShowcaseItem";
export default class Showcase extends React.Component {
  render() {
    return (
      <div className="w-full">
        <div
          className={`w-full px-4 py-14 ${
            this.props.backgroundColor
              ? "bg-" + this.props.backgroundColor
              : null
          }`}
        >
          <span className="font-inter font-black text-3xl uppercase">
            {this.props.title}
          </span>
          <div className="flex px-8 pt-10 justify-between">
            {this.props.items.map((item) => (
              <ShowcaseItem item={item} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
