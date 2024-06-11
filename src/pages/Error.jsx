import { useNavigate } from "react-router-dom";
import notFoundImage from '../assets/notfound.svg';
import "../styles/index.css";

function NotFound() {
  const navigate = useNavigate();

  function handleBack(event) {
    event.preventDefault();
    navigate('/');
  }

  return (
    <div className="notfound-container">
      <h1>404</h1>
      <div className="notfound-message">
        <img src={notFoundImage} alt="Chef Not Found" className="notfound-emoji" />
        <h2>Whoops...<br/>Chef Not Found!</h2>
      </div>
      <button className="back-button" onClick={handleBack}>
        Back to find food
      </button>
    </div>
  );
}

export default NotFound;
