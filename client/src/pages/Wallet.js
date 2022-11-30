import React, { useState } from "react";
import SubHeader from "../components/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getWallet } from "../reduxSlices/walletSlice";
import CardsDisplay from "../components/CardsDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import SelectCard from "../components/popups/SelectCard";

const Wallet = () => {
  const wallet = useSelector((state) => state.wallet.cards);
  const [showSelectCard, setShowSelectCard] = useState(false);
  return (
    <div className="w-full">
      <SubHeader active="wallet" />
      <div className="w-full">
        <div className="px-4 py-14 flex flex-col">
          <div>
            <button
              onClick={() => setShowSelectCard(true)}
              className="tertiary-btn float-right"
            >
              <FontAwesomeIcon icon={solid("plus")} /> ADD CARD
            </button>
          </div>
          {wallet ? <CardsDisplay cards={wallet} /> : <div></div>}
        </div>
      </div>
      <SelectCard visible={showSelectCard} setVisible={setShowSelectCard} />
    </div>
  );
};

export default Wallet;
