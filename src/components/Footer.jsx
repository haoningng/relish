import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types'

export default function Footer({ isFirstTime }) {
  Footer.propTypes = {
    isFirstTime: PropTypes.object.isRequired
  };

  const activeStyles = {
      fontWeight: 800,
      color: '#9FE870',
      borderTop: '3px solid #9FE870',
  }

  const hiddenStyle = {
    visibility: 'hidden'
  }

  return (
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
  )
}