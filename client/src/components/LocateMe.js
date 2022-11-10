import { useState } from 'react';
import '../css/LocateMe.css';

const LocateMe = (props) => {

  // State may need to be lifted up to whereever location is being used
  // const [storeName, setStoreName] = useState();
  const [userCity, setUserCity] = useState();
  const [userState, setUserState] = useState();

  return (
    <div className="location-container">
      <div className="form-container">
        <form id="user-location">
          <label htmlFor="store-name">
            Store Name
          </label>
          <input 
            type="text" 
            value={props.data}
            name="store-name" 
            id="store-name" 
            placeholder="Store"
            required 
            onChange={(event) => props.changeState(event.target.value)}
          />
          <label htmlFor="user-city">
            City
          </label>
          <input 
            type="text" 
            value={userCity}
            name="user-city" 
            id="user-city" 
            placeholder="City"
            required 
            onChange={(event) => setUserCity(event.target.value)}
          />
          <label htmlFor="user-state">
            State
          </label>
          <input 
            type="text" 
            value={userState}
            name="user-state" 
            id="user-state" 
            placeholder="Store"
            required 
            onChange={(event) => setUserState(event.target.value)}
          />
          <input type="submit" value="Enter" />
        </form>
      </div>
    </div>
  )
};

export default LocateMe;