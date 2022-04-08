import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const Sidebar = (props) => {
    const noteElement = props.notes.map((note, index) => {
        return (
            <div
                key={note.id}
                className={`noteItem ${
                    note.id === props.currentNote.id ? 'selected' : ''
                }`}
                onClick={() => props.handleSelect(note.id)}
            >
                <marquee className='mb-0 note-summary'>
                    {note.text ? note.text.split('\n')[0] : `note ${index + 1}`}
                </marquee>
                <FontAwesomeIcon
                    icon={faTrashCan}
                    className='delete-icon'
                    onClick={() => props.handleDelete(note.id)}
                />
            </div>
        );
    });

    return (
        <div className='side-bar'>
            <h4 className='text-center button' style={{ marginTop: '1em' }}>
                Notes{' '}
                <span className='badge add-note' onClick={props.createNewNote}>
                    +
                </span>
            </h4>
            {noteElement}
        </div>
    );
};

export default Sidebar;
