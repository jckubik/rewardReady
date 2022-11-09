import React from "react";
import ShowcaseItem from "./ShowcaseItem";
import ShowcaseHelper from "./ShowcaseHelper";

export default class Showcase extends React.Component {
  render() {
    let backgroundColor = "bg-" + this.props.backgroundColor;
    return (
      <ShowcaseHelper type={this.props.type} backgroundColor={backgroundColor} title={this.props.title}/>
    );
  }
}
