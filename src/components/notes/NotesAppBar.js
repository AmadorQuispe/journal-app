import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes';
import { getDateNow } from '../../helpers/util';

export const NotesAppBar = () => {
    const {active} = useSelector( state => state.notes );
    const dispatch = useDispatch();
    const inputFile = useRef(null);
    const handleSave = () => {
        dispatch(startSaveNote(active))
    }
    const handlePictureClick = () => {
       inputFile.current.click()
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            dispatch(startUploading(file));
        }
    }
    return (
        <div className="notes__appbar">
            <span>{getDateNow()}</span>
            <input 
                type='file' 
                name='file'
                style={{display:'none'}}
                ref={inputFile}
                onChange= {handleFileChange}
            />
            <div>
                <button className="btn" onClick={handlePictureClick}>
                    Picture
                </button>

                <button className="btn" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    )
}
