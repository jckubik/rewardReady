import { useRef, useState } from "react";
import "../css/LocateMe.css";
import Input from "./utils/Input";

const Location = ({ changeState, visible = false }) => {
    // State may need to be lifted up to whereever location is being used
    // const [storeName, setStoreName] = useState();

    const userCity_r = useRef();
    const userState_r = useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        changeState({
            userCity: userCity_r.current.value,
            userState: userState_r.current.value,
        });
    };

    if (!visible) return null;

    return (
        <div className="form-container bg-[#e4e7ea] flex flex-col gap-5 text-center py-10 px-10 min-w-[500px] rounded-lg">
            <h1 className="text-3xl font-bold">Help Us Serve You Better</h1>
            <h2 className="text-xl font-medium">Enter Location</h2>
            <form id="user-location" className="flex flex-col gap-5">
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
    );
};

export default Location;
