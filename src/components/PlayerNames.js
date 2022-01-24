// import { useState } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";


const PlayerNames = () => {
    // const [playerName, setPlayerName] = useState([]);
    // const nameArr = [];
    // const {num} = useParams()
    // console.log(num)

    const [userName, setUserName] = useState('');
    const [avatarImage, setAvatarImage] = useState([]);

    const handleAvatarSubmit = (event) => {
        event.preventDefault()
        setAvatarImage(userName)
    };

    const handleUserName = (event) => {
        setUserName(event.target.value)
        console.log(userName)
    }


    return (
        <>
        <h2>Player Info</h2>
        <form onSubmit={handleAvatarSubmit} action="">
            <label htmlFor="playerName">Please Enter your Name</label>
            <input onChange={handleUserName} type="text" id="playerName" value={userName}/>
            <button>Generate 🤖</button>
        </form>

        {avatarImage != '' ?
        // <p>Hello, {userName}, please meet your avatar</p>
            <img src={`https://robohash.org/${avatarImage}.png`}></img> : null}      

        </>



      
        // <h1>Here is {num}</h1>
        // <form action="">
        //     <label htmlFor="playerName">Please enter your name:</label>
        //     <input type="text" id='playerName'onChange={} value={}/>
        //     <button onClick={}></button>
        // </form>
    )
}


export default PlayerNames;

