// PlayerDisplay.js

const PlayerDisplay = (prop) => {
    return(
        <section>
            <h2>Number of players: {prop.playerInfo.length}</h2>
            <div className="playerCard">
                {prop.playerInfo.map((player, index) => 
                    <div className="eachPlayerCard" key={index}>
                        <p>{player.playerName}</p>
                        <div className="avatarImageContainer">
                            <img src={player.playerAvatar} alt="Player Avatar" />
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default PlayerDisplay;