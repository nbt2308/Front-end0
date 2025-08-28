import PerfectScrollbar from 'react-perfect-scrollbar'
import '../styles/App.scss';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
function App() {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header/>
      </div>
      <div className="main-container">
        <div className="sidebar-container">

        </div>
        <div className="app-content">
          < PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>

        </div>
      </div>
    </div>
  );
}

export default App;
