import { useState, useEffect, useRef } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { PropTypes } from 'prop-types'
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
const MAP_ID = import.meta.env.VITE_MAP_ID

export default function MapView({ listing }) {
  const {
    coordinate,
    radius,
    setSelectedRestaurant
  } = useOutletContext(); //from Layout.jsx

  MapView.propTypes = {
    listing: PropTypes.array.isRequired
  };

  const navigate = useNavigate();
  const [activeMarkerId, setActiveMarkerId] = useState(null); // Track the active marker
  const [zoomLevel, setZoomLevel] = useState(calculateZoomLevel(radius)); // Initial calculation
  const markerRefs = useRef([]); // Array to store marker refs

  useEffect(() => {
    setZoomLevel(calculateZoomLevel(radius)); // Recalculate when radius changes
  }, [radius]);

  function calculateZoomLevel(radius) {
    return radius <= 1000 ? 14 : radius <= 5000 ? 12 : radius <= 10000 ? 11 : 10;
  }

  function handleClick(restaurant) {
    setSelectedRestaurant(restaurant);
    navigate(`./${restaurant.id}`)
  }

  const userPosition = {
    lat: coordinate.lat,
    lng: coordinate.lng
  };
  
  const listingMarkers = listing.map((each, index) => {
    const position = {
      lat: each.coordinates.latitude,
      lng: each.coordinates.longitude,
    }
    
    return (
      <div key={each.id}>
        <AdvancedMarker
          position={position}
          ref={(marker) => markerRefs.current[index] = marker} // Store ref in array
          onClick={() => setActiveMarkerId(each.id)}
        >
          <Pin
            background={"8DA656"}
            borderColor={"#8DA656"}
            glyphColor={"white"}
          />
        </AdvancedMarker>
        {activeMarkerId === each.id && (
          <div
            className='listing-card'
            to={each.id}
            key={each.id}
            style={{textDecoration: 'none', color: 'none'}}
            onClick={() => handleClick(each)}
          >
            <InfoWindow
              className='infowindow-container'
              anchor={markerRefs.current[index]} // Use the ref from the array
              onCloseClick={() => setActiveMarkerId(null)}
            >
                <h3 className='infowindow-text-1'>{each.name}</h3>
                <div className='infowindow-text-2'>
                  <p>{`${each.rating} ★ (${each.review_count})`}</p>
                  <p>{`${each.price ? each.price : ''}`}</p>
                </div>
                <p>
                  {/* <span className={!each.is_closed ? 'opening-green' : 'closing-red'}>{!each.is_closed ? `Open` : `Closed`}</span> */}
                  <span>{` • < ${parseFloat(each.distance/1000).toFixed(1)} km`}</span>
                </p>
            </InfoWindow>
          </div>
        )}
      </div>
    )
  })


  return (
    <APIProvider apiKey={API_KEY}>
      <div className='mapview-container'>
        <Map
          defaultZoom={zoomLevel}
          defaultCenter={userPosition}
          mapId={MAP_ID}
          gestureHandling={'greedy'}
          disableDefaultUI
        >
          
          {/* markers for restaurant listings + popup infowindow */}
          {listingMarkers}

          {/* marker for user location - no popup infowindow */}
          <AdvancedMarker position={userPosition}>
            <Pin
              background={"green"}
              borderColor={"green"}
              glyphColor={"black"}
              scale={1.4}
            >👀</Pin>
          </AdvancedMarker>

        </Map>
      </div>
    </APIProvider>
  );
}