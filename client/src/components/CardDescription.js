import CardDisplay from "./CardDisplay";
import { useDispatch } from "react-redux";
import { removeCardFromWallet } from "../reduxSlices/walletSlice";
import api from "../utils/api";

const CardDescription = ({ card }) => {
  const dispatch = useDispatch();
  const removeCardHandler = async (cardId) => {
    dispatch(removeCardFromWallet(cardId));
    let resp = await api.removeCardFromWallet(cardId);
    if (resp.name && resp.name === "AxiosError") {
      console.log(resp.response.data.message);
    }
  };
  return (
    <div className="flex relative">
      <div className="w-1/3">
        <CardDisplay key={card.id} title={card.title} />
      </div>
      <div className="w-3/5 py-5">
        <div>
          <span className="heading-1 text-brunswick-green">Rewards</span>
          <ul className="list-square pl-5 pt-2">
            {card.earnings && card.earnings.map((reward, index) => (
              <li key={index} className="subheading-1 text-oxford-blue">
                {reward.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="absolute pb-5 bottom-0 right-0 space-x-5">
        <a target="_blank" className="subheading-1 text-amazon" href={card.url}>
          View More Information
        </a>
        <button
          onClick={() => removeCardHandler(card.id)}
          className="bg-red-500 primary-btn"
        >
          Remove Card
        </button>
      </div>
    </div>
  );
};

export default CardDescription;
