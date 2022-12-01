import DealCouponDetail from "../DealCouponDetail";

const CouponDealDetail = ({ setShow, type, item }) => {


  return (
    <div
      className="w-screen h-screen fixed bg-[#0000009d] top-0 left-0 z-50 grid place-items-center font-inter"
      onClick={() => {
        console.log("click");
        setShow(false);
      }}
    >
      <DealCouponDetail setShow={setShow} type={type} item={item} />

    </div>
  );
};

export default CouponDealDetail;