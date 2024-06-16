import { useRef, useEffect, useState, useMemo } from "react";
import { useOutletContext, Link } from "react-router-dom";
import "../styles/index.css";
import StaticMap from "../components/StaticMap";
import InputSearch from "../components/InputSearch";

export default function Location() {
  const {
    lsLocationObj,
    setLsLocationObj,
    setFilterObj,
    setSelectedCuisine,
    setOffset,
    setListing,
    setLoading,
  } = useOutletContext(); //from Layout.jsx

  const [permissionStatus, setPermissionStatus] = useState('prompt');
  let autoCompleteRef = useRef();
  const inputRef = useRef();

  // default to 0.1 degree in coordinate i.e. approx +/-11km
  const defaultBounds = useMemo(() => {
    return {
      north: parseFloat(lsLocationObj[0]) + 0.1,
      south: parseFloat(lsLocationObj[0]) - 0.1,
      east: parseFloat(lsLocationObj[1]) + 0.1,
      west: parseFloat(lsLocationObj[1]) - 0.1,
    };
  }, [lsLocationObj]) 

  // restricted to Australia
  const options = useMemo(() => {
    return {
      bound: defaultBounds,
      componentRestrictions: { country: "au" },
      fields: ["geometry", "name"],
    };
  }, [defaultBounds]) 

  // reset the cuisine choice and filters
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

  // request for permission to retrieve coordinate via Geolocation API
  function getMyLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // permission granted
        (position) => {
          setPermissionStatus('granted');
          setLsLocationObj(() => (
            [`${position.coords.latitude}`, `${position.coords.longitude}`, 'Discovering Nearby']
          ))}
,
        (error) => {
          // if denied
          if (error.code === error.PERMISSION_DENIED) {
            setPermissionStatus('denied');
            // if not already set in localStorage, set default to Melbourne CBD
            if (!lsLocationObj) {
              setLsLocationObj(() => (
                [`-37.8136`, `144.9631`, 'Melbourne CBD']
              ))
            }
          } else {
            setPermissionStatus('error'); // Other errors
          }
        }
      );
    } else {
      setPermissionStatus('unsupported'); // Geolocation not supported
    }
  }
  
  // Google Maps Javascript API [Library = Places]
  useEffect(() => {
    if (window.google) {
      autoCompleteRef.current = new window.google.maps.places
      .Autocomplete(
        inputRef.current,
        options
      );
      autoCompleteRef.current.addListener("place_changed", async function () {
        const place = await autoCompleteRef.current.getPlace();
        if (place) {
          setLsLocationObj(() => (
            [`${place.geometry?.location.lat()}`, `${place.geometry?.location.lng()}`, `${place.name}`]
          ))
        }
      });
    }
  }, []);

  return (
    <div className="input-outer-container">
      <InputSearch 
        page={{
          name: 'location',
          ref: inputRef,
          title: 'Where to eat?',
          placeholder: 'Suburb / Postcode'
        }}
      />
      <br />
        <StaticMap
          coordinate={{
            lat: parseFloat(lsLocationObj[0]),
            lng: parseFloat(lsLocationObj[1]),
          }}
          page={{
            name: 'location'
          }}
        /> 
        <Link to="/Quiz">
          <button className='location-proceed-btn'>Proceed</button>
        </Link>
        <div className='use-my-location'>
          <p className="material-symbols-outlined">my_location</p>
          <p onClick={getMyLocation}>Use my current location</p>
        </div>
          {permissionStatus === 'denied' && 
          <p className='geolocation-permission-denied'>
          - Location permission is required -<br/>Please go to your browser settings and enable location access for this website.
          </p>}
    </div>
  ) 
}
