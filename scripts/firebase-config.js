// Import Firebase SDKs from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7L7UfUNfkuukmmg865FAGy6fDn1u5Ym4",
  authDomain: "portefolio-a0995.firebaseapp.com",
  projectId: "portefolio-a0995",
  storageBucket: "portefolio-a0995.firebasestorage.app",
  messagingSenderId: "218195804871",
  appId: "1:218195804871:web:5ae2d9006fdc248644b4e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export services
export { app, auth, db };
