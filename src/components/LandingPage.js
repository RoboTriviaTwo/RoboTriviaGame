import { Link } from 'react-router-dom';

const LandingPage = (() => {
    return (
        <>
            <div className="landingPage">
                {/* container for the image such that it will stay on the landing page and not within other components */}
            </div>
            {/* link to go to the quiz */}
            <div className='startingLink'>
                <Link to='/welcome'>Click here to begin</Link>
            </div>
        </>
    )
})

export default LandingPage;