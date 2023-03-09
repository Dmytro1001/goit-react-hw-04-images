import { PropTypes } from 'prop-types';
import { useState } from 'react';
import {
  Searchbar,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styles';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';

export const HeaderSearchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      toast.info('Type something to find', {
        position: 'top-center',
        theme: 'colored',
      });
      return;
    }
    onSubmit(value.trim());
    setValue('');
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit" aria-label="Search">
          <BsSearch size={20} />
        </SearchFormBtn>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
      </SearchForm>
    </Searchbar>
  );
};

HeaderSearchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
