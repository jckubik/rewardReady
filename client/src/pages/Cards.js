import React from "react";
import SubHeader from "../components/SubHeader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const CardItem = ({ text }) => {
  return (
    <div>
      <h3>{text}</h3>
      <span>X</span>
    </div>
  );
};

const Cards = () => {
  const card_items = [
    "Card 1",
    "Card 2",
    "Card 3",
    "Card 4",
    "Card 5",
    "Card 6",
  ];
  return (
    <div>
      <SubHeader active="card" />
      <div>
        <h2>Add a Card</h2>
        <span>+</span>
      </div>
      <h2>Previously Added Cards</h2>
      <div>
        {card_items.map((item) => (
          <CardItem text={item} key={item} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
