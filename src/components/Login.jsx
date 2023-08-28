import { useState } from 'react';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // if (emailValue.trim().length === 0 || passwordValue.trim().length === 0) {
    //   return;
    // }
    if (!emailValue || !passwordValue) {
      console.warn('email or password not entered');
      return;
    }
    // console.log('email: ', emailValue);
    // console.log('password: ', passwordValue);
    loginWithFirebase();
    console.log('forma ok');
  }

  function loginWithFirebase() {
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log('user ===', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorCode ===', errorCode);
        console.log('errorMessage ===', errorMessage);
      });
  }
  return (
    <div>
      <h2>Login here</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='your email'
          onChange={(e) => setEmailValue(e.target.value)}
          value={emailValue}
        />
        <input
          type='password'
          placeholder='your password'
          onChange={(e) => setPasswordValue(e.target.value)}
          value={passwordValue}
        />
        <button type='submit'>Login</button>
      </form>
      <div>
        <p>Entered email: {emailValue}</p>
        <p>Entered password: {passwordValue}</p>
      </div>
    </div>
  );
}
