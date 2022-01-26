// Scoreboard.js
import firebase from "./../firebase.js";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Scoreboard = (props) => {
  // firebase data - for userObj
  const [userObj, setUserObj] = useState([]);
  // const [newUserObj, setnewUserObj] = useState([]);

  // button to activate it
  // const [scoreButton, setScoreButton] = useState(false);

  useEffect(() => {
    const database = getDatabase(firebase);
    // reference database
    const dbRef = ref(database);

    // add an event listener to call data 'response'
    onValue(dbRef, (response) => {
      // storing new state
      const newState = [];
      // storing in variable
      const data = response.val();

      // for in loop to access data property
      for (let player in data) {
        newState.push(data[player]);
      }
      // setState by accessing first array from firebase
      setUserObj(newState[0]); 
      // console.log(newState[0]); -- console log here
    });
  }, []);

  // sample firebase handler for testing
  // const scoreButtonHandler = () => {
  //   setnewUserObj([
  //     { playerName: "Imitiaz", score: 99, avatar: "avatarUrl" },
  //     { playerName: "Joey", score: 62, avatar: "avatarUrl" },
  //     { playerName: "Laura", score: 80, avatar: "avatarUrl" },
  //   ]);
  // };

  // our new array
  // allPlayersArr;
  console.log(userObj); // our firebase array
  console.log(props.allPlayersArr); // our array 

  // compare current scores to firebase to maintain 3 highscores in firebase
  const allArray = (...array) => {
    return array;
  }

  const allUsers = allArray(
    userObj[0],
    userObj[1],
    userObj[2],
    props.allPlayersArr[0]
  );

  const compareUserObj = () => {
    const scoreArr = allUsers.map((user) => {
      return user.score
  });

  const minScore = Math.min(...scoreArr);  

  // returns obj with lowest score
  const result = allUsers.find(item => {
    return item.score === minScore;
  })

  // the index of min score
  const index = allUsers.indexOf(result);

  // removes player with lowest score
  allUsers.splice(index, 1);
  }

  // filter the array and slice 




  // combined index array.score
  // call the function
  compareUserObj();


  // scenario to compare
  // we have a new array containing current user 
  // we want to compare it with three database user object score's

  // pseudocode
  // 1. userObj - is the array in firebase
    // create logic on the object's score property

    // compare with current user score property

    // pick out the index containing largest

  // 2. display
    // show scoreboard after filtering

  // 3. push to firebase 
    // on user click of 'submit score' button
    // empty current arrays 
    // current user scores get pushed with new top 3 players

  
    

  // useEffect to push
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
