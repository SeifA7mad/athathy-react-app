import {
  Routes as RouterRoutes,
  Route,
  Navigate,
  createRoutesFromElements
} from 'react-router-dom';
import { useAppSelector } from '@src/hooks/redux-hook';
import { publicRoutes, privateRoutes } from '@src/configs/RoutesConfig';
import { APP_PREFIX_PATH, UNAUTHENTICATED_ENTRY } from '@src/configs/AppConfig';
import { Suspense } from 'react';
import { Spin } from 'antd';

interface RoutesProps {
  canCheckForAuthorization: boolean;
}

const Routes = ({
  canCheckForAuthorization = false
}: RoutesProps): JSX.Element => {
  const isLogged = useAppSelector((state) => state.user.isLoggedIn);

  const isAuthorized = canCheckForAuthorization ? isLogged : true;

  return (
    <RouterRoutes>
      {publicRoutes.map(({ path, component: Component, ...props }) => (
        <Route
          path={path}
          key={props.key}
          element={
            <Suspense fallback={<Spin size="large" />}>
              <Component {...props} />
            </Suspense>
          }
        />
      ))}
      {privateRoutes.map(({ path, component: Component, ...props }) => (
        <Route
          path={path}
          key={props.key}
          element={
            isAuthorized ? (
              <Suspense fallback={<Spin size="large" />}>
                <Component {...props} />
              </Suspense>
            ) : (
              <Navigate to={`${UNAUTHENTICATED_ENTRY}`} />
            )
          }
        />
      ))}

      {/* <Navigate to={`${APP_PREFIX_PATH}/${UNAUTHENTICATED_ENTRY}`} replace /> */}
      {/* <Route
        path="*"
        element={<Navigate to={`${APP_PREFIX_PATH}`} replace />}
      /> */}
    </RouterRoutes>
  );
};

export default Routes;
