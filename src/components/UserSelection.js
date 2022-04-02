import { useState } from 'react';
import { Link } from 'react-router-dom';
import PlayerDisplay from './PlayerDisplay.js';

const UserSelectionForm = (props) => {
  // quiz specific use states
  const [playerInfo, setPlayerInfo] = useState([]);  
  const [playerNumber, setPlayerNumber] = useState(0);
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [playerNumberSelect, setPlayerNumberSelect] = useState(0);

  // functions to handle submit
  const handlePlayerNumSelect = (event) => {
    const numOfPlayers = parseInt(event.target.value);
    setPlayerNumberSelect(numOfPlayers);
  }

  const handleSettingsSubmit = ((event) => {
    event.preventDefault();
    setPlayerNumber(playerNumberSelect);
  })

  const handlePlayerNameInput = ((event) => {
    setPlayerNameInput(event.target.value);
  })

  const handleNewPlayerSubmit = ((event) => {
    event.preventDefault();

    const newPlayerInfo = [
      ...playerInfo,
      {
        name: playerNameInput,
        score: 0,
        playerAvatar: `https://robohash.org/${playerNameInput}.png`
      }
    ];

    if (playerInfo.length <= playerNumber) {
      setPlayerInfo(newPlayerInfo);
      setPlayerNameInput('');
      props.updatePlayerInfo(newPlayerInfo);
    } else {
      alert("maximum numbers reached");
    }
    
  })
  return (
    <>
    <main>
      <section>
        <div className='userFormContainer'>
          <form onSubmit={handleSettingsSubmit}>
            <label htmlFor="playerNumSelect">Number of Players</label>
            <select name="playerNum" id="playerNumSelect" onChange={handlePlayerNumSelect}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <button type="submit">Submit</button>
          </form>

          <form onSubmit={handleNewPlayerSubmit}>
            <label htmlFor="playerNameInput">Enter Player Names</label>
            <input type="text" id='playerNameInput' value={playerNameInput} onChange={handlePlayerNameInput} required/>
            <button type="submit">Submit</button>
          </form>
          <PlayerDisplay playerInfo={playerInfo}/>


          <div className="quizRouterBtn">
            {playerInfo.length === playerNumber ? <Link to='/customize'>Next »</Link> : null}
          </div>
        </div>
      </section> 
   </main>      
    </>
  );
};

export default UserSelectionForm;
