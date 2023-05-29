import {
  Routes as RouterRoutes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom';
import { useAppSelector } from '@src/hooks/redux-hook';
import {
  publicRoutes,
  privateRoutes,
  vendorPortalRoutes,
  mobileLandingRoutes,
  RouteKeysEnum
} from '@src/configs/RoutesConfig';
import { APP_PREFIX_PATH, UNAUTHENTICATED_ENTRY } from '@src/configs/AppConfig';
import { Suspense } from 'react';
import { Spin } from 'antd';

import { auth } from '@src/configs/FirebaseConfig';
import AppLayout from '@src/components/layout/AppLayout';
import VendorPortalLayout from '@src/components/layout/VendorPortalLayout';
import MobileLayout from '@src/components/layout/MobileLayout';

interface RoutesProps {
  canCheckForAuthorization: boolean;
}

const Routes = ({
  canCheckForAuthorization = false
}: RoutesProps): JSX.Element => {
  const isLogged = useAppSelector((state) => state.user.isLoggedIn);

  const windowWidth = window.innerWidth;
  const navigate = useNavigate();
  if (windowWidth <= 768) {
    navigate(`${APP_PREFIX_PATH}/${RouteKeysEnum.mobileLanding}`);
  }

  const user = auth.currentUser;

  const isAuthorized = !canCheckForAuthorization || !!user;

  return (
    <RouterRoutes>
      {publicRoutes.map(({ path, component: Component, ...props }) => (
        <Route
          path={path}
          key={props.key}
          element={
            <AppLayout>
              <Suspense fallback={<Spin size='large' />}>
                <Component {...props} />
              </Suspense>
            </AppLayout>
          }
        />
      ))}
      {privateRoutes.map(({ path, component: Component, ...props }) => (
        <Route
          path={path}
          key={props.key}
          element={
            isAuthorized ? (
              <AppLayout>
                <Suspense fallback={<Spin size='large' />}>
                  <Component {...props} />
                </Suspense>
              </AppLayout>
            ) : (
              <Navigate
                to={`${APP_PREFIX_PATH}/${props.key}/${UNAUTHENTICATED_ENTRY}`}
                replace
              />
            )
          }
        />
      ))}
      {vendorPortalRoutes.map(({ path, component: Component, ...props }) => (
        <Route
          path={path}
          key={props.key}
          element={
            <VendorPortalLayout>
              <Suspense fallback={<Spin size='large' />}>
                <Component {...props} />
              </Suspense>
            </VendorPortalLayout>
          }
        />
      ))}

      {mobileLandingRoutes.map(({ path, component: Component, ...props }) => (
        <Route
          path={path}
          key={props.key}
          element={
            <MobileLayout>
              <Suspense fallback={<Spin size='large' />}>
                <Component {...props} />
              </Suspense>
            </MobileLayout>
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
