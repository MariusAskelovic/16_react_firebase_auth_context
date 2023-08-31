import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Header from './components/layout/Header.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import { useAuth } from './store/AuthProvider.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import TodoPage from './pages/TodoPage.jsx';

export default function App() {
  const ctx = useAuth();
  return (
    <div>
      <Header />
      <div className='container'>
        <Routes>
          <Route path='/' element={<HomePage />} />

          <Route
            path='/profile'
            element={
              ctx.isLoggedIn ? <ProfilePage /> : <Navigate to={'/login'} />
            }
          />
          {ctx.isLoggedIn && <Route path='/todos' element={<TodoPage />} />}

          <Route
            path='/login'
            element={
              ctx.isLoggedIn ? <Navigate to={'/profile'} /> : <LoginPage />
            }
          />

          {!ctx.isLoggedIn && (
            <Route path='/register' element={<RegisterPage />} />
          )}
        </Routes>
      </div>
    </div>
  );
}
