import { Link, Stack } from '@chakra-ui/react';
import { useAuth } from 'hooks/useAuth';
import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  const { isLoggedIn } = useAuth();
  return (
    <nav>
      <Stack as="ul" direction="row" spacing={1}>
        <li>
          <Link
            as={NavLink}
            p={2}
            borderRadius={'16px'}
            to={'/'}
            _hover={{ bg: 'orange.200', color: 'blue.400' }}
            _activeLink={{ bg: 'orange.200', color: 'inherit' }}
          >
            Home
          </Link>
        </li>
        <li>
          {isLoggedIn && (
            <Link
              as={NavLink}
              p={2}
              borderRadius={'16px'}
              to={'/contacts'}
              _hover={{ bg: 'orange.200', color: 'blue.400' }}
              _activeLink={{ bg: 'orange.200', color: 'inherit' }}
            >
              Contacts
            </Link>
          )}
        </li>
      </Stack>
    </nav>
  );
};
