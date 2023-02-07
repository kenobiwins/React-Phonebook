import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, Container, Heading } from '@chakra-ui/react';
import { useAuth } from 'hooks/useAuth';
import { NavLink } from 'react-router-dom';

export const Home = () => {
  const { isLoggedIn, isRefreshing } = useAuth();

  const shouldShown = isLoggedIn && !isRefreshing;
  return (
    <Container
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      maxW="md"
      mr="auto"
      ml="auto"
      p={3}
    >
      <Heading textAlign={'center'} p={6} as={'h1'} textTransform={'uppercase'}>
        {shouldShown
          ? 'Enjoy the app, try create some contact.'
          : 'welcome to contacts app.'}
      </Heading>
      {shouldShown ? (
        <Button
          as={NavLink}
          to="/contacts"
          rightIcon={<ArrowForwardIcon />}
          colorScheme="orange"
          variant="ghost"
        >
          Let's go
        </Button>
      ) : (
        <ButtonGroup>
          <Button
            size="lg"
            variant={'ghost'}
            as={NavLink}
            to="/register"
            colorScheme="orange"
          >
            Get started
          </Button>
          <Button
            size="lg"
            variant={'ghost'}
            as={NavLink}
            to="/login"
            colorScheme="blue"
          >
            Log in
          </Button>
        </ButtonGroup>
      )}
    </Container>
  );
};
