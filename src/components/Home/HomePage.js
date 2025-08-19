// import { Nav } from 'react-bootstrap';
import videoHomePage from '../../assets/video/homepage.mp4';
import { useSelector } from 'react-redux';
import {  useNavigate } from "react-router-dom"
const HomePage = () => {
    const isAuthenticated = useSelector(state => state?.isAuthenticated);
    // const account = useSelector(state => state?.account);
    const Navigate=useNavigate();

    return (
        <>
            <div className='Homepage-content'>
                <div className="text-container">
                    <div className='user-stats'>
                        20M+ Users
                        <br />
                        Read Our <a href="/">Success Stories</a>
                    </div>
                    <div className='homepage-maintitle'>Quiz</div>
                    <hr className="hr" />
                    <div className='homepage-sidetitle'>
                        <span className='top'>Push Your Limits And Spark Curiosity With Thousands Of Fun And Challenging Questions</span>
                        <br /><br />
                        <span className='bottom'>Attract Customer And Increase Time & Brand Recall With Polls, Quizzes, & More.</span>
                    </div>
                    <hr className="hr" />
                    <div className='homepage-btn'>
                        {isAuthenticated===false?
                        <button onClick={()=>{Navigate("/login")}}>Get started - it's FREE </button>
                        :
                        <button onClick={()=>{Navigate("/users")}}> Doing Quiz Now</button>
                    }
                        
                    </div>
                </div>
                <div className='video-container'>
                    <video autoPlay muted loop >

                        <source
                            src={videoHomePage}
                            type='video/mp4' />
                    </video>
                </div>
            </div>
        </>
    )
}
export default HomePage;