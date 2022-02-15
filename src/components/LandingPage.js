import { Link } from 'react-router-dom';

const LandingPage = (() => {
    return (
        <>
            {/* container for the main robo image */}
            <div className="landingPage"></div>
            
            {/* Route link to the quiz */}
            <div className='startingLink'>
                <Link to='/welcome'>Click here to begin</Link>
            </div>
        </>
    )
})

export default LandingPage;