// Scoreboard.js
import firebase from "./../firebase.js";
import { getDatabase, ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Scoreboard = (props) => {
  // firebase data - for userObj
  const [userObj, setUserObj] = useState([]);
  const [combineMethod, setCombineMethod] = useState(false);

  useEffect(() => {
    const database = getDatabase(firebase);

    const dbRef = ref(database);

    // add an event listener to call data 'response'
    onValue(dbRef, (response) => {
      // storing new state
      const newState = [];
      // storing in data variable
      const data = response.val();

      // for in loop to access player obj
      for (let player in data) {
        newState.push(data[player]);
      }
      // setState by accessing first array from firebase
      setUserObj(newState[0]); 
      setCombineMethod(true);
    });
  }, []);

  // runs when setSubmit is true
  // removes lowest score from array of current users and db scores
  if (combineMethod) {
    const allArray = (...array) => {
      return array;
    };

    const allUsers = allArray(
      userObj[0],
      userObj[1],
      userObj[2],
      props.allPlayersArr[0]
    );

    const scoreArr = allUsers.map((user) => {
      const score = user.score;
      return score;
    });

    const minScore = Math.min(...scoreArr);

    // returns obj with lowest score
    const result = allUsers.find((item) => {
      return item.score === minScore;
    });

    // the index of min score
    const index = allUsers.indexOf(result);

    // removes player with lowest score
    allUsers.splice(index, 1);
  } 

  // ** console.log to access userObj and our players
  // console.log(userObj); // our firebase array
  // console.log(props.allPlayersArr); // our array 

  // scenario to compare
  // we have a new array containing current user 
  // we want to compare it with three database user object score's

  // pseudocode
  // 1. userObj - is the array in firebase
    // access score property
    // perform math.min function on the array of scores
    // match current array against lowest score

  // 2. display to users
    // show top three players

  // 3. push to firebase 
    // on user click of 'submit score' button
    // empty current array from database
    // new allUsers array pushed

  

  // ** function to push to db
  // useEffect(() => {
  //   const database = getDatabase(firebase);
  //   // reference database
  //   const dbRef = ref(database);

  //   push(dbRef, newUserObj);
  // }, [newUserObj]);

  return (props.trigger) ? (
    <div className="popup">
      <div className="popupInner">
      <h1>High Scores</h1>
      <p>Your Score is: {props.currentScore} / 10.</p>
      <p>Top players</p>
      {userObj.map((user, index) => {
        return (
          <li key={index}>
            <p>{user.playerName}</p>
            <p>Score: {user.score} / 100</p>
          </li>
        );
      })}
      <button>Submit Score</button>
      <Link to='/'> Click here to play again</Link>
    </div>
    </div>
  ) : '';
};

export default Scoreboard;
