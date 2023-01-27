import { types } from "../reducers/types";
import Swal from "sweetalert2";
import { getAuth, signInWithPopup,signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,signOut } from "firebase/auth";
import { googleProvider } from "../firebase/firebase-config";
import { finishLoading, startLoading } from "./ui";
import { noteLogout } from "./notes";


const auth = getAuth();

export const startLoginEmailPassword = (email,password) => {
    return (dispatch) => {
        dispatch(startLoading());
        signInWithEmailAndPassword(auth,email,password)
        .then(({user})=>{
            dispatch(login(user.uid,user.displayName));
            dispatch(finishLoading());
        })
        .catch(error =>{
            const errorMessage = error.message;
            dispatch(finishLoading());
            Swal.fire('Error',errorMessage,'error')
        })
    }
}

export const startRegisterWithEmailPass =(email,password,name) => {
    return (dispatch) => {
        createUserWithEmailAndPassword(auth,email,password)
        .then(async ({user})=>{
            await updateProfile(user,{displayName:name});
            dispatch(login(user.uid,user.displayName));
        })
        .catch(err=>{
            Swal.fire('Error',err.message,'error')
        })
        
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {       
        signInWithPopup(auth,googleProvider)
            .then((result) => {
                const {uid,displayName} = result.user;
                dispatch(login(uid,displayName));
            }).catch((err) => {
                Swal.fire('Error',err.message,'error')
            });
    }
}
export const startLogout = () => {
    return (dispatch) => {
        signOut(auth).then(()=>{
            dispatch(logout());
            dispatch(noteLogout());
        })
    }
}
export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const logout = () =>({
    type:types.logout
})

