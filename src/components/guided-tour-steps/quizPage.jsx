export const quizPage = [
  {
    target: '.input-field',
    content: (
      <>
        <h1 className="tour-title">
          What To Eat? 🍣
        </h1>
        <p className="tour-subtitle">
          On this page, you can tailor the restaurants suggestions by either:<br/><br/>
          Typing in your dish name or...
        </p>
      </>
    ),
    disableBeacon: true,
  },
  {
    target: '.quiz-cuisine-container',
    content: (
      <>
        <h1 className="tour-title">
          Search By Cuisine 🤌
        </h1>
        <p className="tour-subtitle">
          Tap to pick a cuisine type or...
        </p>
      </>
    ),
  },
  {
    target: '.i-am-feeling-hungry',
    content: (
      <>
        <h1 className="tour-title">
          Try Your Luck 🤖
        </h1>
        <p className="tour-subtitle">
          Get a random suggestion by trying your luck.
        </p>
      </>
    ),
  }
];