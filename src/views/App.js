import '../styles/App.scss';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/footer';
import { Outlet } from 'react-router-dom';
function App(props) {
    const { darkMode } = props

    return (

        <div className="app-container ">

            <div className="header-container">
                <Header darkMode={darkMode} />
            </div>

            <div className={darkMode.value ? "main-container main-container-light" : "main-container main-container-dark"}>

                <div className="app-content ">
                    <Outlet context={{ darkMode: darkMode.value }} />
                </div>

            </div>
            <div className="footer-container">
                <Footer darkMode={darkMode}/>
            </div>
        </div >
    );
}
export const API_URL = "http://localhost:8000";
export default App;
