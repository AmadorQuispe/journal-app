import { db } from "../firebase/firebase-config";
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { types } from "../reducers/types";
import { loadNotes } from "../helpers/loadNotes";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
        const docRef = await addDoc(collection(db, `${uid}/journal/notes`), newNote);
        dispatch(activeNote(docRef.id, newNote));
        dispatch(addNewNote(docRef.id,newNote));
    }
}

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!note.url) delete note.url;
        const {id,...res} =note;
        const docRef = doc(db, uid, 'journal', 'notes', id);
        await updateDoc(docRef, res);
        dispatch(refreshNote(id, res));
        Swal.fire('Saved',note.title,'success');
    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
})

export const startLoadedNotes = (uid) => {
    return async (dispatch) => {
        let notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})

const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id, note: { id, ...note }
    }

})

export const startUploading = (file) => {
    return async (dispatch, getState)=> {
        const {active:activeNote} = getState().notes;
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick:false,
            onBeforeOpen:() => {
                Swal.showLoading();
            }
        })
        const fileUrl = await fileUpload(file);
        dispatch(startSaveNote({...activeNote,url:fileUrl}))
        Swal.close();
    }
}

export const startDeleting = (id) => {
    return async (dispatch,getState) => {
        const {uid} = getState().auth;
        const docRef = doc(db, uid, 'journal', 'notes', id);
        await deleteDoc(docRef);
        dispatch(deleteNote(id));
        Swal.fire('Deleting','Nota eliminado','success');
    }
}

const deleteNote = (id) =>({
    type:types.notesDelete,
    payload:id
})

export const noteLogout = ()=> ({
    type:types.notesLogout
})