// Customization.js
import axios from 'axios';

const Customization = () => {
              {/* <PlayerNames
            handleUserName={handleUserName}
            userName={userName}
            allPlayerArrUpdate={allPlayerArrUpdate}
            handleAvatarSubmit={handleAvatarSubmit}
            avatarImage={avatarImage}
            avatarError={avatarError}
          /> */}
          
          {/* <form
            className='userSelectionContainer'
            action=""
            onSubmit={(event) => {
            submitHandler(event);
            }}
          >
            <fieldset className='formHeader'>
              <div className='playerChoiceCard wrapper'>
                <label htmlFor="categoryType">Category</label>
                <select 
                  name="categoryType"
                  id="categoryType"
                  onChange={handleCategoryChoice}
                  value={userChoiceObject.userCategory}
                >
                <option value="placeholder" default hidden>Pick One</option>
                {categoryArr.map((categoryObj) => {
                  return (
                      <option key={categoryObj.id} value={categoryObj.id}>
                        {`${categoryObj.name}`}
                      </option>
                    );
                  })}
                </select>
              </div> */}

              {/* <div className='playerChoiceCard'>
                <label htmlFor="difficulties">Difficulty</label>
                <select 
                  name="difficulties"
                  id="difficulties"
                  onChange={handleDifficultyChoice}
                  value={userChoiceObject.userDifficulty}
                >
                  <option value="placeholder" default hidden>Pick One</option>

                  {difficultyArr.map((difficultyItem) => {
                    return (
                      <option key={difficultyItem} value={difficultyItem}>{`${difficultyItem}`}</option>
                    );
                  })}
                </select>
              </div>
            </fieldset> */}

            {/* {
              selectionError ? <p className='errorMessage'>Oops, the trivia wizards need you to pick another category.</p> : null
            }

            {
              networkErrorMsg ? <p className='errorMessage'>Sorry – there was an issue while making the request. Please check again later.</p> : null
            }

            <div className='formSubmit'>
                <button type="submit">Submit 🤖 </button>
                <div className="quizRouterBtn">
                  {quizQuestions ? <Link to='/quiz'>Next »</Link> : null}
                </div>
            </div>
          </form> */}

    return (
        <form action="">

        </form>
    )
}

export default Customization;