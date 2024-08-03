import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import CommonProvider from './context/CommonContext';
import { setupInterceptorsTo } from './services/Interceptors';
import axios from 'axios';

setupInterceptorsTo(axios)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CommonProvider>
    <Router>
      <App />
    </Router>
  </CommonProvider>,
);
