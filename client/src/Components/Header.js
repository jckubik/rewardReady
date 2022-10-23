import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro";

import "../css/Header.css";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="w-full h-32 bg-light-gray ">
        <div className="mx-2 h-full relative items-center flex">
          <div className="absolute top-0 right-0 pt-2">
            <span className="inline-block align-middle">
              <FontAwesomeIcon icon={regular("circle-user")} className="h-6" />
            </span>
            <span className="font-inter text-sm pl-1 inline-block align-middle">
              Sign in or Register
            </span>
          </div>
          <div className="flex w-full">
            <div className="flex-1 font-carter-one text-3xl text-left">
              <span className="text-steel-blue inline-block align-middle">
                Reward
              </span>
              <span className="text-amazon inline-block align-middle">
                Ready
              </span>
            </div>
            <div className="flex-0">
              <div className="relative">
                <input
                  type="search"
                  className="h-9 rounded-xl font-inter text-sm pl-2 pr-8 w-72"
                  placeholder="Search for deals, coupons, and merchants"
                />
                <button className="absolute right-3 bottom-2">
                  <FontAwesomeIcon icon={solid("magnifying-glass")} />
                </button>
              </div>
            </div>
            <div className="flex-1 text-left">
              <span className="inline-block align-middle pl-3">
                <FontAwesomeIcon icon={solid("map-location")} />
              </span>
              <span className="pl-2 inline-block align-middle text-amazon font-semibold font-sm font-inter">
                <a className="inline-block align-middle">Enter Location</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
