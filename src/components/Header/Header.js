import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom"
// import { postLogout } from '../../services/apiService';
const Header = () => {
    const isAuthenticated = useSelector(state => state?.isAuthenticated);
    
    
    // const account = useSelector(state => state?.userReducer?.account);
    const Navigate = useNavigate()
    const handleLogin = () => {
        Navigate("/login")
    }
    const handleRegister = () => {
        Navigate("/register")
    }
    // const handleLogout=async()=>{
    //     let res=await postLogout(account.refresh_token)
    // }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to="/" className='navbar-brand '>NBT</NavLink >
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link '>Home</NavLink >
                        <NavLink to="/users" className='nav-link '>Users</NavLink >
                        <NavLink to="/admin" className='nav-link '>Admin</NavLink >
                    </Nav>
                    <Nav>
                        {isAuthenticated===false?
                        <>
                        <button className='btn-login' onClick={() => { handleLogin() }}>Login</button>
                        <button className='btn-signup' onClick={() => { handleRegister() }}>Sign up</button>
                        </>:
                         <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.4">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2" >Logout</NavDropdown.Item>
                            
                            
                        </NavDropdown> 
                        } 
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;