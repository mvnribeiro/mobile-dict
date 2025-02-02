import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyC6mWJR3uHaUpeDteHUFsgI-OBr2uFN6ng",
  authDomain: "mobile-dict.firebaseapp.com",
  databaseURL: "https://mobile-dict-default-rtdb.firebaseio.com",
  projectId: "mobile-dict",
  storageBucket: "mobile-dict.firebasestorage.app",
  messagingSenderId: "991281692570",
  appId: "1:991281692570:web:a52464dfddaec2e5c98423"
}

const app = initializeApp(firebaseConfig)

export default app
