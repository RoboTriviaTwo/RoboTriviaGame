// import { useState } from "react";
import { useParams } from "react-router-dom";


const PlayerNames = () => {
    // const [playerName, setPlayerName] = useState([]);
    // const nameArr = [];
    const {num} = useParams()
    console.log(num)
    return (
      
        <h1>Here is {num}</h1>
        // <form action="">
        //     <label htmlFor="playerName">Please enter your name:</label>
        //     <input type="text" id='playerName'onChange={} value={}/>
        //     <button onClick={}></button>
        // </form>
    )
}


export default PlayerNames;

