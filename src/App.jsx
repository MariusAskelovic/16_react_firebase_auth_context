import { Navigate, Route, Routes } from 'react-router-dom';
import { app } from './firebase/firebase.js';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Header from './components/layout/Header.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import { useAuth } from './store/AuthProvider.jsx';

export default function App() {
  const ctx = useAuth();
  return (
    <div>
      <Header />
      <div className='container'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          {ctx.isLoggedIn && (
            <Route path='/profile' element={<ProfilePage />} />
          )}
          <Route
            path='/login'
            element={
              ctx.isLoggedIn ? <Navigate to={'/profile'} /> : <LoginPage />
            }
          />
        </Routes>
      </div>
    </div>
  );
}
