import Tweet from './Tweet';
import './TweetList.css';

function TweetList() {
  return (
    <div className="mt-4 tweet-list d-flex flex-column gap-3 w-75">
      <Tweet />
      <Tweet />
      <Tweet />
    </div>
  );
}

export default TweetList;
