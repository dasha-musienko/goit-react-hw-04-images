import { useState } from 'react';
import { Header, Form, Input, SearchButton } from './Searchbar.styled';
import { FiSearch } from 'react-icons/fi';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = evt => {
    setQuery(evt.target.value.trim().toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(query);
    evt.target.reset();
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <FiSearch size={20} />
        </SearchButton>

        <Input
          type="text"
          autoComplete="off"
          name="query"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </Form>
    </Header>
  );
};
