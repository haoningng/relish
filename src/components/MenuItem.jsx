import { useOutletContext, useNavigate } from "react-router-dom";
import "../styles/index.css";
import { PropTypes } from 'prop-types'

export default function MenuItem({ children, value, name }) {
  const {
    filterObj,
    setFilterObj,
    setOffset,
    setListing,
    setLoading
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
    event.preventDefault(); 
    const {value} = event.target;
    if (value != 0 && value != filterObj.priceLevel && value != filterObj.radius && value != filterObj.sort) {
      if (name === 'Price') {
        setFilterObj((filterObj) => ({
          ...filterObj,
          priceLevel: value
        }));
      } else if (name === 'Distance') {
        setFilterObj((filterObj) => ({
          ...filterObj,
          radius: value
        }));
      } else if (name === 'Sort By') {
        setFilterObj((filterObj) => ({
          ...filterObj,
          sort: value
        }));
      }
      setOffset(0);
      setLoading(true);
      setListing([]);
      navigate('/')
    } else if (value == 0) {
      if (name === 'Price' && filterObj.priceLevel != 0) {
        setFilterObj((filterObj) => ({
          ...filterObj,
          priceLevel: 0
        }));
        setOffset(0);
        setLoading(true);
        setListing([]);
        navigate('/')
      } else if (name === 'Distance' && filterObj.radius != 0) {
        setFilterObj((filterObj) => ({
          ...filterObj,
          radius: 0
        }));
        setOffset(0);
        setLoading(true);
        setListing([]);
        navigate('/')
      } else if (name === 'Sort By' && filterObj.sort != 0) {
        setFilterObj((filterObj) => ({
          ...filterObj,
          sort: 0
        }));
        setOffset(0);
        setLoading(true);
        setListing([]);
        navigate('/')
      }
    }
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
      <label className={value === 0 ? 'menu-item reset-menu-item' : 'menu-item'} htmlFor={value}>
      {children}
      </label>
    </div>
  )
}