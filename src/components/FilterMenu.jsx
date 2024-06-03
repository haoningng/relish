import { useState, useRef, useEffect, useMemo } from "react";
import ReactDOM from 'react-dom';
import { useOutletContext } from "react-router-dom";
import "../styles/index.css";
import MenuItem from "../components/MenuItem";

export default function FilterMenu() {
  const {
    priceLevel,
    radius,
    sort
  } = useOutletContext(); //from Layout.jsx

  const defaultState = useMemo(() => {
    return {
      name: 'default',
      labels: [],
      values: []
    }
  },[])

  const [activeButton, setActiveButton] = useState(defaultState);
  const dropdownRef = useRef(null);
  
  const buttonArray = [{
    name: 'Price',
    labels: [
      {
        label: '$',
        value: 1
      }, {
        label: '$$',
        value: 2
      }, {
        label: '$$$',
        value: 3
      }, {
        label: '$$$$',
        value: 4
      }]
  },{
    name: 'Distance',
    labels: [
      {
        label: '1km',
        value: 1000
      }, {
        label: '5km',
        value: 5000
      }, {
        label: '10km',
        value: 10000
      }, {
        label: '30km',
        value: 30000
      }]
  },{
    name: 'Sort By',
    labels: [
      {
        label: 'Best Match',
        value: 'best_match'
      }, {
        label: 'Rating',
        value: 'rating'
      }, {
        label: 'Review Count',
        value: 'review_count'
      }, {
        label: 'Distance',
        value: 'distance'
      }]
  }]

  const handleButtonClick = (buttonObj) => {
    setActiveButton(activeButton.name === buttonObj.name ? defaultState : buttonObj);
  };

  useEffect(() => {
    let timeoutId; 
    const handleClickOutside = (event) => {
      // Check if dropdown container exists & Click outside the container
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        timeoutId = setTimeout(() => setActiveButton(defaultState), 10);
        // Click outside the dropdown content
      } else if (event.target.closest('.menu-item')) {
        setActiveButton(null); // Close dropdown if click is inside the dropdown content
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(timeoutId);}
  }, [defaultState]);

  // Dynamic label for the filter button
  const dspPriceLevel = priceLevel !== null ?
  ` ${'$'.repeat(priceLevel)}` : 'Price';
  const dspRadius = radius !== 4000 ? `<${radius/1000}km` : 'Distance';
  const dspSort = sort === 'review_count' ? 'Review' : sort === 'rating' ?  'Ratings' : sort === 'distance' ? `Distance` : 'Sort By';
  
  return (
    <div className="home-filter-container" ref={dropdownRef}>
      {buttonArray.map((buttonObj) => (
        <div key={buttonObj.name}>
          <div >
            <button
              className="menu-button"
              onClick={() => handleButtonClick(buttonObj)}
              style={buttonObj.name === activeButton.name
                ? {
                    backgroundColor: '#8DA656',
                    color: 'white',
                    border: '1px solid #6FBD6E'}
                : {}}
            >
              {buttonObj.name === 'Price' ?  dspPriceLevel : 
              buttonObj.name === 'Distance' ? dspRadius :
              buttonObj.name === 'Sort By' ? dspSort : ''}
            </button>
            {activeButton.name !== defaultState.name && ReactDOM.createPortal(
              <div className="menu-dropdown">
                <MenuItem name={activeButton.name} value={activeButton.labels[0].value}>{activeButton.labels[0].label}</MenuItem>
                <MenuItem name={activeButton.name} value={activeButton.labels[1].value}>{activeButton.labels[1].label}</MenuItem>
                <MenuItem name={activeButton.name} value={activeButton.labels[2].value}>{activeButton.labels[2].label}</MenuItem>
                <MenuItem name={activeButton.name} value={activeButton.labels[3].value}>{activeButton.labels[3].label}</MenuItem>
                <MenuItem name={activeButton.name} value={0}>Reset</MenuItem>
              </div>,
              document.body
            )}
          </div>
        </div>
      ))}
    </div>
  )
}