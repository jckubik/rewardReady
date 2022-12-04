import React from "react";
import { Link } from "react-router-dom";

const SubHeader = ({ active }) => {
  return (
    <div className="w-full border-2 flex items-center">
      <Link
        to={"/personal"}
        className={`py-4 w-40 text-center hover:bg-gray-200 ${
          active === "personal" && "border-[1px] border-black bg-[#00000010]"
        }`}
      >
        Personal Info
      </Link>
      <Link
        to={"/wallet"}
        className={`py-4 w-40 text-center hover:bg-gray-200 ${
          active === "wallet" && "border-[1px] border-black bg-[#00000010]"
        }`}
      >
        Card Information
      </Link>
      <Link
        to={"/history"}
        className={`py-4 w-40 text-center hover:bg-gray-200 ${
          active === "history" && "border-[1px] border-black bg-[#00000010]"
        }`}
      >
        Shopping History
      </Link>
      <Link
        to={"/favorites"}
        className={`py-4 w-40 text-center hover:bg-gray-200 ${
          active === "favorites" && "border-[1px] border-black bg-[#00000010]"
        }`}
      >
        Favorite Stores
      </Link>
    </div>
  );
};

export default SubHeader;
