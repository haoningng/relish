import { useOutletContext, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import "../styles/index.css";
import InputSearch from "../components/InputSearch";
import CuisineOptions from "../components/CuisineOptions";

export default function Quiz() {
  const {
    coordinate,
    selectedCuisine,
    setSelectedCuisine,
    setRadius,
    setPriceLevel,
    setSort,
    setOffset,
    setListing
  } = useOutletContext(); //from Layout.jsx
  console.log(coordinate, selectedCuisine)

  const navigate = useNavigate();

  useEffect(() => {
    setSelectedCuisine('');
    setRadius(4000);
    setPriceLevel(null);
    setSort('best_match');
    setOffset(0);
    setListing([]);
  }, [])

  function handleRandom(event) {
    event.preventDefault();
    // random query string to be used in InputSearch Component
    const list = ['Best', 'Random', 'Top Review', 'Cheap', 'Friendly', 'Lovely', 'Nearby']
    const randomIndex = Math.floor(Math.random() * list.length); // Get a random index
    const randomElement = list[randomIndex];
    setSelectedCuisine(randomElement);
    navigate('/Home');
  }

  return coordinate ? (
    <div className="input-outer-container">
      <InputSearch 
        page={{
          name: 'quiz',
          title: 'What to eat?',
          placeholder: 'Dish (e.g. beef pho...)'
        }}
      />
      <br />
      <div className="quiz-cuisine-container">
        <CuisineOptions 
          page={{
            name: 'quiz',
            className: 'radio-label',
            descClassName: ''
          }}
        />
      </div>
      <button className="i-am-feeling-hungry" onClick={handleRandom}>I&#39;m Feeling Hungry</button>
    </div>
  ) : (
    <div>
      404
    </div>
  );
}
