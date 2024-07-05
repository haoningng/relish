import { useNavigate, Navigate } from "react-router-dom";
import notFoundImage from '/assets/notfound.svg';
import Countdown from "react-countdown";
import "../styles/index.css";
import { useAppSelector } from "../redux/hooks";

export default function TooManyRequests() {
  const navigate = useNavigate();
  const { isThrottled, time } = useAppSelector(state => state.auth)

  function handleBack(event) {
    event.preventDefault();
    navigate('/');
  }

  const renderer = ({ seconds, completed }) => {
    if (completed) {
      return <span>Thanks for waiting!</span>;
    } else {
      return <span>Please wait for {seconds} seconds</span>;
    }
  };

  return ( isThrottled ?
    <div className="toomanyrequests-container">
      <h1>429 Too Many Requests</h1>
      <div className="toomanyrequests-message">
        <img src={notFoundImage} alt="toomanyrequests" className="notfound-emoji" />
        <h2 className='toomanyrequests-label'>
          Take a breath...<br/>
          <Countdown date={Date.now() + (time * 1000)} renderer={renderer} />
        </h2>
      </div>
      <button className="back-button" onClick={handleBack}>
        Back To Finding Food
      </button>
    </div>
    :
    // if not throttled / no 429 code then return to Homepage
    <Navigate to='/' replace/>
  );
}
