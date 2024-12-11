import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { ThemeProvider } from './providers/theme-provider.tsx'
import { store } from './lib/redux/store.ts';
import { BrowserRouter, Routes, Route } from "react-router";
import ConvexProviders from './providers/convex-provider.tsx'
import MainApp from './routes/main-app.tsx'
import SignInPage from './routes/sign-in.tsx'
import SignUpPage from './routes/sign-up.tsx'
import LandingPage from './routes/landing-page.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConvexProviders>
      <Provider store={store}>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/app" element={<MainApp />}>
                <Route path=':noteId' />
              </Route>
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </ConvexProviders>
  </StrictMode>,
)
