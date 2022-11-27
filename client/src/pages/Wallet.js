import React from "react";
import SubHeader from "../components/SubHeader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Wallet = () => {
  return (
    <div className="w-full">
      <SubHeader active="wallet" />
    </div>
  );
};

export default Wallet;
