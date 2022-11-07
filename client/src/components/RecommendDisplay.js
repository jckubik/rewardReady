import api from '../utils/api';
import { useState } from 'react';

const RecommendDisplay = (props) => {

    const [recommendation, setRecommendation] = useState();
    
    // May need to change depending on how checking for logged in user works
    if (!localStorage.getItem('token')) {
        return (
            <div>
                <h1>Please sign in to view credit card recommendation</h1>
            </div>
        );
    } else {
        
        var store;

        // function getStore() {
        //     //TBD needs state from locateme - should move it up from locateme to app with call in header as well
        //     return store;
        // }

        setRecommendation(api.getCardRecommendationsForUser(props.store));
        
        return (
            <div>
                <h1>Card Recommendation: {recommendation}</h1>
            </div>
        ); 
    }
}

export default RecommendDisplay;