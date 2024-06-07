import { NavLink } from 'react-router-dom';
import profileImage from '../assets/profile.png';
import awardImage from '../assets/award.svg';
import searchImage from '../assets/search.svg';

export default function Footer() {
  return (
    <footer>
      <nav className="footer-container">
        <NavLink to="/">
          <img
              src={searchImage}
              alt='Navigation icon to search page'
              className="footer-icon"
            />
        </NavLink>
        <NavLink to="/award">
          <img
            src={awardImage}
            alt='Navigation icon to award page'
            className="footer-icon"
          />
        </NavLink>
        <NavLink to="/profile">
          <img
              src={profileImage}
              alt='Navigation icon to profile page'
              className="footer-icon"
            />
        </NavLink>
      </nav>
    </footer>
  )
}