import { useOutletContext, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import "../styles/index.css";
import InputSearch from "../components/InputSearch";
import CuisineOptions from "../components/CuisineOptions";

export default function Quiz() {
  const {
    lsLocationObj,
    setFilterObj,
    selectedCuisine,
    setSelectedCuisine,
    setOffset,
    setListing,
    setLoading
  } = useOutletContext(); //from Layout.jsx
  console.log(lsLocationObj, selectedCuisine)

  const navigate = useNavigate();

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
      <h3 className='quiz-subtitle-1'>-- Pick a cuisine --</h3>
      <div className="quiz-cuisine-container">
        <CuisineOptions 
          page={{
            name: 'quiz',
            className: 'radio-label',
            descClassName: ''
          }}
        />
      </div>
      <h3 className='quiz-subtitle-2'> -- Try your luck --</h3>
      <button className="i-am-feeling-hungry" onClick={handleRandom}>I&#39;m Feeling Hungry</button>
    </div>
  ) : (
    <div>
      404
    </div>
  );
}
