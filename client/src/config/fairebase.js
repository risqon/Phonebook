import firebase from "firebase/app"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBj0_0wxWy13mKTdOcGk891fY4emdZ6JgI",
  authDomain: "phonebook-313.firebaseapp.com",
  databaseURL: "https://phonebook-313-default-rtdb.firebaseio.com",
  projectId: "phonebook-313",
  storageBucket: "phonebook-313.appspot.com",
  messagingSenderId: "287680863787",
  appId: "1:287680863787:web:b3f0cae934bbb60b65146e",
  measurementId: "G-TLX7CGXJM3"
};

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export { storage, firebase as default };
