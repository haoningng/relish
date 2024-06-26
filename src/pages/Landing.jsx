import { useState, useMemo, useRef, useEffect } from "react"
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Box } from "@chakra-ui/react";
import LandingHome from "./LandingHome";

export default function Landing() {
  const {
    lsLocationObj,
    setLsLocationObj,
  } = useOutletContext(); //from Layout.jsx
  const navigate = useNavigate();
  const [homeView, setHomeView] = useState(false);

  let autoCompleteRef = useRef();
  const inputRef = useRef();

  // default to 0.1 degree in coordinate i.e. approx +/-11km
  const defaultBounds = useMemo(() => {
    return {
      north: parseFloat(lsLocationObj[0]) + 0.1,
      south: parseFloat(lsLocationObj[0]) - 0.1,
      east: parseFloat(lsLocationObj[1]) + 0.1,
      west: parseFloat(lsLocationObj[1]) - 0.1,
    };
  }, [lsLocationObj]) 

  // restricted to Australia
  const options = useMemo(() => {
    return {
      bound: defaultBounds,
      componentRestrictions: { country: "au" },
      fields: ["geometry", "name"],
    };
  }, [defaultBounds]) 

  // Google Maps Javascript API [Library = Places]
  useEffect(() => {
    if (window.google) {
      autoCompleteRef.current = new window.google.maps.places
      .Autocomplete(
        inputRef.current,
        options
      );
      autoCompleteRef.current.addListener("place_changed", async function () {
        const place = await autoCompleteRef.current.getPlace();
        if (place) {
          setLsLocationObj(() => (
            [`${place.geometry?.location.lat()}`, `${place.geometry?.location.lng()}`, `${place.name}`]
          ))
        }
      });
    }
  }, []);

  return (
    !homeView ? 
    <div className="landing-container"> 
      {/* <Box 
        as={'button'}
        onClick={() => { navigate('/auth/signup') }}
        position={"absolute"}
        left={0}
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
        position={"absolute"}
        right={0}
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
        </Box> */}
      <img 
        className='landing-img'
        src={`/landing-background.jpg`}
        alt={`Background photo of Landing Page`} 
      />
      <h1 className='landing-title'>Relish</h1>
      <h2 className='landing-input'>Searching For Restaurants Near You</h2>
      <input
        ref={inputRef}
        className="input-field"
        type='search'
        placeholder='Suburb / Postcode'
      ></input>
      <button 
        className='landing-login-btn'
        onClick={() => setHomeView(true)}
      >Find Food</button>
      <span>Or 
      <Box 
        as={'button'}
        onClick={() => { navigate('/auth/login') }}
        position={"relative"}
        marginTop={'0.5rem'}
        _hover={{ fontWeight:"700", color:"#9FE870" }}
        backgroundColor='transparent'
        border='none'
        color="#ffffff"
        fontWeight="600"
        fontSize="1em"
        cursor='pointer'
      >
        Login
      </Box>
      </span>
      {/* <button 
        className='landing-login-btn'
        onClick={() => navigate('/auth/login')}
      >Log In</button>
      <button
        className='landing-firsttime-btn'
        onClick={() => navigate('/auth/signup')}
      >First Time Here?</button> */}
    </div>
    :
    <LandingHome/>
  );
}