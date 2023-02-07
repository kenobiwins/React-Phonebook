import PropTypes from 'prop-types';
import { useState } from 'react';

const { ViewIcon, ViewOffIcon } = require('@chakra-ui/icons');
const {
  InputGroup,
  Input,
  InputRightElement,
  Button,
} = require('@chakra-ui/react');

export function PasswordInput({ name }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup as={'label'} size="md">
      <Input
        _focusVisible={{
          borderColor: 'orange.200',
          boxShadow: '0px 1px 0px 0px #fbd38d',
        }}
        variant={'flushed'}
        name={name}
        pl="1.5rem"
        pr="4.5rem"
        type={show ? 'text' : 'password'}
        placeholder="Enter password"
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? <ViewOffIcon /> : <ViewIcon />}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

PasswordInput.propTypes = {
  name: PropTypes.string,
};
