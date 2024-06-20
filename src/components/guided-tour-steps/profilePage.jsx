export const profilePage = [
  {
    target: '#profile-button',
    content: (
      <>
        <h1 className="tour-title">
          You&apos;re currently on the Profile Page 👤
        </h1>
        <p className="tour-subtitle">
          Welcome to your personal space of tasty collections.
        </p>
      </>
    ),
    disableBeacon: true,
  },
  {
    target: '.progress-left-text',
    content: (
      <>
        <h1 className="tour-title">
          Tracking Your Progress 📊
        </h1>
        <p className="tour-subtitle">
          Every restaurant visited will be counted towards the goal.
        </p>
      </>
    ),
  },
  {
    target: '.profile-award-container',
    content: (
      <>
        <h1 className="tour-title">
          What&apos;s In It For You? 🏆
        </h1>
        <p className="tour-subtitle">
          That&apos;s for you to find out!<br/><br/>
          Can&apos;t promise the awards would change your life but they sure would make your day.
        </p>
      </>
    ),
  },
  {
    target: '#profile-collection-button',
    content: (
      <>
        <h1 className="tour-title">
          View Award Page 🏆
        </h1>
        <p className="tour-subtitle">
          Click here to view all award collections.
        </p>
      </>
    ),
  },
  {
    target: '.profile-visited-container',
    content: (
      <>
        <h1 className="tour-title">
          Previously Visited Restaurants 🍽️
        </h1>
        <p className="tour-subtitle">
          This is every restaurant you have visited for you to reminisce about all the good food you had.
        </p>
      </>
    ),
  },
  {
    target: '.profile-been-to-button',
    content: (
      <>
        <h1 className="tour-title">
          Removed As Visited ❌
        </h1>
        <p className="tour-subtitle">
          Accidentally marking a restaurant as visited? <br/><br/>
          Tap this button to remove it from the list.
        </p>
      </>
    ),
  },
  {
    target: '#profile-map-button',
    content: (
      <>
        <h1 className="tour-title">
          View In Map 🗺️
        </h1>
        <p className="tour-subtitle">
          You know the drill, tap this to display the visited restaurant lists in <strong>map</strong> instead.
        </p>
      </>
    ),
  },
  {
    target: '#root',
    content: (
      <>
        <h1 className="tour-title">
          This Is It! 🍅
        </h1>
        <p className="tour-subtitle">
          Enjoy and relish every moment you spend embarking on your culinary adventure.
        </p>
      </>
    ),
  },
];