import React, { useState, useEffect } from "react";
import './Homescreen.css'
import Chatbox from '../Chatbox/Chatbox'

function Homescreen() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open)
    }

    return (
        <div id="homescreen">
            <div className="project-info">
                <h1 className="welcome">WELCOME</h1>
                
            </div>

            <div className="chat-box">
                {open && <Chatbox handleClose={handleOpen} open={open} />}
            </div>
            
            <div className="chat-button">
                <div className="tooltip">
                    Hi, how can I help you?
                </div>
                <button onClick={handleOpen}>
                    <img src="./chat.png" alt="chat-icon" />
                </button>
            </div>

            <h2 className="footer-text">CHATBOT UI <img src="./chat.png" width="15px" height="15px" alt="chat-png" /></h2>

        </div >
    )
}

export default Homescreen
