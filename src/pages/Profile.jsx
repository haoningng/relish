import StepProgressBar from "../components/ProgressBar";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import "../styles/index.css";
import { useAppSelector } from '../redux/hooks';
import StaticMap from "../components/StaticMap";
import BeenToButton from "../components/BeenToButton";
import HorizontalChevron from "../components/HorizontalChevron";
import MapView from "../components/MapView";
import CuisineTag from "../components/CuisineTag";
import Confetti from 'react-confetti'
import { toast } from 'react-toastify';
import Awards from "./Awards";
import { Logout } from "../components/auth";
import { useRetrieveUserQuery } from "../redux/features/authApiSlice";
import GuidedTour from "../components/GuidedTour";
import useWindowSize from 'react-use/lib/useWindowSize'
import { Avatar } from "../components/profiles/avatars";

export default function Profile() {
  const {
    setSelectedRestaurant,
    isFirstTime,
  } = useOutletContext(); //from Layout.jsx

  const [toggleMapView, setToggleMapView] = useState(false)
  const [celebrating, setCelebrating] = useState(false);
  const [showAwards, setShowAwards] = useState(false);

  // from Redux Store
  const { restaurantList } = useAppSelector((state) => state.restaurant);
  const { data: user } = useRetrieveUserQuery();

  const navigate = useNavigate();

  function handleClick(event, restaurant) {
    if (event.target.closest('.profile-visited-img')) {
      setSelectedRestaurant(restaurant);
      navigate(`/listing/${restaurant.id}`)
    }
  }

  const { width, height } = useWindowSize();
  useEffect(() => {
    const milestones = [25, 50, 75, 100];
    if (milestones.includes(restaurantList?.length)) {
      toast.success(`Congratulations for having visited ${restaurantList?.length} restaurants!`)
      setCelebrating(true);

      // Wait for the confetti animation to complete (e.g., 5 seconds)
      setTimeout(() => setCelebrating(false), 5000);
    }
  }, [restaurantList?.length]);

  const newList = restaurantList.map(each => each)

  const visitedCards = newList?.reverse().map((restaurantObj) => {

    // Remove invalid characters from JSON string before parsing
    const convert = restaurantObj.obj
      .replace(/False/g, 'false')
      .replace(/True/g, 'true')
      .replace(/None/g, 'null')
      .replace(/'(\w+)'\s*:/g, '"$1":')  // Replace single quotes around keys
      .replace(/:\s*'([^']*)'/g, ': "$1"') // Replace single quotes around string values
      .replace(/\['(.*?)'\]/g, '["$1"]'); // Replace single quotes in arrays

    const each = JSON.parse(convert);

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
              }} />
          }
          <CuisineTag restaurant={each} page={{ name: 'profile' }} />
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

  return (showAwards ?
    <>
      <button className='profile-button  awards-close' onClick={() => setShowAwards(prev => !prev)}>
        <span className="material-symbols-outlined">
          close
        </span>
      </button>
      <Awards />
    </>
    :
    <div className='profile-page-container'>
      <button className='profile-logout-btn'><Logout /></button>
      {celebrating && <Confetti
        width={width}
        height={height}
      />}
      <div className='profile-top-half'>
      </div>
      <div className='profile-bottom-half'>
        <h1>Profile</h1>
        <div style={{position:'relative', height:'100%'}}>
          <Avatar path={user?.avatar} />
        </div>
        <h2>@{user?.username}</h2>
        <div className='progress-bar'>
          <div className='progress-left-text'>
            <p className='progress-sum'>{restaurantList ? restaurantList?.length : 0}</p>
            <p className='progress-checkin-text'>Check-ins</p>
          </div>
          <StepProgressBar progress={restaurantList?.length} />
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
                .replace(/False/g, 'false')
                .replace(/True/g, 'true')
                .replace(/None/g, 'null')
                .replace(/'(\w+)'\s*:/g, '"$1":')  // Replace single quotes around keys
                .replace(/:\s*'([^']*)'/g, ': "$1"') // Replace single quotes around string values
                .replace(/\['(.*?)'\]/g, '["$1"]'); // Replace single quotes in arrays

              const each = JSON.parse(convert)
              return each;
            })
          } />
        </div>
        :
        <>
          <div className='profile-award-container'>
            <div className='profile-subtitle'>
              <h3>Awards</h3>
              <button className='profile-button' onClick={() => setShowAwards(prev => !prev)}>Collection</button>
            </div>
            <div className='profile-award-card'>
              <img width='53px' src='hexagonal.svg' />
              <div className='profile-award-texts'>
                <div className='profile-award-text-1'>
                  <h4>Feta Late Than Never</h4>
                  <p>8m ago</p>
                </div>
                <p className='profile-award-text-2'>Visited 5 Greek restaurants</p>
              </div>
            </div>
            <div className='profile-award-card'>
              <img width='53px' src='hexagonal.svg' />
              <div className='profile-award-texts'>
                <div className='profile-award-text-1'>
                  <h4>I Am Pho Real</h4>
                  <p>8m ago</p>
                </div>
                <p className='profile-award-text-2'>Visited 5 Vietnamese restaurants</p>
              </div>
            </div>
          </div>
          <div className='profile-visited-container'>
            <div className='profile-subtitle'>
              <h3>Previously Visited</h3>
              <button className='profile-button' onClick={() => setToggleMapView(true)} >Show Map <span className="material-symbols-outlined">map</span></button>
            </div>

            <HorizontalChevron
              page={{ name: 'profile', classname: 'profile-visited-scrollable' }}
            >
              {visitedCards}
            </HorizontalChevron>
          </div>
        </>
      }
      {isFirstTime.profile &&
        <GuidedTour />}
    </div>
  )
}