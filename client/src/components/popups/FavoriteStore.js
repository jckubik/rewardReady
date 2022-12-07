import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addFavoriteStore } from "../../reduxSlices/userSlice";
import api from "../../utils/api";

const FavoriteStore = () => {
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState("");
    const [favoriteStoreData, setFavoriteStoreData] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        api.getStores().then((data) => {
            setStores(data);
        });
        api.getFavorites().then((data) => {
            setFavoriteStoreData(data);
        });
    }, []);
    const reloadData = () => {
        api.getFavorites().then((data) => {
            setFavoriteStoreData(data);
        });
    };
    const AddStoreHandler = () => {
        console.log(selectedStore);
        if (!selectedStore) return;
        dispatch(addFavoriteStore({ storeName: selectedStore }));
        setTimeout(() => {
            reloadData();
        }, 1000);
    };
    return (
        <div className="p-3 max-w-[720px] mx-auto">
            <h1 className="text-center font-bold text-2xl">
                Select Favorite Stores
            </h1>
            <div className="flex justify-between my-5 gap-4">
                <select
                    className="h-9 rounded-xl body"
                    onChange={(e) => setSelectedStore(e.target.value)}
                >
                    <option value="">Select Store</option>
                    {stores &&
                        stores.map((item, idx) => {
                            // if (favoriteStoreData && !favoriteStoreData.stores.includes(item.name)) {
                                return (
                                    <option key={idx} value={item.name}>
                                        {item.name}
                                    </option>
                                );
                            // } else {
                            //     return (
                            //         <option key={idx} value={item.name}>
                            //             {item.name}
                            //         </option>
                            //     );
                            // }

                        })}
                </select>
                <button className="primary-btn" onClick={AddStoreHandler}>
                    Add
                </button>
            </div>
            <div className="flex flex-col gap-3 mt-5">
                {favoriteStoreData?.stores &&
                    favoriteStoreData.stores.map((item, idx) => {
                        return (
                            <div
                                key={idx}
                                className="flex w-full justify-between items-center bg-[#e4e7ea] p-3 rounded-lg"
                            >
                                <p>{item}</p>
                                <button
                                    className="primary-btn bg-red-500"
                                    onClick={() => {
                                        api.removeFavoriteStore({
                                            storeName: item,
                                        }).then(() => {
                                            reloadData();
                                        });
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default FavoriteStore;