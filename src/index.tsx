// src/index.tsx
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App'; 
import './index.css'

const client = new ApolloClient({
  uri: 'https://wpe-hiring.tokopedia.net/ui',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
