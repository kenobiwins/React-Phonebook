import { CloseIcon } from '@chakra-ui/icons';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import debounce from 'lodash.debounce';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetAllContactsQuery } from 'redux/contacts/contactsSlice';
import { changeFilter } from 'redux/filter/filterSlice';

export const Filter = () => {
  const { data, isLoading } = useGetAllContactsQuery();

  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();

  const debounceFilter = useMemo(() => {
    return debounce(query => dispatch(changeFilter(query)), 500);
  }, [dispatch]);

  const handleFilterInput = ({ target: { value } }) => {
    setFilter(value);
    debounceFilter(value);
  };

  const handleReset = () => {
    setFilter('');
    dispatch(changeFilter(''));
  };

  const shouldShown = !isLoading && data.length > 0;

  return (
    shouldShown && (
      <InputGroup>
        <Input
          _focusVisible={{
            borderColor: 'orange.200',
            boxShadow: '0px 1px 0px 0px #fbd38d',
          }}
          autoComplete="off"
          pl="1.5rem"
          variant="flushed"
          type="text"
          name="filter"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleFilterInput}
          value={filter}
          placeholder="Find contacts by name"
        />
        <InputRightElement width="4.5rem">
          {filter.length > 0 && (
            <Button
              h="1.75rem"
              size="sm"
              variant={'ghost'}
              onClick={handleReset}
            >
              <CloseIcon />
            </Button>
          )}
        </InputRightElement>
      </InputGroup>
    )
  );
};
