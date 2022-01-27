import { Link } from 'react-router-dom';

const LandingPage = (() => {
    return (
        <>
            <div className="landingPage">
            </div>
            <div className='startingLink'>
                <Link to='/welcome'>Click here to begin</Link>
            </div>
        </>
    )
})

export default LandingPage;