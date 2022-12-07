import { useState, useRef, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import "../../css/LocateMe.css";

const LocateMe = (props) => {
    // State may need to be lifted up to whereever location is being used
    // const [storeName, setStoreName] = useState();
    const [userCity, setUserCity] = useState();
    const [userState, setUserState] = useState();
    const [states, setStates] = useState(State.getStatesOfCountry("US"));
    const [cities, setCities] = useState([]);
    const [cityVisibility, setCityVisibility] = useState(false);

    // const store_r = useRef();
    const city_r = useRef();
    const state_r = useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        // props.changeStore(store_r.current.value);
        props.changeCity(city_r.current.value);
        props.changeState(state_r.current.value);
        props.changeDisplayLoc(true);
        props.setShow(false);
        setCityVisibility(false);
    };

    const changeCities = (e) => {
        setCities(City.getCitiesOfState("US", e));
        setCityVisibility(true);
    };
    return props.show ? (
        <div
            className="w-screen h-screen fixed bg-[#0000009d] top-0 z-50 grid place-items-center font-inter left-0"
            onClick={() => props.setShow(false)}
        >
            <div
                className="bg-[#e4e7ea] flex flex-col gap-5 text-center py-10 px-10 min-w-[500px] rounded-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="form-container flex items-center">
                    <form
                        id="user-location"
                        className="w-full max-w-lg flex flex-col gap-5 text-center"
                    >
                        <h2 className="text-3xl font-bold">Enter Location</h2>
                        {/* <div className='space-x-2'>
          <label htmlFor="store-name">
            Store Name
          </label>
          <input 
            type="text" 
            value={storeName}
            name="store-name" 
            id="store-name" 
            placeholder="Store"
            ref={store_r}
            required 
          />
          </div> */}
                        {cityVisibility ? (
                            <div className="relative space-x-2 flex justify-between w-full">
                                <label htmlFor="user-city">City</label>
                                {/* <input 
            type="text" 
            // value={userCity}
            name="user-city" 
            id="user-city" 
            placeholder="City"
            ref={city_r}
            required 
          /> */}
                                <select ref={city_r} required>
                                    {cities.map((city, index) => (
                                        <option
                                            value={city.name}
                                            key={city.name}
                                        >
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ) : null}
                        <div className="space-x-2 flex justify-between w-full">
                            <label htmlFor="user-state">State</label>
                            {/* <input 
            type="text" 
            value={userState}
            name="user-state" 
            id="user-state" 
            placeholder="State"
            ref={state_r}
            required 
          /> */}
                            <select
                                ref={state_r}
                                onChange={(e) => changeCities(e.target.value)}
                                required
                            >
                                <option value="">Select</option>
                                {states.map((state, index) => {
                                    const notIncluded = ["AS", "GU", "MP", "VI"];
                                    if (!notIncluded.includes(state.isoCode) && !state.isoCode.includes("UM")) {
                                        return (
                                            <option
                                                value={state.isoCode}
                                                key={state.isoCode}
                                            >
                                                {state.isoCode}
                                            </option>
                                        );
                                    }

                                })}
                            </select>
                        </div>
                        <button
                            className="primary-btn w-full"
                            type="submit"
                            value="Enter"
                            onClick={submitHandler}
                        >
                            Enter
                        </button>
                    </form>
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
};

export default LocateMe;
