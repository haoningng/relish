import { useState, useEffect } from "react"
import PropTypes from 'prop-types';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

export default function StaticMap({ coordinate, page }) {
    const [imgUrl, setImgUrl] = useState("")
    const lat = coordinate.lat;
    const lng = coordinate.lng;

    StaticMap.propTypes = {
        coordinate: PropTypes.object.isRequired,
        page: PropTypes.object.isRequired
    };

    // Google Maps Static API
    useEffect(() => {
        setImgUrl(`https://maps.googleapis.com/maps/api/staticmap?/center=${lat},%20${lng}&zoom=14&size=400x400&markers=${lat},%20${lng}&key=${API_KEY}`)
    }, [lat, lng])

    return ( page.name == 'location' 
        ? imgUrl ? <img className="location-img" alt='Static map of current location' src={imgUrl} ></img> : <div className="location-img"></div>
        : page.name == 'restaurant' 
            ? imgUrl ? <img className="restaurant-map" alt='Static map of selected restaurant' src={imgUrl} ></img> : <div className="restaurant-map"></div>
            : page.name == 'cardsview' 
                ? imgUrl ? <img className="listing-restaurant-photo" alt='Static map of selected restaurant' src={imgUrl} ></img> : <div className="listing-restaurant-photo"></div>
                : page.name == 'profile' 
                    ? imgUrl ? <img className="profile-visited-img" alt='Static map of selected restaurant' src={imgUrl} ></img> : <div className="profile-visited-img"></div>
                    : imgUrl ? <img className="restaurant-img" alt='Static map of selected restaurant' src={imgUrl} ></img> : <div className="restaurant-img"></div>
    )
}
