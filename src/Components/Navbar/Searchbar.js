import { InputGroup, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import './Navbar.css';
import { useTweetContext } from '../../lib/TweetContext';
import { Search } from 'react-bootstrap-icons';

function Searchbar() {
  const { search, setSearch, getSearchedUserTweets } = useTweetContext();

  function searchChange(e) {
    search.type === 'users'
      ? getSearchedUserTweets(e.target.value)
      : getSearchedUserTweets(e.target.value);
  }

  return (
    <div className="d-flex search-wrapper">
      <InputGroup className="d-flex align-items-center">
        <Search size={16} className="icon" />
        <Form.Control
          className="searchbar"
          type="text"
          placeholder="Search..."
          onChange={searchChange}
        />
      </InputGroup>
      <DropdownButton
        title={search.type === 'users' ? 'Search Users ' : 'Search Tweets '}
        variant="secondary"
        align="end"
      >
        <Dropdown.Item
          href="#"
          onClick={() => setSearch({ type: 'users', on: search.on })}
        >
          Search Users
        </Dropdown.Item>
        <Dropdown.Item
          href="#"
          onClick={() => setSearch({ type: 'tweets', on: search.on })}
        >
          Search Tweets
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
}

export default Searchbar;
