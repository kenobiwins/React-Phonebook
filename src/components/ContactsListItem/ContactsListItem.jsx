import PropTypes from 'prop-types';
import { Avatar, ListItem } from './ContactsListItem.styled';
import { defaultAvatar } from 'constants/defaultAvatar';
import { useDeleteContactMutation } from 'redux/contacts/contactsSlice';
import {
  ButtonGroup,
  IconButton,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { EditContact } from 'components/EditContact/EditContact';

export const ContactsListItem = ({ name, number, id }) => {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ListItem>
      <Avatar src={defaultAvatar} alt={`${name} photo`} />
      {name}: {number}
      <ButtonGroup ml={'auto'}>
        <IconButton
          variant="ghost"
          colorScheme="blue"
          aria-label="Edit contact"
          icon={<EditIcon />}
          onClick={() => onOpen()}
        >
          Open
        </IconButton>

        <IconButton
          variant="ghost"
          colorScheme="blue"
          aria-label="Delete contact"
          icon={
            isLoading ? (
              <Spinner size="md" boxSize={4} />
            ) : (
              <DeleteIcon size="md" boxSize={4} />
            )
          }
          onClick={() => {
            deleteContact(id);
          }}
        />
        {isOpen && (
          <EditContact
            isOpen={isOpen}
            onClose={onClose}
            contact={{ name, number, id }}
          />
        )}
      </ButtonGroup>
    </ListItem>
  );
};

ContactsListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  // deleteData: PropTypes.func.isRequired,
};
