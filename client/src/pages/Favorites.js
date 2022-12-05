import SubHeader from "../components/SubHeader";
import api from "../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

const Favorites = () => {
  const { favoriteStores } = useSelector((state) => state.user);
  const default_image = require("../assets/defaultCoupon.jpeg");
  console.log(default_image);
  const [selected, setSelected] = useState("Amazon");
  //   const [favoritesPlusLogos, setFavoritesPlusLogos] = useState([]);
  let favoritesPlusLogos = [];
  if (favoriteStores.stores.length > 0) {
    favoritesPlusLogos = favoriteStores.stores.map((storeName) => {
      const logoName = storeName
        .trim()
        .replace(/['.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        .replaceAll(" ", "-")
        .toLowerCase();
      let logoImportUri = null;
      try {
        logoImportUri = require(`../assets/stores/${logoName}.png`);
      } catch (err) {
        logoImportUri = default_image;
      }
      return [storeName, logoImportUri];
    });

    // setFavoritesPlusLogos(logos);

    // setSelected(favoritesPlusLogos[0][0]);
  }

  const [dealsCoupons, setDealsCoupons] = useState(null);
  const [, updateState] = useState();

  const handleClick = async (store) => {
    setSelected(store);
    let deals = [];
    await api
      .getDealsAndCouponsFromFavoriteStores()
      .then((response) => response[store])
      .then(
        (storeData) => (deals = [...storeData.coupons, ...storeData.deals])
      );
    setDealsCoupons(deals);
  };

  return (
    <div className="w-full">
      <SubHeader active="favorites" />
      <div className="flex flex-col gap-2 m-8 items-center">
        <div id="logo-container" className="flex flex-wrap">
          {favoritesPlusLogos.length > 0 ? (
            favoritesPlusLogos.map(([storeName, logo]) => (
              <div
                key={storeName}
                className={`bg-honeydew m-2 w-32 aspect-square bg-white rounded-lg grid place-items-center cursor-pointer hover:ring-2 overflow-hidden
                ${selected === storeName ? "ring-2 ring-green-500" : ""}`}
                onClick={() => handleClick(storeName)}
              >
                {logo.includes("defaultCoupon") ? (
                  <span className="heading-1 text-brunswick-green text-center">
                    {storeName}
                  </span>
                ) : (
                  <img alt={storeName} src={logo} />
                )}
              </div>
            ))
          ) : (
            <div>
              <h3>You don't have any favorite stores.</h3>
            </div>
          )}
        </div>
        <div id="deals-container" className="flex flex-col gap-2 m-8">
          {dealsCoupons === null
            ? null
            : dealsCoupons.map((deal) => (
                <div key={deal.id} className="flex items-center gap-4">
                  <a
                    href={deal.clickUrl ? deal.clickUrl : "#"}
                    className="pointer-cursor"
                  >
                    <img
                      className="object-cover w-32 h-16 flex-1"
                      alt={deal.title}
                      src={deal.imgSrc ? deal.imgSrc : default_image}
                    />
                  </a>
                  <div className="max-w-xs flex-1">
                    <a
                      href={deal.clickUrl ? deal.clickUrl : "#"}
                      className="pointer-cursor"
                    >
                      <p className="truncate">{deal.title}</p>
                    </a>
                  </div>
                  <div className="text-center w-48">
                    <a
                      href={deal.clickUrl ? deal.clickUrl : "#"}
                      className="pointer-cursor"
                    >
                      <p className="truncate">{deal.merchantName}</p>
                    </a>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
