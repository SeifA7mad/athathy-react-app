// react-query imports
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Redux imports
import { Provider } from 'react-redux';
import { store } from '@src/store-redux/store';

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
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
