import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '@src/hooks/redux-hook';
import {
  publicRoutes,
  privateRoutes,
  RouteConfig
} from '@src/configs/RoutesConfig';
import { APP_PREFIX_PATH, UNAUTHENTICATED_ENTRY } from '@src/configs/AppConfig';
import { Suspense } from 'react';
import { Spin } from 'antd';

const Routes = ({
  canCheckForAuthorization = false
}: {
  canCheckForAuthorization: boolean;
}): JSX.Element => {
  const isLogged = useAppSelector((state) => state.user.isLoggedIn);

  const PrivateRoute = ({
    path,
    component: Component,
    ...props
  }: RouteConfig): JSX.Element => {
    if (!isLogged) {
      return <Navigate to={UNAUTHENTICATED_ENTRY} />;
    }

    return (
      <Route
        path={path}
        element={
          <Suspense fallback={<Spin size="large" />}>
            <Component {...props} />
          </Suspense>
        }
      />
    );
  };

  const PublicRoute = ({
    path,
    component: Component,
    ...props
  }: RouteConfig): JSX.Element => {
    return (
      <Route
        path={path}
        element={
          <Suspense fallback={<Spin size="large" />}>
            <Component {...props} />
          </Suspense>
        }
      />
    );
  };

  return (
    <RouterRoutes>
      {publicRoutes.map((route) => (
        <PublicRoute {...route} />
      ))}
      {privateRoutes.map((route) => (
        <PrivateRoute {...route} />
      ))}

      <Route
        path="*"
        element={<Navigate to={`${APP_PREFIX_PATH}`} replace />}
      />
    </RouterRoutes>
  );
};

export default Routes;
