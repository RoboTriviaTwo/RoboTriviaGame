import { useState } from "react";


const UserSelectionForm = (props) => {
    const { array, submitHandler, handleCategoryChoice, handleDifficultyChoice, userCategory, userDifficulty } = props;
    const difficultyArr = ["easy", "medium", "hard"];

    return(
        <form 
        action=""
        onSubmit={(event) => {submitHandler(event)}}
        >
            {/* <p>Number of Players</p> */}
            <p>Category</p>
            <fieldset>
                <label htmlFor="categoryType">Choose Your Category</label>
                <select 
                name="categoryType" 
                id="categoryType"
                onChange={handleCategoryChoice}
                value={userCategory}
                >
                    <option value="placeholder" default hidden>Pick One</option>
                    {array.map((categoryObj) => {
                        // console.log(categoryObj);
                        return(
                            <option key={categoryObj.id} value={categoryObj.id}>
                                {`${categoryObj.name}`}
                            </option>
                        )
                    })}
                </select>
                
                
                <label htmlFor="difficulties">Choose Your Difficulty</label>
                <select 
                name="difficulties" 
                id="difficulties"
                onChange={handleDifficultyChoice}
                value={userDifficulty}
                >
                    <option value="placeholder" default hidden>Pick One</option>
                    {difficultyArr.map((difficultyItem) => {
                       
                        return (
                            <option key={difficultyItem} value={difficultyItem}>
                                {`${difficultyItem}`}
                            </option>
                        )
                    })}
                </select>

                <button type="submit">Submit</button>


            </fieldset>
            {/* <p>Difficulty</p> */}
        </form>
        
    );
}

export default UserSelectionForm;