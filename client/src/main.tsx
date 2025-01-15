import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './containers/App.tsx'
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from 'react-redux'
import { store } from './lib/redux/store.ts';
import LandingPage from './routes/landing-page.tsx';
import SignInPage from './routes/sign-in.tsx';
import SignUpPage from './routes/sign-up.tsx';
import * as serviceWorker from './service-worker.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<App />}>
            <Route path=':noteId' />
          </Route>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
serviceWorker.unregister();