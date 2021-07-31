import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAl2Qe9iji_0Wx7Ld7DHkuWfNJSPSYCNvE",
  authDomain: "pvgv-bf864.firebaseapp.com",
  projectId: "pvgv-bf864",
  storageBucket: "pvgv-bf864.appspot.com",
  messagingSenderId: "17940044360",
  appId: "1:17940044360:web:f9123e897cd60477c6d67d",
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
