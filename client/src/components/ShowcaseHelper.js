import FindCoupon from "./FindCoupon";
import FindDeal from "./FindDeal";
import ShowcaseItem from "./ShowcaseItem";

const ShowcaseHelper = (props) => {
  const elems = [];

  for (let i = 0; i < 4; i++) {
    if (props.type === "deal") {
      elems.push(FindDeal());
    } else {
      elems.push(FindCoupon());
    }
  }
  return (
    <div className="w-full">
      <div
        className={`w-full px-4 py-14 ${
          props.type === "deal" ? "bg-honeydew" : ""
        }`}
      >
        <span className="heading-1 uppercase">{props.title}</span>
        <div className="flex px-8 pt-10 justify-between">
          {elems.map((item, index) => (
            <ShowcaseItem
              key={index}
              item={item}
              type={props.type}
              showImage={props.type == "coupon" ? false : true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowcaseHelper;
