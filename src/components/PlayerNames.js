
const PlayerNames = (props) => {
    return (
        <>
            <div className="playerRoboInfo wrapper">
                <form onSubmit={props.handleAvatarSubmit} action="">
                    <label htmlFor="playerName">Generate your player</label>
                    <div className="avatarGenerator">
                        <input required onChange={props.handleUserName} type="text" id="playerName" value={props.userName} placeholder="Your name"/>
                        <button onClick={() => {props.allPlayerArrUpdate()}}>Generate 🤖</button>
                    </div>
                </form>

                {props.avatarImage !== '' &&
                    <div className="avatarContainer">
                        <p>Hello {props.userName}, please meet your avatar.</p>
                        <div className="avatarImageContainer">
                            <img src={`https://robohash.org/${props.avatarImage}.png`} alt='your avatar'></img>
                        </div>
                    </div> }
                {
                    props.avatarError ? <p className="errorMessage">Oops - Please generate your avatar first.</p> : null
                }
            </div>
        </>
    )
}

export default PlayerNames;

