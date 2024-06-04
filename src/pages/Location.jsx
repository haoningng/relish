import { useRef, useEffect, useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import "../styles/index.css";
import StaticMap from "../components/StaticMap";
import InputSearch from "../components/InputSearch";

export default function Location() {
  const {
    coordinate,
    setCoordinate,
    setPlaceName,
    setLocation,
    setRadius,
    setPriceLevel,
    setSort,
    setSelectedCuisine,
    setOffset,
    setFilteredListing
  } = useOutletContext(); //from Layout.jsx

  const [permissionStatus, setPermissionStatus] = useState('prompt');
  let autoCompleteRef = useRef();
  const inputRef = useRef();

  // default to 0.1 degree in coordinate i.e. approx +/-11km
  const defaultBounds = useMemo(() => {
    return {
      north: coordinate.lat + 0.1,
      south: coordinate.lat - 0.1,
      east: coordinate.lng + 0.1,
      west: coordinate.lng - 0.1,
    };
  }, [coordinate.lat, coordinate.lng]) 

  // restricted to Australia
  const options = useMemo(() => {
    return {
      bound: defaultBounds,
      componentRestrictions: { country: "au" },
      fields: ["geometry", "name"],
    };
  }, [defaultBounds]) 

  // reset the cuisine choice, placeName and filters
  useEffect(() => {
    setSelectedCuisine('');
    setPlaceName('');
    setLocation('');
    setRadius(4000);
    setPriceLevel(null);
    setSort('best_match');
    setOffset(0);
    setFilteredListing([]);
  }, [])

  // request for permission to retrieve coordinate via Geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // permission granted
        (position) => {
          setPermissionStatus('granted');
          setCoordinate({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          setPlaceName('Discovering Nearby')
        },
        (error) => {
          // if denied
          if (error.code === error.PERMISSION_DENIED) {
            setPermissionStatus('denied');
            setCoordinate({lat: -37.8136, lng: 144.9631}); // Default to Melbourne Coordinate
          } else {
            setPermissionStatus('error'); // Other errors
          }
        }
      );
    } else {
      setPermissionStatus('unsupported'); // Geolocation not supported
    }
  }, []);
  
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
          setPlaceName(place.name)
          setCoordinate({
            lat: place.geometry?.location.lat(),
            lng: place.geometry?.location.lng(),
          })
        }
      });
    }
  }, []);

  return permissionStatus === 'denied' ? (
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
      {coordinate.lat ? <StaticMap
        coordinate={coordinate}
        page={{
          name: 'location'
        }}
      /> : 'searching'}
      <p>Tap on the map to proceed</p>
    </div>
  ) : permissionStatus === 'granted' ? (
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
      {coordinate.lat ? <StaticMap
        coordinate={coordinate}
        page={{
          name: 'location'
        }}
      /> : 'searching'}
      <p>Tap on the map to proceed</p>
    </div>
  ) : (
    // this block runs when the browser is checking permissionStatus
    // TODO: insert animation here maybe
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
      {coordinate.lat ? <StaticMap
        coordinate={coordinate}
        page={{
          name: 'location'
        }}
      /> : ''}
      <p className='searching'>Searching location</p>
      <p className='searching-2'>Please refresh if you are not redirected within a few seconds </p>
    </div>
  );
}
