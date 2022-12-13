import {
  InputGroup,
  Form,
  Dropdown,
  DropdownButton,
  Button,
} from 'react-bootstrap';
import './Navbar.css';
import { useTweetContext } from '../../lib/TweetContext';
import { Search } from 'react-bootstrap-icons';

function Searchbar() {
  const { search, setSearch, fetchData } = useTweetContext();

  function searchChange(e) {
    setSearch({
      type: search.type,
      input: e.target.value,
      on: true,
    });
  }

  function searchHandler() {
    setSearch({
      type: search.type,
      input: search.input,
      on: true,
    });
    fetchData();
  }

  return (
    <div className="d-flex search-wrapper">
      <InputGroup>
        <Form.Control
          className="searchbar"
          type="text"
          placeholder="Search..."
          onChange={searchChange}
        />
        <Button
          className="search-button"
          variant="outline-secondary"
          onClick={searchHandler}
        >
          <Search className="icon" />
        </Button>
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
