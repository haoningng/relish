import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <nav className="footer-container">
        <Link className='footer-link' to="/">
          <div className='footer-btn'>
            <span className="material-symbols-outlined">
            location_on
            </span>
            <p className='footer-icon-text'>Location</p>
          </div>
        </Link>
        <Link className='footer-link' to="/home">
          <div className='footer-btn'>
            <span className="material-symbols-outlined">
            home
            </span>
            <p className='footer-icon-text'>Home</p>
          </div>
        </Link>
        <Link className='footer-link' to="/profile">
          <div className='footer-btn'>
            <span className="material-symbols-outlined">
            account_circle
            </span>
            <p className='footer-icon-text'>Profile</p>
          </div>
        </Link>
      </nav>
    </footer>
  )
}