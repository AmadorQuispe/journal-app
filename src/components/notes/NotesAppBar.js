import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes';
import { setShowSidebar } from '../../actions/ui';
import { getDateNow } from '../../helpers/util';

export const NotesAppBar = () => {
    const { notes:{active},ui:{showSidebar} } = useSelector(state => state);
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
    const handleMenuClick = () => {
        dispatch(setShowSidebar())
    }

    return (
        <div className="notes__appbar">
            <div>
                <i className={`fa-sharp fa-solid ${showSidebar?'fa-xmark':'fa-bars'} menu-hambur`} 
                    onClick={handleMenuClick}
                ></i>
                <span>{getDateNow()}</span>
            </div>
            <input
                type='file'
                name='file'
                accept='image/png,image/jpeg'
                hidden
                ref={inputFile}
                onChange={handleFileChange}
            />
            <div>

                <button className="btn" onClick={handlePictureClick}>
                    <i className="fa-solid fa-cloud-arrow-up mr-1"></i>
                    Picture
                </button>

                <button className="btn" onClick={handleSave}>
                    <i className="fa-solid fa-floppy-disk mr-1"></i>
                    Save
                </button>
            </div>
        </div>
    )
}
