
const PlayerNames = (props) => {

    return (
        <>

            <div className="playerInfoCard wrapper">
                {/* Form to gather user name and produce avatar */}
                <form onSubmit={props.handleAvatarSubmit} action="">
                    <label htmlFor="playerName">Enter your Name to Get your Robot!</label>

                    <div className="avatarGenerator">
                        <input required onChange={props.handleUserName} type="text" id="playerName" value={props.userName} />
                        <button onClick={props.handleNameSubmit}>Generate 🤖</button>
                    </div>
                </form>

                {/* If username is set within setAvatarImage, provide an avatar */}
                {props.avatarImage !== '' ?
                    <div className="avatarContainer">
                        <p>Hello, {props.userName}, please meet your avatar</p>
                        <div className="avatarImageContainer">
                            <img src={`https://robohash.org/${props.avatarImage}.png`} alt='your avatar'></img>
                        </div>
                    </div> : null}
                {/* End of Avatar Image div */}
            </div>
            {/* End of Player Info Card div */}
        </>
    )
}

export default PlayerNames;

