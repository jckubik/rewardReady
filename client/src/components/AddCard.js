import { useEffect, useState } from 'react';
import { ccStackSecret } from '../utils/api';

const AddCard = () => {
  const [cardCompany, setCardCompany] = useState();
  const [cardOptions, setCardOptions] = useState([]);
  const [cardToInsert, setCardToInsert] = useState("");

  // Fetch card options from CCStack API
  async function fetchCards() {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': ccStackSecret,
        'X-RapidAPI-Host': 'ccstack.p.rapidapi.com'
      }
    };
    
    await fetch(`https://ccstack.p.rapidapi.com/search/cards?query=${cardCompany}`, options)
      .then(response => response.json())
      .then(response => setCardOptions(response.results))
      .catch(err => console.error(err));
  }

  // Send POST request to API to insert card
  async function insertCard() {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardToInsert),
    };
    
    await fetch(`http://localhost:9000/api/wallet/items/cards/insert`, options)
      .then(response => console.log(response))
      .catch(err => console.error(err));

    setCardOptions([]);
  }

  // If the user has chsoen a company, fetch cards to display
  useEffect(() => {
    if (cardCompany) {
      fetchCards();
    }
  }, [cardCompany]);


  return (
    <div className="container flex-1">

        <div className='flex-1'>
          <label htmlFor="cardCompanies">Choose your card's provider:</label>

          <select name="cardCompanies" id="cardCompanies" onChange={(e) => setCardCompany([e.target.value])}>
            <option key={0} value="empty">Select</option>
            <option key={1} value="american express">American Express</option>
            <option key={3} value="barclays">Barclays</option>
            <option key={4} value="capital one">Capital One</option>
            <option key={5} value="chase">Chase</option>
            <option key={6} value="citi">Citi</option>
            <option key={7} value="discover">Discover</option>
            <option key={8} value="synchrony">Synchrony</option>
            <option key={9} value="u.s. bank">U.S. Bank</option>
            <option key={10}value="wells fargo">Wells Fargo</option>
            <option key={12} value="pnc">PNC Bank</option>
          </select>
        </div>
      {
        cardOptions.length === 0 ? 
          ""
          :

        <div className='flex-1'>
          <div className='flex-1'>
            <label htmlFor="cardOptions">Choose your card:</label>

            <select 
              name="cardOptions" 
              id="cardOptions" 
              onChange={(event) => setCardToInsert(cardOptions[event.target.value])}
              >
              <option value="empty">Select</option>
              {
                cardOptions.map((card, index) => (
                  <option value={index} key={card.id}>{ card.title }</option>
                ))
              }
            </select>
          </div>
          <div>
            <button onClick={insertCard}>Add Card</button>
          </div>
        </div>
      }
    </div>
  );
};

export default AddCard;