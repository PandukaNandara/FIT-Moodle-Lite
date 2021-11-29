import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbSxERK_scxgF577nZsUaehNqEjkQ5NEg",
  authDomain: "moodle-lite-16d1d.firebaseapp.com",
  projectId: "moodle-lite-16d1d",
  storageBucket: "moodle-lite-16d1d.appspot.com",
  messagingSenderId: "879013962741",
  appId: "1:879013962741:web:ee0e6fe9eaf0586b2576bc",
  measurementId: "G-JPYG1HLKMT",
};

initializeApp(firebaseConfig);

export default getFirestore();
