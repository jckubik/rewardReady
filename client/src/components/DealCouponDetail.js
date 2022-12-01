import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const DealCouponDetail = ({ setShow, type, item }) => {

  return(
    <div
    className="bg-[#e4e7ea] flex flex-col gap-5 text-center py-10 px-10 min-w-[500px] rounded-lg"
    onClick={(e) => e.stopPropagation()}
    >
      <button className="text-right hover:text-red-500 font-bold text-xl" 
        onClick={() => setShow(false)}>
        <FontAwesomeIcon icon={solid("x")} />
      </button>
      {
        item.imageUrl ? 
        <img
          className="object-cover w-60 h-36"
          alt={item.title}
          src={item.imgSrc}
        />
      }
      <h2 className="text-3xl font-bold">{ item.title }</h2>

    </div>
  );
};

export default DealCouponDetail;