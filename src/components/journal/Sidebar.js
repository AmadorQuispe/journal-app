import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {
    const dispatch = useDispatch();
    const {ui:{showSidebar},auth:{name}} = useSelector(state=>state);
    
    const handleLogout = () => {
        dispatch(startLogout());
    }
    const handleAddEntry = () => {
        dispatch(startNewNote());
    }
    return (
        <aside className={`journal__sidebar ${showSidebar?'show':''} ` }>
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="fa-regular fa-note-sticky mr-1"></i>
                    <span>{name}</span>
                </h3>

                <button
                    className="btn"
                    onClick={handleLogout}
                >
                    Logout
                    <i className="fa-solid fa-arrow-right-from-bracket ml-1"></i>
                </button>
            </div>

            <div className="journal__new-entry" onClick={handleAddEntry}>
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">
                    New entry
                </p>
            </div>

            <JournalEntries />

        </aside>
    )
}
