import { useOutletContext, useNavigate } from "react-router-dom";
import "../styles/index.css";
import { PropTypes } from 'prop-types'

export default function MenuItem({ children, value, name }) {
  const {
    setPriceLevel,
    setRadius,
    setSort,
    setOffset
  } = useOutletContext(); //from Layout.jsx

  MenuItem.propTypes = {
    children: PropTypes.string.isRequired, // children is a required object
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    name: PropTypes.string
  };

  const navigate = useNavigate()

  function handleRadio(event) {
    const {value} = event.target
    if (name === 'Price') {
      if (value == 0) {
        setPriceLevel(null);
        setOffset(0);
      } else {
        setPriceLevel(value);
        setOffset(0);
      }
    } else if (name === 'Distance') {
      if (value == 0) {
        setRadius(4000);
        setOffset(0);
      } else {
        setRadius(value);
        setOffset(0);
      }
    } else if (name === 'Sort By') {
      if (value == 0) {
        setSort('best_match');
        setOffset(0);
      } else {
        setSort(value);
        setOffset(0);
      }
    }
    navigate('/Home')
  }

  return (
    <div>
      <input 
        type="radio"
        id={value}
        name={name}
        value={value}
        onChange={handleRadio}
      />
      <label className={value === 0 || value === 4000 ? 'menu-item reset-menu-item' : 'menu-item'} htmlFor={value}>
      {children}
      </label>
    </div>
  )
}