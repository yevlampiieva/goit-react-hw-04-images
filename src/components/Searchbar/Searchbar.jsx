import { useState } from 'react';
import toast from 'react-hot-toast';
import { ImSearch } from 'react-icons/im';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const SearchQuery = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const SubmitSearchQuery = event => {
    event.preventDefault();

    if (query.trim() === '') {
      toast.error('Please input some value');
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={SubmitSearchQuery}>
        <SearchFormBtn type="submit">
          <ImSearch style={{ width: 20, height: 20 }} />
        </SearchFormBtn>

        <SearchFormInput
          type="text"
          name="query"
          value={query}
          onChange={SearchQuery}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHeader>
  );
};
