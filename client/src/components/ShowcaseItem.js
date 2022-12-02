import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { addHistoryLog } from "../reduxSlices/userSlice";

const ShowcaseItem = (props) => {
  const default_image = require("../assets/defaultCoupon.jpeg");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Called when user clicks on the deal/coupon
  const handleClick = async () => {
    // Navigate to the route for the detail view
    navigate('/homeDetailView', { state: {item: props.item} });

    // Add the item to the user's history
    await dispatch(addHistoryLog({
      content: props.item,
      type: props.type,
      id: props.item.id,
    }));
  }

  return (
    <>
      <div className="cursor-pointer" onClick={() => handleClick()}>
        {props.showImage ? (
          <img
            className="object-cover w-60 h-36"
            alt={props.item.title}
            src={props.item?.imgSrc ? props.item.imgSrc : default_image}
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
    </>
  );
};

export default ShowcaseItem;
