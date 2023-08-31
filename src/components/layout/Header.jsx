import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import { useAuth } from '../../store/AuthProvider';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import RegisterPage from '../../pages/RegisterPage';

export default function Header() {
  const ctx = useAuth();
  //   console.log('ctx ===', ctx);

  const isLoggedIn = ctx.isLoggedIn;
  // const navigate = useNavigate();

  function logout() {
    signOut(auth)
      .then(() => {
        // navigate('/login');
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log('logout : something went wrong :: ', error);
      });
  }

  return (
    <header className='header'>
      <div className='container'>
        <Link to='/' className='logo'>
          Logo
        </Link>
        <nav>
          <NavLink className={'navLink'} to={'/'}>
            Home
          </NavLink>
          {isLoggedIn && (
            <NavLink className={'navLink'} to={'/profile'}>
              My Profile
            </NavLink>
          )}
          {!isLoggedIn && (
            <NavLink className={'navLink'} to={'/login'}>
              Login
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink className={'navLink'} to={'/todos'}>
              Todos
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink onClick={logout} className={'navLink'} to={'/login'}>
              Logout
            </NavLink>
          )}
          {!isLoggedIn && (
            <NavLink className={'navLink'} to={'/register'}>
              Register
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
