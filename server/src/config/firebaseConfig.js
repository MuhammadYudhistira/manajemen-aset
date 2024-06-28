import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBeYbc-MDJhfMMxdRyYjiAd0fFSfQ2hBFs",
  authDomain: "manajemen-aset-666e8.firebaseapp.com",
  projectId: "manajemen-aset-666e8",
  storageBucket: "manajemen-aset-666e8.appspot.com",
  messagingSenderId: "123772386913",
  appId: "1:123772386913:web:01ac0098963ed7b1bcb420",
  measurementId: "G-JW00VCZ3Z8"
};

const storage = getStorage(firebaseConfig)
export default storage;
