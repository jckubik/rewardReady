import api from '/client/src/utils/api';

const RecommendDisplay = () => {

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

        var recommendation = api.getCardRecommendationsForUser(getUserID(), getStore());
        
        return (
            <div>
                <h1>Card Recommendation: {recommendation}</h1>
            </div>
        ); 
    }
}

export default RecommendDisplay;