import { useOutletContext, useNavigate } from "react-router-dom";
import { useEffect, useRef, useCallback, useState } from 'react';
import "../styles/index.css";
import InputSearch from "../components/InputSearch";
import CuisineOptions from "../components/CuisineOptions";
import GuidedTour from "../components/GuidedTour";

export default function Quiz() {
  const {
    lsLocationObj,
    setFilterObj,
    selectedCuisine,
    setSelectedCuisine,
    setOffset,
    setListing,
    setLoading,
    isFirstTime,
  } = useOutletContext(); //from Layout.jsx

  const navigate = useNavigate();
  const cuisineRef = useRef(null);  // Ref specifically for the Cuisine div
  const luckyRef = useRef(null);  // Ref specifically for the I'm Feeling Hungry button
  const [cuisinePosition, setCuisinePosition] = useState({ top: 0, left: 0 });
  const [luckyPosition, setLuckyPosition] = useState({ top: 0, left: 0 });


  const calculateSubtitlePosition = useCallback(() => {
    const windowWidth = window.innerWidth;
    if (cuisineRef.current) { // Always calculate based on the Cuisine div
      const cuisineSubtitle = document.querySelector('.quiz-subtitle-1'); // Find subtitle within the cuisineRef div
      const subtitleWidth = cuisineSubtitle.offsetWidth;
      const buttonRect = cuisineRef.current.getBoundingClientRect();
      setCuisinePosition({
        top: buttonRect.top + window.scrollY, 
        left: (windowWidth / 2) - (subtitleWidth / 2), // Center using subtitle width
      });
    }
    if (luckyRef.current) { // Always calculate based on the I'm Feeling Hungry button
      const luckySubtitle = document.querySelector('.quiz-subtitle-2'); // Find subtitle within the cuisineRef div
      const subtitleWidth = luckySubtitle.offsetWidth;
      const buttonRect = luckyRef.current.getBoundingClientRect();
      setLuckyPosition({
        top: buttonRect.top + window.scrollY, 
        left: (windowWidth / 2) - (subtitleWidth / 2), // Center using subtitle width
      });
    }
  }, []);

  useEffect(() => {
    setSelectedCuisine('');
    setFilterObj((filterObj) => ({
      ...filterObj,
      priceLevel: 0,
      radius: 0,
      sort: 0
    })),
    setOffset(0);
    setListing([]);
    setLoading(true);
  }, [])

  function handleRandom(event) {
    event.preventDefault();
    // random query string to be used in InputSearch Component
    const list = ['Best', 'Random', 'Top Review', 'Cheap', 'Friendly', 'Lovely', 'Nearby']
    const randomIndex = Math.floor(Math.random() * list.length); // Get a random index
    const randomElement = list[randomIndex];
    setSelectedCuisine(randomElement);
    navigate('/');
  }

  useEffect(() => {
    let timeoutId; 
    calculateSubtitlePosition(); // Initial calculation
    window.addEventListener("resize", calculateSubtitlePosition);
    return () => {
      window.removeEventListener("resize", calculateSubtitlePosition);
      clearTimeout(timeoutId);}
  }, [calculateSubtitlePosition]);

  return lsLocationObj ? (
    <div className="input-outer-container">
      <InputSearch 
        page={{
          name: 'quiz',
          title: 'What to eat?',
          placeholder: 'Search Dish (e.g. beef pho...)'
        }}
      />
      <br />
      <h3 style={{ top: cuisinePosition.top, left: cuisinePosition.left }} className='quiz-subtitle-1'>-- Pick a cuisine --</h3>
      <div ref={cuisineRef} className="quiz-cuisine-container">
        <CuisineOptions 
          page={{
            name: 'quiz',
            className: 'radio-label',
            descClassName: ''
          }}
        />
      </div>
      <h3 style={{ top: luckyPosition.top, left: luckyPosition.left }} className='quiz-subtitle-2'> -- Try your luck --</h3>
      <button ref={luckyRef} className="i-am-feeling-hungry" onClick={handleRandom}>I&#39;m Feeling Hungry</button>
      <div className={`geolocation-permission-denied hide`}></div>
      {isFirstTime.profile && 
      <GuidedTour />}
    </div>
  ) : (
    <div>
      404
    </div>
  );
}
