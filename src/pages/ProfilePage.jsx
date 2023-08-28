import { useState } from 'react';
import { getAuth, signOut, updateProfile } from 'firebase/auth';

export default function ProfilePage() {
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState(
    'https://example.com/jane-q-user/profile.jpg'
  );

  const auth = getAuth();
  updateProfile(auth.currentUser, {
    displayName: displayName,
    photoURL: photoURL,
  })
    .then(() => {
      // Profile updated!
      // ...
      console.log('successfully updated');
    })
    .catch((error) => {
      console.warn('failed to update profile');
      console.warn(error);
    });

  function handleSubmit(e) {
    e.preventDefault();
    console.log('displayName ===', auth.currentUser.displayName);
    console.log('photoURL ===', auth.currentUser.photoURL);
  }

  function logout() {
    signOut(auth).then(console.log('pavyko logout')).catch(console.warn);
  }
  return (
    <div className='contaienr'>
      <h1>ProfilePage</h1>
      <p>Welcome to Your own space</p>
      <h2>{displayName ? displayName : null}</h2>
      <img src={photoURL ? photoURL : '#'} alt='Profile image' />
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='enter your new display name'
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
        <input
          type='text'
          placeholder='enter photoURL'
          onChange={(e) => setPhotoURL(e.target.value)}
          value={photoURL}
        />
        <button type='submit'>Update</button>
      </form>
      <br></br>
      <button type='submit' onClick={logout}>
        Logout
      </button>
    </div>
  );
}
