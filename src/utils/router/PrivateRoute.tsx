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
  return authorization ? <Navigate to="/" /> : (children as JSX.Element);
}

export default PrivateRoute;
