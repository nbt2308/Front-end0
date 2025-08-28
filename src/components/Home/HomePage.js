// import { Nav } from 'react-bootstrap';
import videoHomePage from '../../assets/video/homepage.mp4';
import { useSelector } from 'react-redux';
import {  useNavigate } from "react-router-dom"
import { useTranslation } from 'react-i18next';
const HomePage = () => {
    const isAuthenticated = useSelector(state => state?.isAuthenticated);
    // const account = useSelector(state => state?.account);
    const Navigate=useNavigate();
    const { t } = useTranslation();
    return (
        <>
            <div className='Homepage-content'>
                <div className="text-container">
                    <div className='user-stats'>
                        {/* 20M+ Users */}
                        {t('homepage.userStats.userstats1')}
                        <br />
                        {t('homepage.userStats.userstats2')} <a href="/"> {t('homepage.userStats.userstats3')}</a>
                    </div>
                    <div className='homepage-maintitle'>Quiz</div>
                    <hr className="hr" />
                    <div className='homepage-sidetitle'>
                        <span className='top'>{t('homepage.sideTitle.titletop')}</span>
                        <br /><br />
                        <span className='bottom'>{t('homepage.sideTitle.titlebottom')}</span>
                    </div>
                    <hr className="hr" />
                    <div className='homepage-btn'>
                        {isAuthenticated===false?
                        <button onClick={()=>{Navigate("/login")}}>{t('homepage.buttonBegin.button1')} </button>
                        :
                        <button onClick={()=>{Navigate("/users")}}> {t('homepage.buttonBegin.button2')}</button>
                    }
                        
                    </div>
                </div>
                <div className='video-container'>
                    <video autoPlay muted loop  onContextMenu={(e) => e.preventDefault()}>

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