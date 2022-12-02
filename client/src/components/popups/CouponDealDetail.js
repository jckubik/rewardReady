import DealCouponDetail from "../DealCouponDetail";

const CouponDealDetail = ({ show, setShow, type, item }) => {
  return show ? (
    <div
      className="w-screen h-screen fixed bg-[#0000009d] top-0 left-0 z-50 grid place-items-center font-inter cursor-default"
      onClick={() => {
        setShow(false);
      }}
    >
      <DealCouponDetail setShow={setShow} type={type} item={item} />
    </div>
  ) : null;
};

export default CouponDealDetail;
