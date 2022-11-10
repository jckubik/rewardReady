const ShowcaseItem = (props) => {
  return (
    <div>
      {props.showImage ? (
        <img
          className="object-cover w-60 h-36"
          alt={props.item.title}
          src={props.item.imgSrc}
        />
      ) : null}
      <div className="pt-4">
        <p className="heading-2 text-oxford-blue uppercase">
          {props.item.title}
        </p>
        <p className="subheading-1 text-brunswick-green">
          {props.item.subtitle}
        </p>
      </div>
    </div>
  );
};

export default ShowcaseItem;
