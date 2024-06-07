import { useState, useEffect } from "react"
import { useOutletContext, useNavigate } from "react-router-dom";
import "../styles/index.css";
import Listing from "../components/Listing";
import InputSearch from "../components/InputSearch";
import CuisineOptions from "../components/CuisineOptions";
import FilterMenu from "../components/FilterMenu";

export default function Home() {
  const {
    placeName
  } = useOutletContext(); //from Layout.jsx

  const [toggleMapView, setToggleMapView] = useState(false)

  const navigate = useNavigate();

  function handleClick() {
    navigate('/');
  }

  function handleToggle() {
    setToggleMapView(prevToggleMapView => !prevToggleMapView);
  }

  useEffect(() => {
    const scrollableContainer = document.querySelector('.home-cuisine-container');
    const leftChevron = scrollableContainer.querySelector('.left-chevron');
    const rightChevron = scrollableContainer.querySelector('.right-chevron');
  
    const updateChevronVisibility = () => {
      const isScrolledLeft = scrollableContainer.scrollLeft > 0;
      const isScrolledRight = scrollableContainer.scrollWidth - scrollableContainer.scrollLeft - scrollableContainer.clientWidth <= 1; // Adjust this threshold as needed
      leftChevron.classList.toggle('hidden', !isScrolledLeft);
      rightChevron.classList.toggle('hidden', isScrolledRight);
    };
  
    updateChevronVisibility(); 
  
    const handleScroll = () => {
      updateChevronVisibility();
    };
  
    scrollableContainer.addEventListener('scroll', handleScroll);
    return () => scrollableContainer.removeEventListener('scroll', handleScroll);
  }, [])

  return (
      <div className="input-outer-container">
        <h3 onClick={handleClick} className='home-location-link-container'>
          <span className='home-location-link'>{placeName} ▼</span>
        </h3>
        <InputSearch 
          page={{
            name: 'home',
            title: '',
            placeholder: 'Search Relish'
          }}
        />
        <div className="home-cuisine-container">
          <div className="chevron left-chevron"></div>
          <CuisineOptions 
            page={{
              name: 'home',
              className: 'horizontal-radio-label',
              descClassName: 'horizontal-radio-label-desc'
            }}
          />
          <div className="chevron right-chevron"></div>
        </div>
        <br />
        <FilterMenu/>
        <div className='result-container'>
          <div className='result-header-container'>
              <h3 className="result-tag">Results</h3>
              <button
                  to="map"
                  className="map-button"
                  onClick={handleToggle}
                  style={toggleMapView ? {
                    backgroundColor: '#8DA656',
                    color: 'white',
                    border: '1px solid #6FBD6E'} : {}}
              >
                View in {toggleMapView ? 'List' : 'Map'}
              </button>
          </div>
          <Listing mapOn={toggleMapView}/>
        </div>
      </div>
  );
}
