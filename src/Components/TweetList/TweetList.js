import Tweet from './Tweet';
import './TweetList.css';

function TweetList({ tweets, error }) {
  return (
    <div className="mt-4 tweet-list d-flex flex-column gap-3 w-75">
      {tweets.map(({ id, userName, date, content }) => {
        return (
          <Tweet
            key={id}
            userName={userName}
            date={date}
            content={content}
            error={error}
          />
        );
      })}
    </div>
  );
}

export default TweetList;
