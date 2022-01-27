// Scoreboard.js
import firebase from "./../firebase.js";
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Scoreboard = (props) => {
  // firebase data - for userObj
  const [userObj, setUserObj] = useState([]);
  const [userKey, setUserKey] = useState([]);
  const [combineMethod, setCombineMethod] = useState(false);
  // const [newUserObj, setNewUserObj] = useState([]);

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
      for (let key in data) {
        newState.push({ key: key, name: data[key] });
      }
      // setState by accessing first array from firebase
      console.log(newState);
      // console.log(newState[0].name);
      setUserObj(newState[0].name);
      setUserKey(newState[0].key);
      // setUserObj([
      //   { playerName: "Imitiaz", score: 99, avatar: "avatarUrl" },
      //   { playerName: "Joey", score: 62, avatar: "avatarUrl" },
      //   { playerName: "Laura", score: 80, avatar: "avatarUrl" },
      // ]);
      setCombineMethod(true);

      // remove
      // handleScoreRemove(newState[0].key);
    });
  }, []);

  // runs when setSubmit is true
  // removes lowest score from array of current users and db scores
  let userObject = [];
  // let userObject2 = [
  //   {
  //     playerName: "",
  //     score: 0}
  // ];
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

    userObject = [...allUsers];
    console.log(userObject);
    console.log(`this ${userObject}`);
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

  // const handleScoreRemove = (ArrayId) => {

  //   const database = getDatabase(firebase);
  //   const dbRef = ref(database, `/${ArrayId}`);

  //   remove(dbRef);
  // };

  const [testFlipValue, setTestFlipValue] = useState(false);

  const testFLiper = () => {
    setTestFlipValue(!testFlipValue);
    console.log(testFlipValue);
    if (testFlipValue === true) {
      const database = getDatabase(firebase);
      const childRef = ref(database, `/${userKey}`);
      return set(childRef, userObject)      
    }
  };

  // ** function to add to db
  // useEffect(() => {
  //   const database = getDatabase(firebase);
  //   // reference database
  //   const dbRef = ref(database);

  //   push(dbRef, userObject);

  //   // const handleScoreRemove = (ArrayId) => {

  //   //   const database = getDatabase(firebase);
  //   //   const dbRef = ref(database, `/${ArrayId}`);

  //   //   remove(dbRef);
  //   // }
    
  //   // handleScoreRemove(userKey);

  // }, [testFlipValue]);


    // const handleScoreRemove = (ArrayId) => {
    //   const database = getDatabase(firebase);
    //   const dbRef = ref(database, `/${ArrayId}`);

    //   remove(dbRef);
    // };

    // handleScoreRemove(userKey);

  return props.trigger ? (
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
        <Link to="/"> Click here to play again</Link>
        <button onClick={testFLiper}>test</button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Scoreboard;
