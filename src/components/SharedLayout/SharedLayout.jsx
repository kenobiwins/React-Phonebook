import { useAuth } from 'hooks/useAuth';
import { AuthNavigation } from 'components/AuthNavigation/AuthNavigation';
import { Navigation } from 'components/Navigation/Navigation';
import { UserMenu } from 'components/UserMenu/UserMenu';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';

export const SharedLayout = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <Box
        as="header"
        bg={'orange.100'}
        borderBottom={`1px solid`}
        borderColor={'orange.100'}
        fontSize={24}
        mb={5}
        boxShadow={'2px 2px 4px 1px #feebc8'}
      >
        <Container
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          maxW="lg"
          mr="auto"
          ml="auto"
          p={3}
        >
          <Navigation />
          {isLoggedIn ? <UserMenu /> : <AuthNavigation />}
        </Container>
      </Box>
      {/* <Container maxW="md" mr="auto" ml="auto" p={3}>
      </Container> */}
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};
