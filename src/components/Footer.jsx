import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types'
import profileImage from '../assets/profile.png';
import awardImage from '../assets/award.svg';
import searchImage from '../assets/search.svg';

export default function Footer({ context }) {
  Footer.propTypes = {
    context: PropTypes.object.isRequired
  };

  function resetAllFilters() {
    context.setPriceLevel(null);
    context.setRadius(4000);
    context.setSelectedCuisine('');
    context.setPlaceName('');
    context.setLocation('');
    context.setSort('best_match');
  }
  
  return (
    <footer>
      <nav className="footer-container">
        <NavLink onClick={() => resetAllFilters()} to="/">
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