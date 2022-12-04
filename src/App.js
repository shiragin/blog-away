import TweetCreate from './Components/TweetCreate/TweetCreate';
import TweetList from './Components/TweetList/TweetList';
import './App.css';

function App() {
  return (
    <div className="container d-flex flex-column align-items-center my-4">
      <TweetCreate />
      <TweetList />
    </div>
  );
}

export default App;
