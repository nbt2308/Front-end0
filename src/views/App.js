import '../styles/App.scss';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/footer';
import { Outlet } from 'react-router-dom';
function App(props) {
    const { themeState } = props

    return (

        <div className="app-container ">

            <div className="header-container">
                <Header themeState={themeState} />
            </div>

            <div className={themeState.value ? "main-container theme-main-container-light" : "main-container theme-main-container-dark"}>

                <div className="app-content ">
                    <Outlet context={{ themeState: themeState.value }} />
                </div>

            </div>
            <div className="footer-container">
                <Footer themeState={themeState}/>
            </div>
        </div >
    );
}
export const API_URL = "http://localhost:8000";
export default App;
