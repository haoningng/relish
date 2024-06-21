import Joyride from 'react-joyride';
import { useMemo, useEffect } from 'react';
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import { locationPage } from './guided-tour-steps/locationPage';
import { quizPage } from './guided-tour-steps/quizPage';
import { homePage } from './guided-tour-steps/homePage';
import { profilePage } from './guided-tour-steps/profilePage';

export default function GuidedTour() {
  const {
    setIsFirstTime,
  } = useOutletContext(); //from Layout.jsx

  const navigate = useNavigate();
  const location = useLocation();

  const destination = useMemo(() => {
    if (location.pathname === '/location') {
      return '/Quiz';
    } else if (location.pathname === '/Quiz') {
      return '/';
    } else if (location.pathname === '/') {
      return '/profile';
    } else if (location.pathname === '/profile') {
      return '/location';
    }
  }, [location.pathname])

  const steps = (
    location.pathname === '/location' ? locationPage : 
    location.pathname === '/Quiz' ? quizPage : 
    location.pathname === '/' ? homePage : 
    location.pathname === '/profile' ? profilePage : ''
  )

  useEffect(() => {
    if (location.pathname === '/location') {
      setIsFirstTime(prevState => ({
        ...prevState,
        location: true // make home and profile button disappear if they go back to location page
      })); 
    }
    if (location.pathname === '/Quiz') {
      setIsFirstTime(prevState => ({
        ...prevState,
        quiz: true // make home and profile button disappear if they go back to quiz page
      })); 
    }
    if (location.pathname === '/') {
      setIsFirstTime(prevState => ({
        ...prevState,
        quiz: false // makes the home and profile buttons appear when they reach homepage
      })); 
    }
  }, [location.pathname, setIsFirstTime])
  
  const handleJoyrideCallback = (data) => {
    if (data.status === 'finished' || data.status === 'skipped') {
      if (location.pathname === '/location') {
        setIsFirstTime(prevState => ({
          ...prevState,
          location: false
        })); 
      }
      if (location.pathname === '/') {
        setIsFirstTime(prevState => ({
          ...prevState,
          home: false
        })); 
      }
      if (location.pathname === '/profile') {
        setIsFirstTime(prevState => ({
          ...prevState,
          profile: false
        })); 
      }
      if (location.pathname ==='/' || location.pathname ==='/profile')
      setTimeout(() => {
        navigate(destination);
      }, 500); // Add a slight delay for smoother transition
    }
  };

  return (
    <Joyride 
      callback={handleJoyrideCallback}
      steps={steps}
      continuous
      run={true}
      showProgress={true}
      showSkipButton={true}
      disableCloseOnEsc={true}
      disableOverlayClose={true}
      disableScrolling={true}
      hideCloseButton={true}
      styles={{
        options: {
          arrowColor: '#ffffff',
          backgroundColor: '#ffffff',
          primaryColor: '#BF1E2C',
          textColor: '#163300',
          width: 900,
          zIndex: 100,
        },
        buttonNext: {
          backgroundColor: '#163300',
          fontWeight: '600',
          color: '#9FE870',
        },
        buttonBack: {
          color: '#163300',
          fontWeight: '600',
        }
      }}
    />
  )
}