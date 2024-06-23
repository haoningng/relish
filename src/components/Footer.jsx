import { NavLink, useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types'
import { useAppSelector } from "../redux/hooks"
import { Box } from "@chakra-ui/react";
import useWindowSize from 'react-use/lib/useWindowSize'

export default function Footer({ isFirstTime }) {
  Footer.propTypes = {
    isFirstTime: PropTypes.object.isRequired
  };

  const { width } = useWindowSize();
  const navigate = useNavigate();

  const activeStyles = {
      fontWeight: 800,
      color: '#9FE870',
      borderTop: width >= 865 ? '' :'3px solid #9FE870',
      borderRight: width >= 865 ? '5px solid #9FE870' : '',
  }

  const hiddenStyle = {
    visibility: 'hidden'
  }
  // check if user is authenticated
  const { isAuthenticated } = useAppSelector(state => state.auth)

  return (
    isAuthenticated ?
    <footer>
      <nav className="footer-container">
        <NavLink id="location-button" className='footer-link' to="/location" style={({ isActive }) => isActive ? activeStyles : null}>
          <div className='footer-btn'>
            <span className="material-symbols-outlined footer-icon">
            location_on
            </span>
            <p className='footer-icon-text'>Location</p>
          </div>
        </NavLink>
        <NavLink id="home-button" className='footer-link' to="/" style={({ isActive }) => isActive ? activeStyles : isFirstTime.quiz ? hiddenStyle : null}>
          <div className='footer-btn'>
            <span className="material-symbols-outlined footer-icon">
            home
            </span>
            <p className='footer-icon-text'>Home</p>
          </div>
        </NavLink>
        <NavLink id="profile-button" className='footer-link' to="/profile" style={({ isActive }) => isActive ? activeStyles : isFirstTime.quiz ? hiddenStyle : null}>
          <div className='footer-btn'>
            <span className="material-symbols-outlined footer-icon">
            account_circle
            </span>
            <p className='footer-icon-text'>Profile</p>
          </div>
        </NavLink>
      </nav>
    </footer> 
    : 
    <footer>
      <nav className="footer-container">
      <Box 
        as={'button'}
        onClick={() => { navigate('/auth/signup') }}
        position={"relative"}
        m={'1rem'}
        _hover={{ fontWeight:"700", color:"#9FE870" }}
        backgroundColor='transparent'
        border='none'
        color="#ffffff"
        fontWeight="600"
        fontSize="1.2em"
        cursor='pointer'
      >
        Signup
      </Box>
      <Box 
        as={'button'}
        onClick={() => { navigate('/auth/login') }}
        position={"relative"}
        m={'1rem'}
        _hover={{ fontWeight:"700", color:"#9FE870" }}
        backgroundColor='transparent'
        border='none'
        color="#ffffff"
        fontWeight="600"
        fontSize="1.2em"
        cursor='pointer'
        >
          Login
        </Box>
      </nav>
    </footer> )
}