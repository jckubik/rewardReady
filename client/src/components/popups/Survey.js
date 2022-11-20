import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Location from "../Location";
import Store from "../Stores";

const Survey = ({ visible = true, setVisible }) => {
    const [surveyStep, setSurveyStep] = useState(1);

    const locationSetupHandler = (val) => {
        console.log(val);
        setSurveyStep(2);
    };

    const storeSetupHandler = (val) => {
        console.log(val);
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div onClick={(e) => e.stopPropagation()}>
            {surveyStep === 1 && (
                <Location
                    changeState={locationSetupHandler}
                    visible={surveyStep === 1}
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
