import { useState } from "react";


const UserSelectionForm = (props) => {

    const difficultyArr = ["easy", "medium", "hard"];
    const [userCategory, setUserCategory] = useState("");
    const [userDifficulty, setUserDifficulty] = useState("");

    const handleCategoryChoice = (event) => {
        setUserCategory(event.target.value);
        // console.log(userCategory);
    }

    const handleDifficultyChoice = (event) => {
        setUserDifficulty(event.target.value);
        // console.log(userDifficulty);
    }
    const testFunction = (event, userDifficulty, userCategory) => {
        event.preventDefault();
        console.log(userDifficulty, userCategory);
    }


    return(

        <form 
        action=""
            onSubmit={(event) => { testFunction(event, userDifficulty, userCategory)}}
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
                    {props.array.map((categoryObj) => {
                        // console.log(categoryObj);
                        return(
                            <option key={categoryObj.id} value={categoryObj.id}>
                                {`${categoryObj.name}`}
                            </option>
                        )
                    })}
                </select>
                
                
                <label htmlFor="difficulties">Choose Your Category</label>
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