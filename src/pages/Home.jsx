import { useState } from "react"
import { useOutletContext, useNavigate } from "react-router-dom";
import "../styles/index.css";
import Listing from "../components/Listing";
import InputSearch from "../components/InputSearch";
import CuisineOptions from "../components/CuisineOptions";
import FilterMenu from "../components/FilterMenu";
import HorizontalChevron from "../components/HorizontalChevron";

export default function Home() {
  const {
    lsLocationObj,
    selectedCuisine
  } = useOutletContext(); //from Layout.jsx
  console.log(lsLocationObj, selectedCuisine)
  const [toggleMapView, setToggleMapView] = useState(false)

  const navigate = useNavigate();

  function handleClick() {
    navigate('/location');
  }

  function handleToggle() {
    setToggleMapView(prevToggleMapView => !prevToggleMapView);
  }

  return (
      <div className="input-outer-container">
        <h3 onClick={handleClick} className='home-location-link-container'>
          <span className='home-location-link'>{lsLocationObj[2]} ▼</span>
        </h3>
        <InputSearch 
          page={{
            name: 'home',
            title: '',
            placeholder: 'Search Relish'
          }}
        />
        <HorizontalChevron
          page={{classname: 'home-cuisine-container'}}
        >
          <CuisineOptions 
            page={{
              name: 'home',
              className: 'horizontal-radio-label',
              descClassName: 'horizontal-radio-label-desc'
            }}
          />
        </HorizontalChevron>
        <FilterMenu/>
        <div className='result-container'>
          <div className='result-header-container'>
              <h3 className="result-tag">Results</h3>
              <button
                  to="map"
                  className="map-button"
                  onClick={handleToggle}
                  style={toggleMapView ? {
                    backgroundColor: '#163300',
                    color: '#9FE870',
                    border: '1px solid #9FE870'} : {}}
              >
                View in {toggleMapView ? 'List' : 'Map'}
              </button>
          </div>
          <Listing mapOn={toggleMapView}/>
        </div>
      </div>
  );
}
