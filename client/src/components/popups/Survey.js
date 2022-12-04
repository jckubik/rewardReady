import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Location from "../Location";
import Store from "../Stores";
import LocateMe from "./LocateMe";
import SelectCard from "./SelectCard";

const Survey = ({ visible = true, setVisible, setShowModal }) => {
    const [surveyStep, setSurveyStep] = useState(1);
    const [cityName, setCityName] = useState("");
    const [stateName, setStateName] = useState("");
    const [selectCard, setSelectCard] = useState(false);

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
                        setSelectCard(true);
                    }}
                />
            )}
            {surveyStep === 2 && (
                <SelectCard
                    visible={selectCard}
                    setVisible={(val) => {
                        setSelectCard(val);
                        setSurveyStep(3);
                    }}
                    isSurvey={true}
                />
            )}
            {surveyStep === 3 && (
                <Store
                    setSelectedStores={storeSetupHandler}
                    submit={(val) => {
                        setVisible(val);
                        setShowModal("inactive");
                    }}
                />
            )}
        </div>
    );
};

export default Survey;
