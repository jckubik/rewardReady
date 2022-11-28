const CardsDisplay = (props) => {
  console.log(props.cards);
  return (
    <>
      {props.cards.map((card) => (
        <img key={card.id} src={card.image_url} />
      ))}
    </>
  );
};

export default CardsDisplay;
