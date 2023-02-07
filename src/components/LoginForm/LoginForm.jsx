import { Button, Container, Input, useToast } from '@chakra-ui/react';
import { userLogInSchema } from 'Validations/UserValidation';
import { PasswordInput } from 'components/PasswordInput/PasswordInput';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/operations';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = e.currentTarget;

    const user = {
      email: email.value,
      password: password.value,
    };

    const isValid = await userLogInSchema.isValid(user);

    if (!isValid) {
      toast({
        title: `Invalid properties`,
        description: 'Incorrect login or password.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }

    dispatch(logIn({ ...user }))
      .then(data => {
        if (data.error) {
          throw new Error('woops');
        }
        return toast({
          title: 'Log in.',
          description: `Welcome back, ${data.payload.user.name}!`,
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      })
      .catch(e => {
        toast({
          title: `${e.message}`,
          description: "We've some problems.",
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      });
  };

  return (
    <Container
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      maxW="md"
      mr="auto"
      ml="auto"
      p={3}
      color="blue.400"
    >
      <form onSubmit={handleSubmit} autoComplete="off">
        <Input
          _focusVisible={{
            borderColor: 'orange.200',
            boxShadow: '0px 1px 0px 0px #fbd38d',
          }}
          pl="1.5rem"
          type="email"
          name="email"
          variant="flushed"
          placeholder="Email"
        />
        <PasswordInput name={'password'} />
        <Button
          w={'sm'}
          m={'auto'}
          type="submit"
          colorScheme="orange"
          variant="ghost"
        >
          Log In
        </Button>
      </form>
    </Container>
  );
};
