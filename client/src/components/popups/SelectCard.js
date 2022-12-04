import { useEffect, useState } from "react";
import {
    addCard,
    insertCardInToWallet,
    removeCardFromWallet,
} from "../../reduxSlices/walletSlice";
import { useDispatch, useSelector } from "react-redux";
import "../../css/SelectCard.css";
import api from "../../utils/api";
const SelectCard = ({ visible, setVisible, isSurvey = false }) => {
    const [creditCards, setCreditCards] = useState([]);
    const [selectedCC, setSelectedCC] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const wallet = useSelector((state) => state.wallet.cards);
    const removeCardHandler = async (cardId) => {
        dispatch(removeCardFromWallet(cardId));
        let resp = await api.removeCardFromWallet(cardId);
        if (resp.name && resp.name === "AxiosError") {
            console.log(resp.response.data.message);
        }
    };
    const onSubmit = async () => {
        if (!selectedCC) return;
        setLoading(true);
        let resp = await api.insertCardToWallet(selectedCC);
        if (resp.name && resp.name === "AxiosError") {
            console.log(resp.response.data.message);
        } else {
            dispatch(insertCardInToWallet(resp));
        }
        setLoading(false);
        setSelectedCC("");
    };

    console.log(wallet);

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
            className="w-screen h-screen fixed bg-[#0000009d] top-0 left-0 z-50 grid place-items-center font-inter"
            onClick={() => setVisible(false)}
        >
            {loading ? (
                <div className="loader"></div>
            ) : (
                <div
                    className="bg-[#e4e7ea] min-w-[500px] rounded-lg py-10 px-10"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div
                        className="flex flex-col gap-5 text-center"
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
                    <div className="flex flex-col w-full gap-2 mt-5">
                        {wallet.map((card) => {
                            return (
                                <div
                                    className="bg-white w-full rounded-lg p-3 flex justify-between items-center"
                                    key={card.id}
                                >
                                    <span className="w-2/3 truncate">
                                        {card.title}
                                    </span>
                                    <button
                                        className="primary-btn bg-red-500"
                                        onClick={() =>
                                            removeCardHandler(card.id)
                                        }
                                    >
                                        Remove Card
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    {isSurvey && (
                        <button
                            className="primary-btn w-full"
                            onClick={() => setVisible(false)}
                        >
                            Next
                        </button>
                    )}
                </div>
            )}
        </div>
    ) : null;
};

export default SelectCard;
