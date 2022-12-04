import { useEffect, useRef, useState } from "react";
import api from "../utils/api";
import FavoriteStore from "./popups/FavoriteStore";
import Input from "./utils/Input";

const Store = ({ setSelectedStores, submit, setShowModal }) => {
  // State may need to be lifted up to whereever location is being used
  // const [storeName, setStoreName] = useState();

  const [stores, setStores] = useState([
    {
      id: 1,
      img: require("../assets/stores/amazon.png"),
      selected: false,
    },
    {
      id: 2,
      img: require("../assets/stores/atom.png"),
      selected: false,
    },
    {
      id: 3,
      img: require("../assets/stores/best-buy.png"),
      selected: false,
    },
    {
      id: 4,
      img: require("../assets/stores/macys.png"),
      selected: false,
    },
    {
      id: 5,
      img: require("../assets/stores/target.png"),
      selected: false,
    },
    {
      id: 6,
      img: require("../assets/stores/walgreens.png"),
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
    submit(false);
    setShowModal("inactive");
  };

  return (
    <div className="form-container bg-[#e4e7ea] flex flex-col gap-5 text-center py-10 px-10      rounded-lg">
      <div className="w-full">
        <FavoriteStore />
      </div>
      <button className="cta-btn" onClick={submitHandler}>
        Submit
      </button>
    </div>
  );
};

export default Store;
