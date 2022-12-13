import { InputGroup, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import './Navbar.css';
import { useTweetContext } from '../../lib/TweetContext';
import { Search } from 'react-bootstrap-icons';

function Searchbar() {
  const {
    search,
    setSearch,
    fetchData,
    getSearchedUserTweets,
    setLastVisible,
  } = useTweetContext();

  async function searchChange(e) {
    await setSearch({
      type: search.type,
      input: e.target.value,
      on: true,
    });
    setLastVisible('');
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
          value={search.input}
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
          onClick={() =>
            setSearch({ type: 'users', input: search.input, on: search.on })
          }
        >
          Search Users
        </Dropdown.Item>
        <Dropdown.Item
          href="#"
          onClick={() =>
            setSearch({ type: 'tweets', input: search.input, on: search.on })
          }
        >
          Search Tweets
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
}

export default Searchbar;
