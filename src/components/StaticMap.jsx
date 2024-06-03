import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
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

    return ( page.name == 'location' ?
        <Link to="/Quiz">
            {imgUrl ? <img className="location-img" alt='Static map of current location' src={imgUrl} ></img> : null}
        </Link> : page.name == 'restaurant' ?
        imgUrl ? <img className="restaurant-map" alt='Static map of selected restaurant' src={imgUrl} ></img> : null
        : page.name == 'cardsview' ?
        imgUrl ? <img className="cardsview-map" alt='Static map of selected restaurant' src={imgUrl} ></img> : null
        : imgUrl ? <img className="restaurant-img" alt='Static map of selected restaurant' src={imgUrl} ></img> : null
    )
}
