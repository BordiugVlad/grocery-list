// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzA9uWgoz7nMtpv6Shsy23IUca_IEoAVM",
  authDomain: "groceryapp-e85a5.firebaseapp.com",
  projectId: "groceryapp-e85a5",
  storageBucket: "groceryapp-e85a5.firebasestorage.app",
  messagingSenderId: "667744995017",
  appId: "1:667744995017:web:fcd06ce15cd2c73ac92f18",
  measurementId: "G-X0B0ZDWXB8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };