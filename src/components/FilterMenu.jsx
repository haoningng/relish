import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import ReactDOM from 'react-dom';
import { useOutletContext } from "react-router-dom";
import "../styles/index.css";
import MenuItem from "../components/MenuItem";

export default function FilterMenu() {
  const {
    filterObj
  } = useOutletContext(); //from Layout.jsx

  const defaultState = useMemo(() => {
    return {
      name: 'default',
      labels: [],
      values: []
    }
  },[])

  const priceButtonRef = useRef(null);  // Ref specifically for the Price button
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const calculateDropdownPosition = useCallback(() => {
    if (priceButtonRef.current) { // Always calculate based on the Price button
      const buttonRect = priceButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: buttonRect.bottom + window.scrollY, 
        left: buttonRect.left + window.scrollX,  
      });
    }
  }, []);

  const [activeButton, setActiveButton] = useState(defaultState);
  const dropdownRef = useRef(null);

  // Track if ANY filter is applied (not just the dropdown state)
  const isFilterApplied = useMemo(() => {
    return filterObj.priceLevel !== 0 || filterObj.radius !== 0 || filterObj.sort !== 'best_match';
  }, [filterObj]); // Update whenever filterObj changes
  
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
    calculateDropdownPosition(); // Initial calculation
    document.addEventListener('click', handleClickOutside);
    window.addEventListener("resize", calculateDropdownPosition);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener("resize", calculateDropdownPosition);
      clearTimeout(timeoutId);}
  }, [calculateDropdownPosition, defaultState]);

  // Dynamic label for the filter button
  const dspPriceLevel = filterObj.priceLevel !== 0 ?
  ` ${'$'.repeat(filterObj.priceLevel)}` : 'Price';
  const dspRadius = filterObj.radius !== 0 ? `<${filterObj.radius/1000}km` : 'Distance';
  const dspSort = filterObj.sort === 'review_count' ? 'Review' : filterObj.sort === 'rating' ?  'Ratings' : filterObj.sort === 'distance' ? `Distance` : filterObj.sort === 'best_match' ? `Best Match` : 'Sort By';
  
  return (
    <div className="home-filter-container" ref={dropdownRef}>
      {buttonArray.map((buttonObj) => (
        <div key={buttonObj.name}>
          <div >
            <button
              className="menu-button"
              ref={buttonObj.name === 'Price' ? priceButtonRef : null} // Only attach ref to Price button
              onClick={() => {
                handleButtonClick(buttonObj);
              }}
              style={
                // Apply active style if the dropdown is open OR a filter is applied for this button
                buttonObj.name === activeButton.name ||
                (isFilterApplied && (
                  buttonObj.name === 'Price' && filterObj.priceLevel !== 0 ||
                  buttonObj.name === 'Distance' && filterObj.radius !== 0 ||
                  buttonObj.name === 'Sort By' && (filterObj.sort === 'best_match' || filterObj.sort === 'rating' || filterObj.sort === 'review_count' || filterObj.sort === 'distance')
                ))
                ? {
                    backgroundColor: '#163300',
                    color: '#9FE870'}
                : {}}
            >
              {buttonObj.name === 'Price' ?  dspPriceLevel : 
              buttonObj.name === 'Distance' ? dspRadius :
              buttonObj.name === 'Sort By' ? dspSort : ''}
            </button>
            {activeButton.name !== defaultState.name && ReactDOM.createPortal(
              <div className="menu-dropdown" style={{ top: dropdownPosition.top, left: dropdownPosition.left }}>
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