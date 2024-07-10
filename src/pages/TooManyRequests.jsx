import { useNavigate, Navigate } from "react-router-dom";
import notFoundImage from '/assets/notfound.svg';
import Countdown from "react-countdown";
import "../styles/index.css";
import { useAppSelector } from "../redux/hooks";
import { setIsThrottledFalse } from "../redux/features/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { toast } from 'react-toastify';


export default function TooManyRequests() {
  const navigate = useNavigate();
  const { isThrottled, time } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()


  const renderer = ({ minutes, seconds, completed }) => {
    const min = minutes ? <> {minutes} minute{minutes === 1 ? '' : 's'} <br /></> : ''
    if (completed) {
      dispatch(setIsThrottledFalse(false))
      navigate('/');
      toast.info('Thanks for waiting!')
      return <span>Thanks for waiting!</span>;
    } else {
      return <span>Please wait for <br />{min}{seconds} second{seconds === 1 ? '' : 's'}</span>;
    }
  };

  return (isThrottled ?
    <div className="toomanyrequests-container" >
      <h1 style={{ fontSize: '1.8rem' }}>429 Too Many Requests</h1>
      <div className="toomanyrequests-message" style={{ width: '100%', maxWidth: '500px', height: '200px' }}>
        <img src={notFoundImage} alt="toomanyrequests" className="notfound-emoji" />
        <div style={{ width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p className='toomanyrequests-label' style={{ fontSize: '1.3rem' }}>
            Take a breath...<br />
            <Countdown date={Date.now() + (time * 1000)} renderer={renderer} />
          </p>
        </div>
      </div>
    </div>
    :
    // if not throttled / no 429 code then return to Homepage
    <Navigate to='/' replace />
  );
}
