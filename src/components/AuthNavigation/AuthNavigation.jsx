import { Stack, Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

export const AuthNavigation = () => {
  return (
    <Stack direction={'row'} spacing={3} alignItems={'center'}>
      <Link
        as={NavLink}
        p={1}
        borderRadius={'16px'}
        to={'/register'}
        _hover={{ bg: 'orange.200', color: 'blue.400' }}
        _activeLink={{ bg: 'orange.200', color: 'inherit' }}
      >
        Register
      </Link>

      <Link
        as={NavLink}
        p={1}
        borderRadius={'16px'}
        to={'/login'}
        _hover={{ bg: 'orange.200', color: 'blue.400' }}
        _activeLink={{ bg: 'orange.200', color: 'inherit' }}
      >
        Log in
      </Link>
    </Stack>
  );
};
