import PropTypes from 'prop-types';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRef } from 'react';
import {
  useEditContactMutation,
  useGetAllContactsQuery,
} from 'redux/contacts/contactsSlice';
import { userContactSchema } from 'Validations/UserValidation';

export function EditContact({ isOpen, onClose, contact }) {
  const initialRef = useRef(null);

  const { data: contacts } = useGetAllContactsQuery();
  const [editContact] = useEditContactMutation();

  const [name, setName] = useState(contact.name);
  const [number, setNumber] = useState(contact.number);
  const [disabled, setDisabled] = useState(true);

  const toast = useToast();

  const handleInput = ({ target: { name, value } }) => {
    setDisabled(false);
    switch (name) {
      case 'name':
        return setName(value);
      case 'number':
        return setNumber(value);
      default:
        break;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newUser = { data: { name, number }, id: contact.id };
    const isValid = await userContactSchema.isValid({ ...newUser.data });

    if (!isValid) {
      setDisabled(true);
      return toast({
        title: `Invalid properties`,
        description: `Number must be shorted than 12 symbols and biggest than 4`,
        status: 'info',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }

    const shouldUpdate = contacts.some(
      el =>
        (el.id === newUser.id && el.name !== newUser.data.name) ||
        (el.id === newUser.id && el.number !== newUser.data.number)
    );

    if (shouldUpdate) {
      editContact(newUser).then(onClose);

      return;
    }

    return toast({
      title: `Wooops`,
      description: `Do something with ${name}`,
      status: 'info',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Edit contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                ref={initialRef}
                value={name}
                onChange={handleInput}
                _focusVisible={{
                  borderColor: 'orange.200',
                  boxShadow: '0px 1px 0px 0px #fbd38d',
                }}
                pl="1.5rem"
                type="text"
                variant="flushed"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Number</FormLabel>
              <Input
                name="number"
                value={number}
                onChange={handleInput}
                _focusVisible={{
                  borderColor: 'orange.200',
                  boxShadow: '0px 1px 0px 0px #fbd38d',
                }}
                pl="1.5rem"
                type="tel"
                variant="flushed"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isDisabled={disabled}
              type="submit"
              colorScheme="orange"
              variant="ghost"
              mr={3}
            >
              Save
            </Button>
            <Button colorScheme="blue" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

EditContact.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
};
