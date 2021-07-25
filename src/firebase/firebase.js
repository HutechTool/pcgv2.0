import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSCyRekovkDRBn2kuUSDhIYw1_bfczsV8",
  authDomain: "phanconggiangvien.firebaseapp.com",
  databaseURL:
    "https://phanconggiangvien-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "phanconggiangvien",
  storageBucket: "phanconggiangvien.appspot.com",
  messagingSenderId: "153075433107",
  appId: "1:153075433107:web:6993e6b2fb38b44cf85766",
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export async function addSemester(name, data) {
  const messagesRef = firestore.collection("AllSemesters");
  await messagesRef.add({
    name: name,
    data: data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
}
export function useSemester() {
  const messagesRef = firestore.collection("AllSemesters");
  const query = messagesRef.orderBy("createdAt");
  const allSemester = useCollectionData(query, { idField: "id" });
  return allSemester[0];
}

export default firebase;
