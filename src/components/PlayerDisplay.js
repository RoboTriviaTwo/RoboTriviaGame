// PlayerDisplay.js

const PlayerDisplay = (prop) => {
    return(
        <section>
            {/* <p>Number of players: {prop.playerInfo.length}</p> */}
            <div className="playerCard">
                {prop.playerInfo.map((player, index) => 
                    <div className="eachPlayerCard" key={index}>
                        <p>{player.name}</p>
                        <p>{player.score}</p>
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