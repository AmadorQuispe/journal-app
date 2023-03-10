import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { login } from '../actions/auth';
import { startLoadedNotes } from '../actions/notes';
import { JournalScreen } from '../components/journal/JournalScreen';
import { LoadingScreen } from '../components/loading/LoadingScreen';

import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
const auth = getAuth();
export const AppRouter = () => {    
    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                dispatch(startLoadedNotes(user.uid));
            } else {
                setIsLoggedIn(false);
            }
            setChecking(false);
        })
    }, [dispatch, setChecking]);

    if (checking) {
        return (
            <LoadingScreen />
        )
    }

    return (
        <HashRouter>
            <Routes>
                <Route
                    path='/'                    
                    element={
                        <PrivateRoute isAuthenticated={isLoggedIn}>                            
                            <JournalScreen />
                        </PrivateRoute>
                    }
                />
                <Route 
                    path='auth/*' 
                    element={
                        <PublicRoute isAuthenticated={isLoggedIn}>
                            <AuthRouter />
                        </PublicRoute>
                    } 
                
                />
                <Route path='*' element={<Navigate to="/" replace />} />
            </Routes>
        </HashRouter>



    )
}
