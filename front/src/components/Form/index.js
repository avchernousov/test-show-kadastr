import { useState } from 'react';
import styled from 'styled-components';
import TextField  from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { list } from '../../lib/list.js';

const Form = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  return (
    <Card>
      <Autocomplete
        inputValue={inputValue}
        id="search"
        options={list} //
        getOptionLabel={(option) => option}
        style={{ width: 430 }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
        <Search>
          <TextField {...params} label="Участки" />
            <IconButton aria-label="search" onClick={() => onSearch(inputValue)}>
              <SearchIcon />
            </IconButton>
        </Search>
        )}
        />
    </Card>
  );
}

export default Form;

const Card = styled.div`
  display: flex;
  padding: 16px 12px;
  box-shadow: 1px 2px 8px 0 rgb(13 15 16 / 30%);
  margin: 10px;
`;

const Search = styled.div`
  display: flex;
`;