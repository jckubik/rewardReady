import api from '/client/src/utils/api';
import { useState } from 'react';

const RecommendDisplay = () => {

    const [recommendation, setRecommendation] = useState();
    
    // May need to change depending on how checking for logged in user works
    if (!localStorage.getItem('token')) {
        return (
            <div>
                <h1>Please sign in to view credit card recommendation</h1>
            </div>
        );
    } else {
        
        var userID, store;
        function getUserID() {
            //TBD
            return userID;
        }

        function getStore() {
            //TBD
            return store;
        }

        setRecommendation(api.getCardRecommendationsForUser(getUserID(), getStore()));
        
        return (
            <div>
                <h1>Card Recommendation: {recommendation}</h1>
            </div>
        ); 
    }
}

export default RecommendDisplay;