import { useState } from 'react';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegisterPage() {
  const [emailVal, setEmailVal] = useState('');
  const [pswVal, setPswVal] = useState('');
  const [psw2Val, setPsw2Val] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');
    if (emailVal.trim().length === 0 || pswVal.trim().length === 0) {
      return setErrorMsg('enter email and password');
    }
    if (pswVal.trim() !== psw2Val) {
      return setErrorMsg('passwords dont match');
    }
    // console.log(errorMsg);
  }
  function handleClick() {
    handleSubmit();
    createUserWithEmailAndPassword();
  }
  createUserWithEmailAndPassword(auth, emailVal, pswVal)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('user ===', user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode ===', errorCode);
      console.log('errorMessage ===', errorMessage);
      errorMessage;
      // ..
    });
  console.log('emailVal ===', emailVal);
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='enter email'
          onChange={(e) => setEmailVal(e.target.value)}
          value={emailVal}
        />
        <input
          type='password'
          placeholder='enter password'
          onChange={(e) => setPswVal(e.target.value)}
          value={pswVal}
        />
        <input
          type='password'
          placeholder='repeat password'
          onChange={(e) => setPsw2Val(e.target.value)}
          value={psw2Val}
        />
        <button type='submit' onClick={handleClick}>
          Register
        </button>
      </form>
      {errorMsg && <p className='error-message'>{errorMsg}</p>}
    </div>
  );
}
