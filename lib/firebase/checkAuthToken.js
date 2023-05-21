import { firestore, auth, db } from "./config"
import { collection, getDoc, doc } from "firebase/firestore";



export const checkAuthToken = async (userId) =>  {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
};