import videoHomePage from '../../assets/video/homepage.mp4';
const HomePage = () => {
    return (
        <>
            <div className='Homepage-content'>
                <div className="text-container">
                    <div className='user-stats'>
                        20M+ Users 
                        <br />
                        Read Our <a href="/">Success Stories</a>
                    </div>
                    <div className='homepage-maintitle'>Quizs</div>
                    <hr class="hr" />
                    <div className='homepage-sidetitle'>
                        <span className='top'>Push Your Limits And Spark Curiosity With Thousands Of Fun And Challenging Questions</span>
                        <br /><br />
                        <span className='bottom'>Attract Customer And Increase Time & Brand Recall With Polls, Quizzes, & More.</span>
                    </div>
                    <hr class="hr" />
                    <div className='homepage-btn'><button>Get started - it's FREE </button></div>
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