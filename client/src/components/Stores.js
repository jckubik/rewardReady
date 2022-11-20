import { useRef, useState } from "react";
import Input from "./utils/Input";

const Store = ({ setSelectedStores, submit }) => {
    // State may need to be lifted up to whereever location is being used
    // const [storeName, setStoreName] = useState();

    const [stores, setStores] = useState([
        {
            id: 1,
            img: require("../assets/stores/amazon.jpeg"),
            selected: false,
        },
        {
            id: 2,
            img: require("../assets/stores/atom.png"),
            selected: false,
        },
        {
            id: 3,
            img: require("../assets/stores/Best-Buy.jpeg"),
            selected: false,
        },
        {
            id: 4,
            img: require("../assets/stores/macys.png"),
            selected: false,
        },
        {
            id: 5,
            img: require("../assets/stores/Target.jpeg"),
            selected: false,
        },
        {
            id: 6,
            img: require("../assets/stores/Walgreens.png"),
            selected: false,
        },
        {
            id: 7,
            img: require("../assets/stores/walmart.png"),
            selected: false,
        },
    ]);

    const toggleStore = (id) => {
        const newStores = stores.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    selected: !item.selected,
                };
            } else return item;
        });
        setStores(newStores);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const selectedStores = stores.filter((item) => item.selected);
        setSelectedStores(selectedStores);
        submit(false);
    };

    return (
        <div className="form-container bg-[#e4e7ea] flex flex-col gap-5 text-center py-10 px-10 w-[500px] rounded-lg">
            <h2 className="text-3xl font-bold">Help us serve you better</h2>
            <h3 className="-mt-2">Please select your favorite stores</h3>
            <div className="grid grid-cols-3 gap-3 max-h-[270px] overflow-y-scroll">
                {stores.map((store) => (
                    <div
                        key={store.id}
                        className={`w-full aspect-square bg-white rounded-lg grid place-items-center cursor-pointer hover:ring-2 overflow-hidden ${
                            store.selected && "ring-2 ring-green-500"
                        }`}
                        onClick={() => toggleStore(store.id)}
                    >
                        <img src={store.img} />
                    </div>
                ))}
            </div>
            <button className="cta-btn" onClick={submitHandler}>
                Submit
            </button>
        </div>
    );
};

export default Store;
