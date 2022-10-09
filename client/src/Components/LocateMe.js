import { useState } from 'react';
import '../css/LocateMe.css';

const LocateMe = () => {

  // State may need to be lifted up to whereever location is being used
  const [userLocationText, setUserLocationText] = useState();

  return (
    <div className="location-container">
      <div className="form-container">
        <form id="user-location">
          <div>
            <label htmlFor="user-location">
              Location
            </label>
          </div>
          <input 
            type="text" 
            value={userLocationText}
            name="user-location" 
            id="user-location" 
            placeholder="Address"
            required 
            onChange={(event) => setUserLocationText(event.target.value)}
          />
          <input type="submit" value="Enter" />
        </form>
      </div>
    </div>
  )
};

export default LocateMe;