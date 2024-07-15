import React, { useState, useEffect } from "react";
import "./Notes.css";
import { v4 as uuid } from 'uuid';

const Notes = () => {
    const [userInput, setUserInput] = useState("");
    const [userNotes, setUserNotes] = useState(localStorage.userNotes ? JSON.parse(localStorage.userNotes) :[])
    
    useEffect(() => {
        localStorage.setItem('userNotes', JSON.stringify(userNotes));
    }, [userNotes]);

    const handleChange = (e) => {
        setUserInput(e.target.value);
    };

    const addNote = (e) => { 
        e.preventDefault();
        if (userInput.trim() === "") return; 

        const newNote = {
            id: uuid(),
            note: userInput
        };
        setUserNotes([...userNotes, newNote]);
        setUserInput(""); 
    };

    const deleteNote = (noteid) => {
        const updatedNotes = userNotes.filter(({ id }) => id !== noteid);
        setUserNotes(updatedNotes);
    };

    const clearAll = () => {
        setUserNotes([]);
    };

    return (
        <div className="summary notes">
            <div className="title-measure">How was your day?</div>
            <div className="goal-weight">Keep track of your mood and thoughts!</div>

            <form className="notesInfo" onSubmit={addNote}>
                <input
                    className="inputUser" 
                    type="text" 
                    placeholder="Enter here" 
                    value={userInput} 
                    onChange={handleChange} 
                    maxLength="200"
                />
                <button className="addnote" type="submit">Add</button>
            </form>

            <div className="note-all">
                {userNotes.map(({ id, note }) => (
                    <div className="note" key={id}>
                        <div className="note-title">{note}</div>
                        <button className="erase" onClick={() => deleteNote(id)}>Erase</button>
                    </div>
                ))}
            </div>
            
            <div className="clear-all-place">
                {userNotes.length > 0 && <button className="clear-all" onClick={clearAll}>Clear All</button>}
            </div>
        </div>
    );
};

export default Notes;
