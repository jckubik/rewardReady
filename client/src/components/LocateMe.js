import { useRef, useState } from "react";
import "../css/LocateMe.css";
import Input from "./utils/Input";

const LocateMe = ({ changeState, visible = false, setVisible }) => {
    // State may need to be lifted up to whereever location is being used
    // const [storeName, setStoreName] = useState();

    const storeName_r = useRef();
    const userCity_r = useRef();
    const userState_r = useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        changeState({
            storeName: storeName_r.current.value,
            userCity: userCity_r.current.value,
            userState: userState_r.current.value,
        });
    };

    if (!visible) return null;

    return (
        <div
            className="w-screen h-screen fixed bg-[#0000009d] top-0 left-0 z-50 grid place-items-center font-inter"
            onClick={() => setVisible(false)}
        >
            <div
                className="form-container bg-[#e4e7ea] flex flex-col gap-5 text-center py-10 px-10 min-w-[500px] rounded-lg"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <h2 className="text-3xl font-bold">Enter Location</h2>
                <form id="user-location" className="flex flex-col gap-5">
                    <Input
                        placeholder="Store Name"
                        type="text"
                        className="w-full rounded-sm py-2"
                        name="text"
                        label="Store Name"
                        ref={storeName_r}
                    />
                    <Input
                        placeholder="user city"
                        type="text"
                        className="w-full rounded-sm py-2"
                        name="user-city"
                        label="User City"
                        ref={userCity_r}
                    />
                    <Input
                        placeholder="user state"
                        type="text"
                        className="w-full rounded-sm py-2"
                        name="text"
                        label="User State"
                        ref={userState_r}
                    />
                    <button className="cta-btn" onClick={submitHandler}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LocateMe;
