import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// react-query imports
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Redux imports
import { Provider } from 'react-redux';
import { store } from '@src/store-redux/store';

import Routes from './routes/Routes';
import AppLayout from './components/layout/AppLayout';

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

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        // TODO: Auto login user
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    };

    bootstrapAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <AppLayout>
            <Routes canCheckForAuthorization={isReady} />
          </AppLayout>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
