
const PlayerNames = (props) => {
    return (
        <>
            <div className="playerInfoCard wrapper">
                <form onSubmit={props.handleAvatarSubmit} action="">
                    <label htmlFor="playerName">Enter your Name to Get your Robot!</label>
                    <div className="avatarGenerator">
                        <input required onChange={props.handleUserName} type="text" id="playerName" value={props.userName} />
                        <button onClick={() => {props.allPlayerArrUpdate()}}>Generate 🤖</button>
                    </div>
                </form>

                {props.avatarImage !== '' &&
                    <div className="avatarContainer">
                        <p>Hello, {props.userName}, please meet your avatar</p>
                        <div className="avatarImageContainer">
                            <img src={`https://robohash.org/${props.avatarImage}.png`} alt='your avatar'></img>
                        </div>
                    </div> }
                {
                    props.avatarError ? <p className="errorMessage">Oops - Don't forget to fill out your name to meet your robot.</p> : null
                }
            </div>
        </>
    )
}

export default PlayerNames;

