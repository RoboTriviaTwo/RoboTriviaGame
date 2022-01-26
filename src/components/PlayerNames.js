
const PlayerNames = (props) => {
    // const [playerName, setPlayerName] = useState([]);
    
    // const {num} = useParams()
    // console.log(num)

    // how do we append an object to the userNameArr?
    //************* */ const userNameArr = [];
    // const [userName, setUserName] = useState('');
    

    
    // const [avatarUrl, setAvatarUrl] = useState('')

    

    // const handleUserName = (event) => {
    //     setUserName(event.target.value)
    //     // console.log(userName)
    // }



    // const userNameArr = 

    // userInfo Object:
    // name: userName,
    // avatar: avatarImage,
    // score: 

    // userNameArr.push({ name: props.userName, image: props.avatarImage })
    // console.log(userNameArr)

    return (
        <div className="playerInfoCard">
        <h2>Player Info</h2>
            <form onSubmit={props.handleAvatarSubmit} action="">
            <label htmlFor="playerName">Please Enter your Name</label>
            <input onChange={props.handleUserName} type="text" id="playerName" value={props.userName}/>
            <button
                onClick={props.handleNameSubmit}
                >🤖 Generate 🤖</button>
        </form>

        {props.avatarImage !== '' ?
        // <p>Hello, {userName}, please meet your avatar</p>
            <img src={`https://robohash.org/${props.avatarImage}.png`} alt='your avatar'></img> : null}      
            {/* need to get the image url in the image property of object */}
        </div>


        // <h1>Here is {num}</h1>
        // <form action="">
        //     <label htmlFor="playerName">Please enter your name:</label>
        //     <input type="text" id='playerName'onChange={} value={}/>
        //     <button onClick={}></button>
        // </form>
    )
}


export default PlayerNames;

