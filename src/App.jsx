import { Route, Routes } from 'react-router-dom';
import { app } from './firebase/firebase.js';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Header from './components/layout/Header.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
export default function App() {
  console.log('app : : ', app);
  return (
    <div>
      <Header />
      <div className='container'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </div>
    </div>
  );
}
