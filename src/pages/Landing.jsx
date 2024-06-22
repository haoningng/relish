import { useNavigate } from 'react-router-dom'

export default function Landing() {
    const navigate = useNavigate();
    // const cuisineList = [
    //   'Japanese',
    //   'Mexican',
    //   'Indian',
    //   'Chinese',
    //   'Italian',
    //   'Thai',
    //   'Vegan',
    //   'Pizza',
    //   'FastFood',
    //   'Burgers',
    //   'Desserts',
    //   'Asian',
    //   'Halal', 
    //   'Chicken',
    //   'Breakfast',
    //   'Sandwich',
    //   'Bakery',
    //   'American',
    //   'Seafood',
    //   'Salad'
    //   ] // cuisine options
    return (
      <div className="landing-container"> 
        <img 
          className='landing-img'
          src={`/landing-background.jpg`}
          alt={`Background photo of Landing Page`} 
        />
        {/* <div className='landing-cuisine-container'>
        {cuisineList.map(each => {
          return (
            <div key={cuisineList.indexOf(each)}>
                <img 
                  className='landing-cuisine-img'
                  src={`/Cuisines/${each}.svg`}
                  alt={`${each} icon`} 
                />
            </div>
          )
        })}
        </div> */}
        <h1 className='landing-title'>Relish</h1>
        <button 
          className='landing-login-btn'
          onClick={() => navigate('/auth/login')}
        >Log In</button>
        <button
          className='landing-firsttime-btn'
          onClick={() => navigate('/auth/signup')}
        >First Time Here?</button>
      </div>
    );
}