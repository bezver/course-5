import ReactDOM from 'react-dom/client';
import Router from './components/Router';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './contexts/user-context/UserContextProvider';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <UserProvider>
    <Router />
    <Toaster position="top-right" />
  </UserProvider>
);
