import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const SearchBar=()=> {
  return (
    <>
      
      
      <InputGroup className="mb-3 ">
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder='Search'
          className='search-users'
        />
      </InputGroup>
     
    </>
  );
}

export default SearchBar;