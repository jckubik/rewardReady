import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import React from "react";
export default class Footer extends React.Component {
  render() {
    return (
      <div className="w-full h-28 bg-light-gray">
        <div className="mx-2 h-full flex items-center">
          <div className="flex-1 flex">
            <span className="body">ⓒ 2022 RewardReady</span>
          </div>
          <div className="flex-1 gap-x-3 flex justify-center">
            <a href="/" className="font-sm text-brunswick-green font-semibold">
              Help
            </a>
            <a href="/" className="font-sm text-brunswick-green font-semibold">
              About
            </a>
          </div>
          <div className="flex-1 flex justify-end gap-x-3">
            <a href="/">
              <FontAwesomeIcon
                className="h-9 text-brunswick-green"
                icon={brands("twitter-square")}
              />
            </a>
            <a href="/">
              <FontAwesomeIcon
                className="h-9 text-brunswick-green"
                icon={brands("facebook-square")}
              />
            </a>
            <a href="/">
              <FontAwesomeIcon
                className="h-9 text-brunswick-green"
                icon={brands("instagram-square")}
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
