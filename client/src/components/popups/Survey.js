import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Location from "../Location";
import Store from "../Stores";
import LocateMe from "./LocateMe";

const Survey = ({ visible = true, setVisible }) => {
    const [surveyStep, setSurveyStep] = useState(1);
    const [cityName, setCityName] = useState("");
    const [stateName, setStateName] = useState("");

    const locationSetupHandler = (val) => {
        console.log(val);
        setSurveyStep(2);
    };

    const storeSetupHandler = (val) => {
        console.log(val);
        setVisible(false);
    };

    const changeCity = (cityData) => {
        localStorage.setItem("cityName", JSON.stringify(cityData));
        setCityName(cityData);
    };

    const changeState = (stateData) => {
        setStateName(stateData);
        localStorage.setItem("stateName", JSON.stringify(stateData));
    };

    if (!visible) return null;

    return (
        <div onClick={(e) => e.stopPropagation()}>
            {surveyStep === 1 && (
                // <Location
                //     changeState={locationSetupHandler}
                //     visible={surveyStep === 1}
                // />
                <LocateMe
                    changeState={changeState}
                    changeCity={changeCity}
                    show={surveyStep === 1}
                    setShow={() => {}}
                    changeDisplayLoc={() => {
                        setSurveyStep(2);
                    }}
                />
            )}
            {surveyStep === 2 && (
                <Store
                    setSelectedStores={storeSetupHandler}
                    submit={setVisible}
                />
            )}
        </div>
    );
};

export default Survey;
