import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// react-query imports
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Routes from './routes/Routes';
import AppLayout from './components/layout/AppLayout';
import ScrollToTop from './hooks/scroll-to-top';

import './configs/FirebaseConfig';
import { useAppDispatch } from './hooks/redux-hook';
import { userActions } from './store-redux/slices/user-slice';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from './configs/FirebaseConfig';
import { message, notification } from 'antd';

import TimeAgo from 'javascript-time-ago';

// English.
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      retryDelay: 2000
    },
    mutations: {
      networkMode: 'online',
      retry: 1,
      retryDelay: 2000
    }
  }
});

const App = () => {
  const [isReady, setIsReady] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userToken = await user.getIdToken();
        dispatch(
          userActions.login({
            accessToken: userToken,
            displayName: user.displayName || '',
            email: user.email || ''
          })
        );
      } else {
        dispatch(userActions.logout());
      }

      setIsReady(true);
    });
    message.config({
      duration: 2,
      maxCount: 3
    });
    notification.config({
      duration: 2,
      maxCount: 3
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppLayout>
          <Routes canCheckForAuthorization={isReady} />
        </AppLayout>
        <ScrollToTop />
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
};

export default App;
