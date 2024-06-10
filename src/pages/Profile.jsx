import StepProgressBar from "../components/ProgressBar";
import { useOutletContext, useNavigate } from "react-router-dom";
import "../styles/index.css";
import StaticMap from "../components/StaticMap";
import UnvisitButton from "../components/UnvisitButton";

export default function Profile() {
  const {
    setSelectedRestaurant
  } = useOutletContext(); //from Layout.jsx

  const beenToRestaurants = JSON.parse(localStorage.getItem('been-to'));
  
  const navigate = useNavigate();

  function handleClick(event, restaurant) {
    if (event.target.closest('.profile-visited-img')) {
      setSelectedRestaurant(restaurant);
      navigate(`/listing/${restaurant.id}`)
    }
  }

  const visitedCards = beenToRestaurants?.map((each) => {
    const coordinate = {
      lat: each.coordinates.latitude,
      lng: each.coordinates.longitude
    }
    return (
      <div className='profile-visited-card' key={each.id} onClick={(event) => handleClick(event, each)}>
        <div className='listing-photo-container'>
          {each.image_url ? <img
            width='140px'
            height='80px'
            alt={`The restaurant photo of ${each.name}`}
            src={each.image_url}
            className='profile-visited-img'
          /> : 
          <StaticMap
          coordinate={coordinate}
          page={{
            name: 'profile'
          }}/>
          }
          <UnvisitButton 
            page={{
              name: 'profile',
              restaurant: each,
            }}
          />
        </div>
        <p className='profile-visited-text'>{each.name}</p>
      </div>
    )
  })

  return (
    <div className='profile-page-container'>
      <div className='profile-top-half'>
        <h1>Profile</h1>
      </div>
      <div className='profile-bottom-half'>
        <img width='120px' className='profile-avatar' src='avatar.svg' />
        <h2>John Smith</h2>
        <div className='progress-bar'>
          <div className='progress-left-text'>
            <p className='progress-sum'>{beenToRestaurants.length}</p>
            <p className='progress-checkin-text'>Check-ins</p>
          </div>
          <StepProgressBar progress={beenToRestaurants.length}/>
        </div>
      </div>
      <div className='profile-award-container'>
        <div className='profile-award-title'>
          <h3>Awards</h3>
          <p>See more</p>
        </div>
        <div className='profile-award-card'>
          <img width='53px' src='hexagonal.svg'/>
          <div className='profile-award-texts'>
            <div className='profile-award-text-1'>
              <h4>Mexicana Fiesta</h4>
              <p>8m ago</p>
            </div>
            <p className='profile-award-text-2'>Visited 5 mexican restaurant</p>
          </div>
        </div>
        <div className='profile-award-card'>
          <img width='53px' src='hexagonal.svg'/>
          <div className='profile-award-texts'>
            <div className='profile-award-text-1'>
              <h4>Mexicana Fiesta</h4>
              <p>8m ago</p>
            </div>
            <p className='profile-award-text-2'>Visited 5 mexican restaurant</p>
          </div>
        </div>
      </div>
      <div className='profile-visited-container'>
        <h3>Previously Visited</h3>
        <div className='profile-visited-scrollable'>
          {visitedCards}
        </div>
      </div>
    </div>
  )
}