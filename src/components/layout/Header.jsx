import { Link, NavLink } from 'react-router-dom';
import './Header.scss';

const isLoggedIn = false;

export default function Header() {
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
            <NavLink className={'navLink'} to={'/login'}>
              Logout
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
