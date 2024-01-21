import {getAuth} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getStorage } from 'firebase/storage'
import {config} from "@/firebase/config";

const app = initializeApp(config.firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage();
    