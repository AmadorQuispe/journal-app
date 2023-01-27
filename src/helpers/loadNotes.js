import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export const loadNotes = async (uid) => {
    const snapshot = await getDocs(collection(db,`${uid}/journal/notes`));
    let notes = [];
    snapshot.forEach(note=>{
        notes.push({id:note.id,...note.data()})
    });
    return notes;
}