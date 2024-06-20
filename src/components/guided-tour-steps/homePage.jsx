export const homePage = [
  {
    target: '#home-button',
    content: (
      <>
        <h1 className="tour-title">
          You&apos;re currently on the Home Page 🏠
        </h1>
        <p className="tour-subtitle">
          After all that, this is where the magic takes place.
        </p>
      </>
    ),
    disableBeacon: true,
  },
  {
    target: '.home-location-link',
    content: (
      <>
        <h1 className="tour-title">
          Where Am I? 📍
        </h1>
        <p className="tour-subtitle">
          This is your current search location.<br/><br/>It is currently set to <strong>Melbourne CBD</strong> to get you started.<br/><br/> Tapping this will also send you to the Location Page to change location.
        </p>
      </>
    ),
  },
  {
    target: '.input-field',
    content: (
      <>
        <h1 className="tour-title">
          Searching By Dish 🍣
        </h1>
        <p className="tour-subtitle">
          Similar to previous page, you can search by a new dish at any point.
        </p>
      </>
    ),
  },
  {
    target: '.home-cuisine-container',
    content: (
      <>
        <h1 className="tour-title">
          Searching By Cuisine 🤌
        </h1>
        <p className="tour-subtitle">
          Choose a different cuisine option for filtered restaurants recommendations.<br/><br/>Scroll horizontally to see more cuisine options.
        </p>
      </>
    ),
  },
  {
    target: '.home-filter-container',
    content: (
      <>
        <h1 className="tour-title">
          Filtering + Sorting 🔍
        </h1>
        <p className="tour-subtitle">
          You may <strong>filter</strong> the listings by price or distance.<br/><br/>
          Or you can choose to <strong>sort</strong> the listings by rating, review counts or distance.
        </p>
      </>
    )
  },
  {
    target: '.listing-container',
    content: (
      <>
        <h1 className="tour-title">
          Restaurant Listings 👩‍🍳
        </h1>
        <p className="tour-subtitle">
          Here are all the restaurant suggestions <br/><br/>
          Scroll down to see more!
        </p>
      </>
    )
  },
  {
    target: '.listing-restaurant-photo',
    content: (
      <>
        <h1 className="tour-title">
          Making Tough Choices 👀
        </h1>
        <p className="tour-subtitle">
          Tapping on the image to view a restaurant that caught your eyes.
        </p>
      </>
    )
  },
  {
    target: '.listing-been-to-button',
    content: (
      <>
        <h1 className="tour-title">
          Mark As Visited ✅
        </h1>
        <p className="tour-subtitle">
          Once a restaurant is marked as visited, it will no longer show in future searches<br/><br/>
          With that said, you can still view it in the Profile Page.
        </p>
      </>
    )
  },
  {
    target: '.map-button',
    content: (
      <>
        <h1 className="tour-title">
          View In Map 🗺️
        </h1>
        <p className="tour-subtitle">
          Press this button to view in map instead.
        </p>
      </>
    )
  },
];