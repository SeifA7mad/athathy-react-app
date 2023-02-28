import { useEffect, useState } from 'react';

// react-query imports
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Redux imports
import { Provider } from 'react-redux';
import { store } from '@src/store-redux/store';
import Layout from 'antd/es/layout/layout';
import Routes from './routes/Routes';

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
        <Layout>
          <Routes canCheckForAuthorization={isReady} />
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
