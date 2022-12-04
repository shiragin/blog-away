import Tweet from './Tweet';
import './TweetList.css';

function TweetList({ tweets }) {
  return (
    <div className="mt-4 tweet-list d-flex flex-column gap-3 w-75">
      {tweets.map(({ id, user, date, text }) => {
        return <Tweet key={id} user={user} date={date} text={text} />;
      })}
    </div>
  );
}

export default TweetList;
