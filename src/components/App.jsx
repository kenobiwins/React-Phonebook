import { Navigate, Route, Routes } from 'react-router-dom';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { Contacts } from 'pages/Contacts';
import { Login } from 'pages/Login';
import { Register } from 'pages/Register';
import { Home } from 'pages/Home';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshUser } from 'redux/auth/operations';
import { useAuth } from 'hooks/useAuth';
import { RestrictedRoute } from './Routes/RestrictedRoute';
import { PrivateRoute } from './Routes/PrivateRoute';

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      {!isRefreshing && (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route
              path="contacts"
              element={
                <PrivateRoute redirectTo="/login" component={<Contacts />} />
              }
            />
            <Route
              path="login"
              element={
                <RestrictedRoute
                  redirectTo={'/contacts'}
                  component={<Login />}
                />
              }
            />
            <Route
              path="register"
              element={
                <RestrictedRoute redirectTo="/" component={<Register />} />
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  );
};
