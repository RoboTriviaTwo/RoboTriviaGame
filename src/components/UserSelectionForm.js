import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserSelectionForm = () => {

  const difficultyArr = ["easy", "medium", "hard"];

  // api call for category
  const [categoryArr, setCategoryArr] = useState([]);

  // useStates from form component - for second api call
  const [numOfPlayers, setNumOfPlayers] = useState(0);

  const [userCategory, setUserCategory] = useState("");
  const [userDifficulty, setUserDifficulty] = useState("");

  const [submitButton, setSubmitButton] = useState(false);

  const handlePlayerNumber = (event) => {
    setNumOfPlayers(event.target.value);
  };

  const handleCategoryChoice = (event) => {
    setUserCategory(event.target.value);
  };

  const handleDifficultyChoice = (event) => {
    setUserDifficulty(event.target.value);
    // console.log(userDifficulty);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setSubmitButton(!submitButton);
  };

  // useEffect for axios - put this info in dropdown
  // associate id and name of category
  useEffect(() => {
    axios({
      url: "https://opentdb.com/api_category.php",
      method: "GET",
      responseType: "json",
      params: {},
    })
      .then((res) => {
        setCategoryArr(res.data.trivia_categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // console.log("app is running");
    if (userCategory !== "") {
      axios({
        url: "https://opentdb.com/api.php",
        method: "GET",
        responseType: "json",
        params: {
          amount: 10,
          category: userCategory,
          type: "multiple",
          difficulty: userDifficulty,
        },
      })
        .then((res) => {
          console.log(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [submitButton]);

  return (
    <>
      <form
        action=""
        onSubmit={(event) => {
          submitHandler(event);
        }}
      >
        <fieldset>
          <label htmlFor="playerNumbers">Choose the Number of Players</label>
          <select
            name="playerNumbers"
            id="playerNumbers"
            onChange={handlePlayerNumber}
            value={numOfPlayers}
          >
            <option value="placeholder" default hidden>
              Pick One
            </option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>

          <label htmlFor="categoryType">Choose Your Category</label>
          <select
            name="categoryType"
            id="categoryType"
            onChange={handleCategoryChoice}
            value={userCategory}
          >
            <option value="placeholder" default hidden>
              Pick One
            </option>
            {categoryArr.map((categoryObj) => {
              return (
                <option key={categoryObj.id} value={categoryObj.id}>
                  {`${categoryObj.name}`}
                </option>
              );
            })}
          </select>

          <label htmlFor="difficulties">Choose Your Difficulty</label>
          <select
            name="difficulties"
            id="difficulties"
            onChange={handleDifficultyChoice}
            value={userDifficulty}
          >
            <option value="placeholder" default hidden>
              Pick One
            </option>
            {difficultyArr.map((difficultyItem) => {
              return (
                <option key={difficultyItem} value={difficultyItem}>
                  {`${difficultyItem}`}
                </option>
              );
            })}
          </select>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    
    {submitButton ? <Link to={`/playernames/${numOfPlayers}`}>Continue player names</Link> : null}
    </>
  );
};

export default UserSelectionForm;
