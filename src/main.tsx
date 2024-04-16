import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Root from "./routes/route.tsx";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <Root />
     </Provider>

    </BrowserRouter>
  </React.StrictMode>,
)
