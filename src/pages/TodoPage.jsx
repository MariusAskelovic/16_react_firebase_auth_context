import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
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
      //   console.log('singleBookObj ===', singleBookObj);
    });
    // console.log('dataBack ===', dataBack);
    setBooksArr(dataBack);
  }
  getBooksFb();
  useEffect(() => {
    getBooksFb();
  }, []);

  const newBook = {
    title: 'The Great Gatsby',
    year: 1925,
    author: 'F. Scott Fitzgerald',
    isOnSale: true,
  };

  async function createBook() {
    try {
      const docRef = await addDoc(collection(db, 'books'), newBook);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
  async function handleDelete(idToDelete) {
    console.log('idToDelete ===', idToDelete);
    try {
      const rez = await deleteDoc(doc(db, 'books', idToDelete));
      console.log('pavyko delete ===', rez);
      getBooksFb();
    } catch (error) {
      console.warn('ivyko klaida:', error);
    }
  }
  return (
    <div className='contaienr'>
      <h1>Todo page</h1>
      <p>make your todos</p>
      <div>
        <button onClick={() => {}}>get books data</button>
        <button onClick={createBook}>create book</button>
      </div>

      <ul className='unlisted'>
        {booksArr.map((bookObj) => (
          <li key={bookObj.id}>
            TITLE: {bookObj.title}
            {'  '}
            <button onClick={() => handleDelete(bookObj.id)}>El Deleto</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
