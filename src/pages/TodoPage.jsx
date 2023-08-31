import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useState } from 'react';
export default function TodoPage() {
  const [booksArr, setBooksArr] = useState([]);
  async function getBooksFb() {
    const querySnapshot = await getDocs(collection(db, 'books'));
    const dataBack = [];
    querySnapshot.forEach((doc) => {
      //   console.log(doc.id);
      //   console.log(doc.data());

      //   const singleBookObj = doc.data();
      //   console.log('singleBookObj ===', singleBookObj);
      //   singleBookObj.id = doc.id;

      const singleBookObj = {
        id: doc.id,
        ...doc.data(),
      };
      dataBack.push(singleBookObj);
      console.log('singleBookObj ===', singleBookObj);
    });
    console.log('dataBack ===', dataBack);
    setBooksArr(dataBack);
  }
  return (
    <div className='contaienr'>
      <h1>Todo page</h1>
      <p>make your todos</p>
      <div>
        <button onClick={getBooksFb}>get books data</button>
      </div>

      <ul className='unlisted'>
        {booksArr.map((bookObj) => (
          <li key={bookObj.id}>TITLE: {bookObj.title}</li>
        ))}
      </ul>
    </div>
  );
}
