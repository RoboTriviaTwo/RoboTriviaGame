const UserSelectionForm = (props) => {
    return(

        <form action="">
            {/* <p>Number of Players</p> */}
            <p>Category</p>
            <fieldset>
                <label htmlFor="categoryType">Choose Your Category</label>
                <select name="categoryType" id="categoryType">
                    {props.array.map((categoryObj) => {
                        console.log(categoryObj);
                        return(
                            <option key={categoryObj.id} value={categoryObj.id}>
                                {`${categoryObj.name}`}
                            </option>
                        )
                    })}
                </select>
            </fieldset>
            {/* <p>Difficulty</p> */}
        </form>
        
    );
}

export default UserSelectionForm;