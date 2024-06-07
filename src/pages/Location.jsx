import { useRef, useEffect, useState, useMemo } from "react";
import { useOutletContext, Link } from "react-router-dom";
import "../styles/index.css";
import StaticMap from "../components/StaticMap";
import InputSearch from "../components/InputSearch";

export default function Location() {
  const {
    locationObj,
    setLocationObj,
    setFilterObj,
    setSelectedCuisine,
    setOffset,
    setListing
  } = useOutletContext(); //from Layout.jsx

  const [permissionStatus, setPermissionStatus] = useState('prompt');
  let autoCompleteRef = useRef();
  const inputRef = useRef();

  // default to 0.1 degree in coordinate i.e. approx +/-11km
  const defaultBounds = useMemo(() => {
    return {
      north: locationObj.coordinate.lat + 0.1,
      south: locationObj.coordinate.lat - 0.1,
      east: locationObj.coordinate.lng + 0.1,
      west: locationObj.coordinate.lng - 0.1,
    };
  }, [locationObj.coordinate.lat, locationObj.coordinate.lng]) 

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
    setLocationObj((locationObj) => ({
      ...locationObj,
      placeName: ''
    }));
    setFilterObj((filterObj) => ({
      ...filterObj,
      priceLevel: null,
      radius: 4000,
      sort: 'best_match'
    })),
    setOffset(0);
    setListing([]);
  }, [])

  // request for permission to retrieve coordinate via Geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // permission granted
        (position) => {
          setPermissionStatus('granted');
          setLocationObj((locationObj) => ({
            ...locationObj,
            coordinate: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            placeName:'Discovering Nearby'
          }))
        },
        (error) => {
          // if denied
          if (error.code === error.PERMISSION_DENIED) {
            setPermissionStatus('denied');
            setLocationObj((locationObj) => ({
              ...locationObj,
              coordinate: {
                lat: -37.8136,
                lng: 144.9631
              },
              placeName: 'Melbourne CBD'
            })); // Default to Melbourne Coordinate
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
          setLocationObj((locationObj) => ({
            ...locationObj,
            coordinate: {
              lat: place.geometry?.location.lat(),
              lng: place.geometry?.location.lng(),
            },
            placeName: place.name
          }))
        }
      });
    }
  }, []);

  return permissionStatus === 'granted' || permissionStatus === 'denied' ? (
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
      {locationObj.coordinate.lat ? 
      <>
        <StaticMap
          coordinate={locationObj.coordinate}
          page={{
            name: 'location'
          }}
        /> 
        <Link to="/Quiz">
          <button className='location-proceed-btn'>Proceed</button>
        </Link>
      </>
      : 
      <>
        <StaticMap
          coordinate={{
            lat: -38.1828007,
            lng: 144.458746,
          }}
          page={{
            name: 'location'
        }}
        /> 
      </>}
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
      {locationObj.coordinate.lat ? <StaticMap
        coordinate={locationObj.coordinate}
        page={{
          name: 'location'
        }}
      /> : ''}
      <p className='searching'>Searching location</p>
      <p className='searching-2'>Please refresh if you are not redirected within a few seconds </p>
    </div>
  );
}
