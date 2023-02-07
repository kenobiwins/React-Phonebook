import {
  Avatar,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useAuth } from 'hooks/useAuth';
import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/operations';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const handleLogOut = () => dispatch(logOut());

  return (
    <>
      <Stack direction={'row'} spacing={3} alignItems={'center'}>
        <Popover>
          <Text>{`Welcome,${user.name}`}</Text>
          <PopoverTrigger>
            <Button
              p={2}
              borderRadius={'22px'}
              bg="transparent"
              _hover={{ bg: 'transparent' }}
            >
              {' '}
              <Avatar justifyContent={'center'} boxSize={31} bg={'blue.400'} />
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent w="160px" p={4}>
              <PopoverArrow />

              <PopoverBody>
                <Button
                  w={'100%'}
                  bg={'orange.200'}
                  color={'blue.400'}
                  onClick={handleLogOut}
                >
                  Logout
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </Stack>
    </>
  );
};
