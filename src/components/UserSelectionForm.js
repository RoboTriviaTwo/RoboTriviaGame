// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

const UserSelectionForm = (props) => {

  return (
    <>
      <form
        action=""
        onSubmit={(event) => {
          props.submitHandler(event);
        }}
      >
        <fieldset>
          <label htmlFor="playerNumbers">Choose the Number of Players</label>
          {/* <select
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
          </select> */}

          <label htmlFor="categoryType">Choose Your Category</label>
          <select
            name="categoryType"
            id="categoryType"
            onChange={props.handleCategoryChoice}
            value={props.userCategory}
          >
            <option value="placeholder" default hidden>
              Pick One
            </option>
            {props.categoryArr.map((categoryObj) => {
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
            onChange={props.handleDifficultyChoice}
            value={props.userDifficulty}
          >
            <option value="placeholder" default hidden>
              Pick One
            </option>
            {props.difficultyArr.map((difficultyItem) => {
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
    
    {/* {props.submitButton ? <Link to={`/playernames/${numOfPlayers}`}>Continue player names</Link> : null} */}
    </>
  );
};

export default UserSelectionForm;
