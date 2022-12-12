import { InputGroup, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import './Navbar.css';
import { useTweetContext } from '../../lib/TweetContext';

function Searchbar() {
  const { search, setSearch } = useTweetContext();
  console.log(search);

  return (
    <InputGroup className="search-wrapper">
      <Form.Control className="searchbar" type="text" placeholder="Search..." />
      <DropdownButton
        title={search === 'users' ? 'Search Users ' : 'Search Tweets '}
        variant="secondary"
        align="end"
      >
        <Dropdown.Item href="#" onClick={() => setSearch('users')}>
          Search Users
        </Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => setSearch('tweets')}>
          Search Tweets
        </Dropdown.Item>
      </DropdownButton>
    </InputGroup>
  );
}

export default Searchbar;
