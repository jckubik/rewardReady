import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import LocateMe from './Components/LocateMe';

function App() {

  const [apiResponse, setApiResponse] = useState()

  function callAPI() {
      fetch("http://localhost:9000/testAPI", {
        mode: 'no-cors',
        credentials: 'same-origin',
      })
          .then(res => res.text())
          .then(res => setApiResponse(res));
  }

  useEffect(() => {
    callAPI();
  });


  return (
    <div className="App">
          <LocateMe></LocateMe>
          {/* <p>
            { apiResponse }
          </p> */}
    </div>
  );
}

export default App;
