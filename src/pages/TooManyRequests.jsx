import { useNavigate } from "react-router-dom";
import {createRoot} from 'react-dom/client';
import notFoundImage from '../assets/notfound.svg';
import Countdown from "react-countdown";
import "../styles/index.css";

function TooManyRequests() {
  const navigate = useNavigate();

  function handleBack(event) {
    event.preventDefault();
    navigate('/');
  }

  const renderer = ({ seconds, completed }) => {
    if (completed) {
      return <span>Time is up!</span>;
    } else {
      return <span>{seconds}</span>;
    }
  };

  createRoot(
    <Countdown date={Date.now() + 10000} renderer={renderer} />,
    document.getElementById("root")
  );

  return (
    <div className="toomanyrequests-container">
      <h1>429 Too Many Requests</h1>
      <div className="toomanyrequests-message">
        <img src={notFoundImage} alt="toomanyrequests" className="notfound-emoji" />
        <h2 className='toomanyrequests-label'>Slow Down...<br/>Too Many Requests!</h2>
      </div>
      <button className="back-button" onClick={handleBack}>
        Back To Finding Food
      </button>
    </div>
  );
}

export default TooManyRequests;

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<TooManyRequests />);
}