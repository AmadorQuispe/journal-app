import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    const dispatch = useDispatch();
    const {active:note} = useSelector( state => state.notes );
    const [formValues,handleInputChange,reset] = useForm(note);
    const {body,title} = formValues;
    const activeId = useRef(note.id);
    const handleInputBlur = () => {
        dispatch(activeNote(note.id,{...formValues}));
    }
    const handleDelete = () => {
        dispatch(startDeleting(note.id));
    }


    useEffect(() => {
      if (note.id !== activeId.current){
          reset ( note );
          activeId.current = note.id
      }
    }, [note,reset])
    
    return (
        <div className="notes__main-content animate__animated animate__fadeIn">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    name='title'
                    value={ title }
                    onChange = {handleInputChange}
                    autoComplete="off"
                    onBlur={handleInputBlur}
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    name='body'
                    value={ body }
                    onChange = {handleInputChange}
                    onBlur={handleInputBlur}
                ></textarea>

                {note.url &&
                    <div className="notes__image">
                        <img 
                            src={note.url}
                            alt="imagen"
                        />
                    </div>
                }


            </div>
            <button className='btn btn-danger' onClick={handleDelete}>Delete</button>

        </div>
    )
}
