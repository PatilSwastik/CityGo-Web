import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDcCTbk_IjyYULItNe6it3bF16bDRjkpUI",
  authDomain: "citygo-1a359.firebaseapp.com",
  databaseURL: "https://citygo-1a359-default-rtdb.firebaseio.com",
  projectId: "citygo-1a359",
  storageBucket: "citygo-1a359.appspot.com",
  messagingSenderId: "298074409690",
  appId: "1:298074409690:web:61efe98ccee3ffd1c833e3",
  measurementId: "G-YCMQ1PL2Q0",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);

export { database, storage };
export const auth = getAuth(app);
