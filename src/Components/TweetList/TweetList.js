import { nanoid } from 'nanoid';
import { useMainContext } from '../../lib/MainContext';
import Tweet from './Tweet';
import './TweetList.css';

function TweetList() {
  const { tweets } = useMainContext();

  return (
    <div className="mt-4 tweet-list d-flex flex-column gap-4 w-75">
      {tweets.map(({ id, user, date, content }) => {
        return (
          <Tweet key={id ? id : nanoid()} value={{ user, date, id, content }} />
        );
      })}
    </div>
  );
}

export default TweetList;
