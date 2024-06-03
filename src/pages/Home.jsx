import { useState } from "react"
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

  return (
      <div className="input-outer-container">
        <h3 onClick={handleClick} className='home-location-link-container'>
          <span className='home-location-link'>{placeName} ▼</span>
        </h3>
        <InputSearch 
          page={{
            name: 'home',
            title: 'Recommendation',
            placeholder: 'Dish (e.g. beef pho...)'
          }}
        />
        <div className="home-cuisine-container">
          <CuisineOptions 
            page={{
              name: 'home',
              className: 'horizontal-radio-label',
              descClassName: 'horizontal-radio-label-desc'
            }}
          />
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
                  // end
                  style={toggleMapView ? {
                    backgroundColor: '#8DA656',
                    color: 'white',
                    border: '1px solid #6FBD6E'} : {}}
              >
                Map
              </button>
          </div>
          <Listing mapOn={toggleMapView}/>
        </div>
      </div>
  );
}
