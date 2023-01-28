import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setShowSidebar } from '../../actions/ui';

export const NothingSelected = () => {
    const dispatch = useDispatch();
    const { ui:{showSidebar} } = useSelector(state => state);
    const handleMenuClick = () => {
        dispatch(setShowSidebar())
    }
    return (
        <>

            <div className="nothing__main-content">
                <div className='nothing__menu-hambur'>
                <i className={`fa-sharp fa-solid ${showSidebar?'fa-xmark':'fa-bars'} menu-hambur`} 
                    onClick={handleMenuClick}
                ></i>
                </div>
                <p>
                    Select something
                    <br />
                    or create an entry!
                </p>
                <i className="far fa-star fa-4x mt-5"></i>
            </div>
        </>
    )
}
