// import { useEffect } from 'react'
const PlayerNames = (props) => {

    return (
        <>
            <div className="playerRoboInfo wrapper">
                <form onSubmit={ props.allPlayerArrUpdate} action="">
                    <label htmlFor="playerName">Generate your player</label>
                    <div className="avatarGenerator">
                        <input required onChange={props.handleUserName} type="text" id="playerName" value={props.userName} placeholder="Your name"/>
                        <button >Generate 🤖</button>
                    </div>
                </form>

                {props.loading === false && props.avatarImage ? 
                    <div className="avatarContainer">
                        <p>Hello {props.userName}, please meet your avatar.</p>
                        <div className="avatarImageContainer">
                            <img src={`${props.imgSrc}`} alt='your avatar'></img>
                        </div>
                    </div> : 
                    <div className="loading"><p>LOADING</p></div>}
                {
                    props.avatarError ? <p className="errorMessage">Oops - Please generate your avatar first.</p> : null
                }
            </div>
        </>
    )
}

export default PlayerNames;

