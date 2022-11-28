import React from "react";
import SubHeader from "../components/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getWallet } from "../reduxSlices/walletSlice";

const Wallet = () => {
  const wallet = useSelector((state) => state.wallet.cards);
  console.log(wallet);
  return (
    <div className="w-full">
      <SubHeader active="wallet" />
    </div>
  );
};

export default Wallet;
