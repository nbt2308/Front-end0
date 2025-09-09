import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useTranslation } from 'react-i18next';
import { FaSearch } from "react-icons/fa";
import { toast } from 'react-toastify';
const SearchBar = () => {
  const { t } = useTranslation();
  const handleSearch=()=>{
   
  }
  return (
    <>
      <InputGroup className="mb-3">
        
        <Form.Control
          placeholder={t('adminPage.usersManagement.searchBar')}
          aria-label="Username"
          aria-describedby="basic-addon1"
          className='search-quiz'
         
        />
        <InputGroup.Text id="basic-addon1" onClick={()=>{handleSearch()}}><FaSearch/></InputGroup.Text>
      </InputGroup>
      {/* <InputGroup className="mb-3 ">

        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder=
          className='search-users'
        />
      </InputGroup> */}

    </>
  );
}

export default SearchBar;