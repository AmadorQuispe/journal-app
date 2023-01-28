import React from 'react'
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';
import { setShowSidebar } from '../../actions/ui';
import { getLongMonthName } from '../../helpers/util';

export const JournalEntry = ({id,date,title,body,url}) => {  
    const dispatch = useDispatch();
    const f =  new Date(date);
    const handleEntryClick = () => {
        dispatch(activeNote(id,{date,title,body,url}));
        dispatch(setShowSidebar())
    }
    return (
        <div className="journal__entry pointer animate__animated animate__fadeIn" 
            onClick={handleEntryClick}>
            
            {url && 
                <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`
                    }}
                ></div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    { title }
                </p>
                <p className="journal__entry-content">
                    { body }
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{getLongMonthName(f)}</span>
                <h4>{f.getDay()+1}</h4>
            </div>

        </div>
    )
}
