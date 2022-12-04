function Tweet() {
  return (
    <div className="tweet-card d-flex flex-column justify-content-center">
      <div className="tweet-header d-flex justify-content-between align-items-center">
        <p className="tweet-username">Stina Stinok</p>
        <p className="tweet-date">2019-12-15T14:40:58.340Z</p>
      </div>
      <p className="tweet-text w-75">
        On the technical side, Microsoft says the Xbox Series X can handle 4K
        visuals at 60 frames per second, and potentially up to 120FPS.
      </p>
    </div>
  );
}

export default Tweet;
