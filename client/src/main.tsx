import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { ThemeProvider } from './providers/theme-provider.tsx'
import { store } from './lib/redux/store.ts';
import { BrowserRouter, Routes, Route } from "react-router";
import ConvexProviders from './providers/convex-provider.tsx'
import MainApp from './components/container/main-app.tsx'
import SignIn from './routes/sign-in.tsx'
import SignUp from './routes/sign-up.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConvexProviders>
      <Provider store={store}>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/app" element={<MainApp />}>
                <Route path=':noteId' />
              </Route>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </ConvexProviders>
  </StrictMode>,
)
