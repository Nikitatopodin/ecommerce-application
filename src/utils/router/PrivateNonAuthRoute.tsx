import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';

type Props = {
  children: React.ReactNode;
};

function PrivateRoute({ children }: Props) {
  const authorization = useAppSelector(
    (state) => state.authorization.isAuthorized,
  );
  return authorization ? (children as JSX.Element) : <Navigate to="/login" />;
}

export default PrivateRoute;
