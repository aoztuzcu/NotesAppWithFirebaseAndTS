import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "./firebase";
import { Note, NoteWithoutId, Notes } from "@/types";
//firestore veritabanı nesnesi
const db = getFirestore(app);

// firestore notes koleksiyonu için referans
const notesRef = collection(db, "notes");

//note u firestore a  ekleme methodu.
export const createNote = async (note: NoteWithoutId) => {
  await addDoc(notesRef, note);
};

// id ye göre note u getiren method
export const readNote = async (id: string) => {
  const noteDoc = await getDoc(doc(notesRef, id));
  return noteDoc.data();
};

// bütün noteları dönen method
export const readNotes = async () => {
  const noteSnapshot = await getDocs(notesRef);
  const data: Notes = noteSnapshot.docs.map((doc) => {
    const note = doc.data() as Note;
    return {
      ...note,
      id: doc.id,
    };
  });
  return data;
};

// notu düzenleyen method
export const updateNote = async (note: Note) => {
  const noteRef = doc(notesRef, note.id);
  await updateDoc(noteRef, { ...note });
  const updatedDocSnapshot = await getDoc(noteRef);
  const updatedNote = updatedDocSnapshot.data() as Note;
  return updatedNote;
};

// notu silen method
export const deleteNote = async (id: string) => {
  const noteRef = doc(notesRef, id);
  const docSnapshot = await getDoc(noteRef);
  await deleteDoc(noteRef);
  const deletedDoc = docSnapshot.data() as Note;
  return deletedDoc;
};
