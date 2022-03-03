import { Link } from 'react-router-dom';

const LandingPage = (() => {
    return (
        <>
            {/* container for the main robo image */}
            <section className="landing wrapper">
                <div className="headerImage">
                </div>
                
                {/* Route link to the quiz */}
                <div className='startingLink'>
                    <Link to='/welcome'>Click here to begin</Link>
                </div>
            </section>
        </>
    )
})

export default LandingPage;