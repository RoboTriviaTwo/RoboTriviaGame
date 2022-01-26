// import { useState } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";


const PlayerNames = (props) => {
    // const [playerName, setPlayerName] = useState([]);
    
    // const {num} = useParams()
    // console.log(num)

    // how do we append an object to the userNameArr?
    const userNameArr = [];
    // const [userName, setUserName] = useState('');
    const [avatarImage, setAvatarImage] = useState([]);

    const [allPlayersArrCounter, setAllPlayerArrCounter] = useState(0);
    // const [avatarUrl, setAvatarUrl] = useState('')

    const handleAvatarSubmit = (event) => {
        event.preventDefault()
        console.log(event)
        setAvatarImage(props.userName)
        // setAvatarUrl(`https://robohash.org/${avatarImage}.png`)
    };

    const handleNameSubmit = () => {
        if (avatarImage){
            setAllPlayerArrCounter(allPlayersArrCounter + 1)
            console.log(allPlayersArrCounter);
        }
    }



    // const handleUserName = (event) => {
    //     setUserName(event.target.value)
    //     // console.log(userName)
    // }



    // const userNameArr = 

    // userInfo Object:
    // name: userName,
    // avatar: avatarImage,
    // score: 

    userNameArr.push({name: props.userName, image: avatarImage })
    // console.log(userNameArr)

    return (
        <>
        <h2>Player Info</h2>
        <form onSubmit={handleAvatarSubmit} action="">
            <label htmlFor="playerName">Please Enter your Name</label>
            <input onChange={props.handleUserName} type="text" id="playerName" value={props.userName}/>
            <button>Generate 🤖</button>
            <button
                onClick={handleNameSubmit}
            >submit</button>
        </form>

        {avatarImage != '' ?
        // <p>Hello, {userName}, please meet your avatar</p>
            <img src={`https://robohash.org/${avatarImage}.png`}></img> : null}      
            {/* need to get the image url in the image property of object */}
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

