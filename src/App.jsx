import Login from './components/Login.jsx';
import { app } from './firebase/firebase.js';
export default function App() {
  console.log('app : : ', app);
  return (
    <div className='container'>
      <h1>Firebase</h1>
      <Login />
    </div>
  );
}
