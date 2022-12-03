import { useEffect, useState } from "react";
import { addCard, insertCardInToWallet } from "../../reduxSlices/walletSlice";
import { useDispatch } from "react-redux";
import "../../css/SelectCard.css";
import api from "../../utils/api";
const SelectCard = ({ visible, setVisible }) => {
  const [creditCards, setCreditCards] = useState([]);
  const [selectedCC, setSelectedCC] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async () => {
    setLoading(true);
    let resp = await api.insertCardToWallet(selectedCC);
    if (resp.name && resp.name === "AxiosError") {
      console.log(resp.response.data.message);
    } else {
      dispatch(insertCardInToWallet(resp));
    }
    setLoading(false);
    setVisible(false);
  };

  const handleOnChangeSelect = async (e) => {
    setSelectedCC(e.target.value);
  };

  useEffect(() => {
    api.getCreditCards().then((cards) => {
      setCreditCards(cards);
    });
  }, []);
  return visible ? (
    <div
      className="w-screen h-screen fixed bg-[#0000009d] top-0 z-50 grid place-items-center font-inter"
      onClick={() => setVisible(false)}
    >
      {
        loading ?
        <div className="loader"></div>
        :
        <div
          className="bg-[#e4e7ea] flex flex-col gap-5 text-center py-10 px-10 min-w-[500px] rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-3xl font-bold">Add Credit Card</h2>
          <div className="space-x-3">
            <select
              defaultValue=""
              onChange={(e) => handleOnChangeSelect(e)}
              className="h-9 rounded-xl body w-80"
            >
              <option value="">Select credit card</option>
              {creditCards.map((cc) => (
                <option key={cc.id} value={cc.id}>
                  {cc.title}
                </option>
              ))}
            </select>
            <button onClick={onSubmit} className="primary-btn">
              Add Card
            </button>
          </div>
        </div>
      }
    </div>
  ) : null;
};

export default SelectCard;
