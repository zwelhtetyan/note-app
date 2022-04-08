import React from 'react';

const Editor = (props) => {
    return (
        <div className='editor'>
            <textarea
                onChange={props.updateNote}
                cols='30'
                rows='10'
                value={props.currentNote.text}
                placeholder='Type your note here...'
            ></textarea>
        </div>
    );
};

export default Editor;
