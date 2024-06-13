import StepProgressBar from "../components/ProgressBar";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useState } from 'react'
import "../styles/index.css";
import { useAppSelector } from '../redux/hooks';
import StaticMap from "../components/StaticMap";
import BeenToButton from "../components/BeenToButton";
import HorizontalChevron from "../components/HorizontalChevron";
import MapView from "../components/MapView";

export default function Profile() {
  const {
    setSelectedRestaurant,
  } = useOutletContext(); //from Layout.jsx

  const [toggleMapView, setToggleMapView] = useState(false)

  const { restaurantList } = useAppSelector((state) => state.restaurant);
  
  const navigate = useNavigate();

  function handleClick(event, restaurant) {
    if (event.target.closest('.profile-visited-img')) {
      setSelectedRestaurant(restaurant);
      navigate(`/listing/${restaurant.id}`)
    }
  }
  const newList = restaurantList.map(each => each)

  const visitedCards = newList?.reverse().map((restaurantObj) => {

    // Remove invalid characters from JSON string before parsing
    const convert = restaurantObj.obj
                    .replace(/'/g, '"')
                    .replace(/False/g, 'false')
                    .replace(/True/g, 'true')
                    .replace(/None/g, 'null');

    const each = JSON.parse(convert)

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
          <BeenToButton 
            page={{
              name: 'profile',
              restaurant: each,
              visited: true
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
            <p className='progress-sum'>{restaurantList ? restaurantList?.length : 0}</p>
            <p className='progress-checkin-text'>Check-ins</p>
          </div>
          <StepProgressBar progress={restaurantList?.length}/>
        </div>
      </div>
      {toggleMapView ? 
      <div className='profile-visited-map'>
        <div className='profile-subtitle-map'>
            <h3>Previously Visited</h3>
            <button className='profile-button' onClick={() => setToggleMapView(false)}>Back</button>
          </div>
        <MapView listing={ 
          restaurantList?.map((restaurantObj) => {

            // Remove invalid characters from JSON string before parsing
            const convert = restaurantObj.obj
                            .replace(/'/g, '"')
                            .replace(/False/g, 'false')
                            .replace(/True/g, 'true')
                            .replace(/None/g, 'null');
        
            const each = JSON.parse(convert)
            return each;
          })
         }/> 
      </div>
      : 
      <>
        <div className='profile-award-container'>
          <div className='profile-subtitle'>
            <h3>Awards</h3>
            <button className='profile-button'>See more</button>
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
          <div className='profile-subtitle'>
            <h3>Previously Visited</h3>
            <button className='profile-button' onClick={() => setToggleMapView(true)} >Show Map <span className="material-symbols-outlined">map</span></button>
          </div>

          <HorizontalChevron
            page={{ name: 'profile', classname: 'profile-visited-scrollable'}}
          >
            {visitedCards}
          </HorizontalChevron>
        </div>
      </>
      }
    </div>
  )
}