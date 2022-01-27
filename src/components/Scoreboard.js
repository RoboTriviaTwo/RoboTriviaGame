// Scoreboard.js
import firebase from "./../firebase.js";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Scoreboard = (props) => {
  // firebase data - for userObj
  const [userObj, setUserObj] = useState([]);
  const [userKey, setUserKey] = useState([]);
  const [combineMethod, setCombineMethod] = useState(false);
  const [initialClick, setInitialClick] = useState(0);

  // useEffect to get firebase data
  useEffect(() => {
    const database = getDatabase(firebase);

    const dbRef = ref(database);

    // add an event listener to call data 'response'
    onValue(dbRef, (response) => {
      // storing new state
      const newState = [];

      const data = response.val();

      // for in loop to access player obj
      for (let key in data) {
        newState.push({ key: key, name: data[key] });
      }

      setUserObj(newState[0].name);
      setUserKey(newState[0].key);

      // runs combine method
        // compares current score with db scores to remove min score
      setCombineMethod(true);
    });
  }, []);

  let userObject = [];

  if (combineMethod) {
    // rest operator to gather array
    const allArray = (...array) => {
      return array;
    };

    // passing in arrays from userObj and allPlayers
    const allUsers = allArray(
      userObj[0],
      userObj[1],
      userObj[2],
      props.allPlayersArr[0]
    );

    // using new array, return scoreArr
    const scoreArr = allUsers.map((user) => {
      const score = user.score;
      return score;
    });
    
    const minScore = Math.min(...scoreArr);

    // finds obj with low score
    const minScoreUser = allUsers.find((item) => {
      return item.score === minScore;
    });

    // finds index of min score
      // from our allUsers array
    const index = allUsers.indexOf(minScoreUser);

    // splice removes from array
    allUsers.splice(index, 1);

    userObject = [...allUsers];
  }

  const submitHandler = () => {

    setInitialClick(initialClick + 1);

    // replaces existing values at child
    if (initialClick === 0) {
      const database = getDatabase(firebase);
      const childRef = ref(database, `/${userKey}`);
      return set(childRef, userObject)      
    }
  };

  return props.trigger && (
    <div className="popup">
      <div className="popupInner">
        <h1>High Scores</h1>
        <p>Your Score is: {props.currentScore} / 100.</p>
        <p>Top players</p>

        {userObj.map((user, index) => {
          return (
            <li key={index}>
              <p>{user.playerName}</p>
              <p>Score: {user.score} / 100</p>
            </li>
          );
        })}
        
        <button onClick={submitHandler}>Submit Score</button>
        <Link to="/">Click here to play again</Link>

      </div>
    </div>
  );
};

export default Scoreboard;
