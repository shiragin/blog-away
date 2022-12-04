function Tweet({ date, user, text }) {
  return (
    <div className="tweet-card d-flex flex-column justify-content-center">
      <div className="tweet-header d-flex justify-content-between align-items-center">
        <p className="tweet-username">{user}</p>
        <p className="tweet-date">{date}</p>
      </div>
      <p className="tweet-text w-75">{text}</p>
    </div>
  );
}

export default Tweet;
