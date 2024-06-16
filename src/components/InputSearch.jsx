import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import "../styles/index.css";
import dishList from "../foods/dishList"
import { PropTypes } from 'prop-types'

export default function InputSearch({ page }) {
  const {
    selectedCuisine,
    setSelectedCuisine,
    setOffset,
    setListing,
    setLsLocationObj,
    setLoading
  } = useOutletContext(); //from Layout.jsx

  InputSearch.propTypes = {
    page: PropTypes.object.isRequired,
  };

  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const form = document.getElementById('form');

  // handle pressing enter instead of selecting from dropdown suggestions
  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    if (page.name !== 'location') {
      if (inputValue !== selectedCuisine) {
        setSelectedCuisine(inputValue.toLowerCase());
        setOffset(0);
        setInputValue('');
        setLoading(true);
        setListing([]);
        form.reset();
        navigate('/');
      }
    } else {
      setLsLocationObj(() => (
        [`-37.8136`, `144.9631`, 'Melbourne CBD']
      ));
      setListing([]);
      form.reset();
    }
  }

  // handle selecting from dropdown suggestions (for cuisine options)
  function handleClick(suggestion) {
    setInputValue('');
    form.reset();
    if (suggestion !== selectedCuisine) {
      setSelectedCuisine(suggestion);
      setOffset(0);
      setLoading(true);
      setListing([]);
      navigate('/');
    }
  }
 
  function handleChange(event){
    const {value} = event.target;
    setInputValue(value);
    // Prioritize top 5 suggestions that start with the input
    const newFilteredSuggestions = dishList.filter(suggestion =>
      suggestion.toLowerCase().startsWith(value.toLowerCase())
    ).slice(0, 5);
    setFilteredSuggestions(newFilteredSuggestions);
  }

  return (
    <form id="form" onSubmit={(event) => handleSubmit(event)} className={page.name === 'home' ? 'input-container-home' : `input-container`}>
      <h1 className='input-title'>{page.title}</h1>
      <div>
        <input
          ref={page.ref}
          onChange={handleChange}
          className="input-field"
          type='search'
          placeholder={page.placeholder}
        ></input>

        {/* this part below only works in non-location page */}
        {page.name!=='location' && inputValue && (
          <ul className={page.name === 'home' ? 'pac-container-home' : `pac-container`}>
            <li 
              onClick={() => handleClick(inputValue)}
              className="pac-item"
              key={inputValue}
            >{inputValue}</li>

            {/* if the query matches the dishList, show top 5 matches */}
            {filteredSuggestions.map((suggestion) => (
              <li
                onClick={() => handleClick(suggestion)}
                className="pac-item"
                key={suggestion}
              >{suggestion}</li>
            ))}
          </ul>
        )}
      </div>
    </form>
  )
}