import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import MainPage from './pages/MainPage/MainPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import PresentationsPage from './pages/PresentationsPage/PresentationsPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from "./components/ToastProvider/ToastProvider";
import { fetchUserProfile } from "./store/authSlice";
import type { AppDispatch } from "./store";
import PresentationSetupPage from "./pages/PresentationSetupPage/PresentationSetupPage";

// Компонент для инициализации профиля
// eslint-disable-next-line react-refresh/only-export-components
const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const access = localStorage.getItem("access");
    if (access) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch]);

  return <>{children}</>;
};


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthInitializer>
        <BrowserRouter>
          <ToastProvider>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/presentations" element={<PresentationsPage />} />
              <Route path="/presentations/:id" element={<PresentationSetupPage />} />
            </Routes>
          </ToastProvider>
        </BrowserRouter>
      </AuthInitializer>
    </Provider>
  </StrictMode>
);
