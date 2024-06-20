export const locationPage = [
  {
    target: 'body',
    content: (
      <>
        <h1 className="tour-title">
          Welcome To Relish
        </h1>
        <p className="tour-subtitle">
          This is an interactive guided tour to help you make the most out of this app.<br/><br/>
          Click &quot;next&quot; to proceed to the end.
        </p>
      </>
    ),
    disableBeacon: true,
  },
  {
    target: '#location-button',
    content: (
      <>
        <h1 className="tour-title">
          You&apos;re currently on the Location Page 📍
        </h1>
        <p className="tour-subtitle">
          Head to this page whenever you want to search a particular location.
        </p>
      </>
    ),
  },
  {
    target: '.input-field',
    content: (
      <>
        <h1 className="tour-title">
          Where To Eat? 📍
        </h1>
        <p className="tour-subtitle">
          Type in the suburb/postcode for the location search to take place. <br/><br/>
          Tap to select a location from dropdown.
        </p>
      </>
    ),
  },
  {
    target: '.use-my-location',
    content: (
      <>
        <h1 className="tour-title">
          Search Near You 🌏
        </h1>
        <p className="tour-subtitle">
          Press this button to search near you <br/><br/>
          *Note:*<br/>Location permission is required for this. Please press &apos;ALLOW&apos; to enable location access.
        </p>
      </>
    )
  },
  {
    target: '.location-proceed-btn',
    content: (
      <>
        <h1 className="tour-title">
          Proceed To Next Page ➡️
        </h1>
        <p className="tour-subtitle">
          Once the location is set, the map will change, once that happens, press this button to proceed.
        </p>
      </>
    )
  },
];