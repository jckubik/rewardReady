import React from "react";
import { Link } from "react-router-dom";

const SubHeader = ({ active }) => {
  return (
    <div class="w-full border-2 flex items-center">
      <Link
        to={"/personal"}
        className={`py-4 w-40 text-center ${
          active === "personal" && "border-[1px] border-black bg-[#00000010]"
        }`}
      >
        Personal Info
      </Link>
      <Link
        to={"/cards"}
        className={`py-4 w-40 text-center ${
          active === "card" && "border-[1px] border-black bg-[#00000010]"
        }`}
      >
        Card Information
      </Link>
    </div>
  );
};

export default SubHeader;
