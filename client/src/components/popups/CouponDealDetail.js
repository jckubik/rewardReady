import DealCouponDetail from "../DealCouponDetail";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

const CouponDealDetail = () => {
  const [show, setShow] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state;

  // Called when user clicks outside the modal
  const handleClick = () => {
    // Used to expand to the gallery view as well when implemented
    const navString = location.pathname === "/homeDetailView" ? "/" : "/";

    // Set show to false to remove modal
    setShow(false);

    // Navigate back to the original route
    navigate(navString);
  }

  return show ? (
    <div
      className="w-screen h-screen fixed bg-[#0000009d] top-0 left-0 z-50 grid place-items-center font-inter cursor-default"
      onClick={() => {
        handleClick();
      }}
    >
      <DealCouponDetail setShow={setShow} item={item} handleClick={handleClick} />
    </div>
  ) : null;
};

export default CouponDealDetail;
