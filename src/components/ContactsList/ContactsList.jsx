import PropTypes from 'prop-types';
import { Box, Button, Text } from '@chakra-ui/react';
import { ContactsListItem } from 'components/ContactsListItem/ContactsListItem';
import { statusFilters } from 'constants/statusFilter.constants';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useGetAllContactsQuery } from 'redux/contacts/contactsSlice';
import {
  getContactsByAlphabetStatus,
  getFilter,
  getFilterStatus,
} from 'redux/filter/selectors';

export const ContactsList = ({ redirect }) => {
  const { data: contacts, isLoading, error } = useGetAllContactsQuery();

  const filter = useSelector(getFilter);
  const filterStatus = useSelector(getFilterStatus);
  const alphabetStatus = useSelector(getContactsByAlphabetStatus);

  const visibleContacts = useMemo(() => {
    if (filter === '') {
      return contacts;
    } else {
      return contacts.filter(el => {
        return el.name.toLowerCase().includes(filter.toLowerCase().trim());
      });
    }
  }, [contacts, filter]);

  const filteredContacts = (contacts, filter) => {
    if (alphabetStatus) {
      contacts = [...contacts].sort((firstContact, secondContact) =>
        firstContact.name.localeCompare(secondContact.name)
      );
    }

    switch (filter) {
      case statusFilters.all:
        return contacts;
      case statusFilters.favorite:
        return contacts.filter(contact => contact.favorite);

      default:
        return contacts;
    }
  };

  return (
    <Box as="ul" display="grid" gap="4px">
      {!isLoading && contacts.length === 0 && (
        <>
          <Text textAlign="center" fontSize="3xl">
            make more friends 🤓
          </Text>
          <Button onClick={redirect} variant="link" as={NavLink} to="/contacts">
            Sure!
          </Button>
        </>
      )}
      {!isLoading &&
        filteredContacts(visibleContacts, filterStatus).map(
          ({ id, name, number }) => {
            return (
              <ContactsListItem
                key={id}
                name={name}
                id={id}
                number={number}
                // avatar={avatar}
                // favorite={favorite}
              />
            );
          }
        )}

      {error && <p>Wooops :(</p>}
    </Box>
  );
};

ContactsList.propTypes = {
  redirect: PropTypes.func,
};
