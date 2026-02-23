// import { Nav } from 'react-bootstrap';
import videoHomePage from '../../assets/video/homepage.mp4';
import { useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from "react-router-dom"
import { useTranslation } from 'react-i18next';
const HomePage = () => {
    const { themeState } = useOutletContext();
    const isAuthenticated = useSelector(state => state?.isAuthenticated);
    // const account = useSelector(state => state?.account);
    const Navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <>
            <div className='mb-5'>
                <div className='Homepage-content '>
                    <div className="text-container">
                        <div className={themeState ? "user-stats-light" : "user-stats-dark"}>
                            {/* 20M+ Users */}
                            {t('homepage.userStats.userstats1')}
                            <br />
                            {t('homepage.userStats.userstats2')} <a href="/"> {t('homepage.userStats.userstats3')}</a>
                        </div>
                        <div className='homepage-maintitle'>Quiz</div>
                        <hr className="hr" style={themeState ? { color: "#000000ff" } : { color: "#ffffffff" }} />
                        <div className='homepage-sidetitle'>
                            <span className={themeState ? "top-light" : "top-dark"}>{t('homepage.sideTitle.titletop')}</span>
                            <br /><br />
                            <span className={themeState ? "bottom-light" : "bottom-dark"}>{t('homepage.sideTitle.titlebottom')}</span>
                        </div>
                        <hr className="hr" style={themeState ? { color: "#000000ff" } : { color: "#ffffffff" }} />
                        <div className='homepage-btn'>
                            {isAuthenticated === false ?
                                <button onClick={() => { Navigate("/login") }} className={themeState ? "theme-button-light" : "theme-button-dark"}>{t('homepage.buttonBegin.button1')} </button>
                                :
                                <button onClick={() => { Navigate("/users") }} className={themeState ? "theme-button-light" : "theme-button-dark"}> {t('homepage.buttonBegin.button2')}</button>
                            }

                        </div>
                    </div>
                    <div className='video-container'>
                        <video autoPlay muted loop onContextMenu={(e) => e.preventDefault()}>

                            <source
                                src={videoHomePage}
                                type='video/mp4' />
                        </video>
                    </div>
                </div>
            </div>

        </>
    )
}
export default HomePage;