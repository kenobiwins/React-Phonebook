import { Button, Container, Input, useToast } from '@chakra-ui/react';
import { userRegestrationSchema } from 'Validations/UserValidation';
import { PasswordInput } from 'components/PasswordInput/PasswordInput';
import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/operations';

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, password } = e.currentTarget;

    const newUser = {
      name: name.value,
      email: email.value,
      password: password.value,
    };

    const isValid = await userRegestrationSchema.isValid(newUser);

    if (!isValid) {
      return toast({
        title: `Invalid properties`,
        description:
          'Login must be as email,and password should includes minimum 8 symbols and maximum 16',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }

    dispatch(register({ ...newUser }))
      .then(data => {
        if (data.error) {
          throw new Error('Wooops');
        }
        return toast({
          title: 'Account created.',
          description: `We've created your account for you ${data.payload.user.name}.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      })
      .catch(e => {
        toast({
          title: `${e.message}`,
          description: "We've some problems.",
          status: 'error',
          duration: 3000,
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
          type="text"
          name="name"
          variant="flushed"
          placeholder="Username"
        />
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
          Register
        </Button>
      </form>
    </Container>
  );
};
