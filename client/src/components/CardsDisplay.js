import CardDescription from "./CardDescription";

const CardsDisplay = (props) => {
  return (
    <div>
      {props.cards.map((card) => (
        <CardDescription key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardsDisplay;
