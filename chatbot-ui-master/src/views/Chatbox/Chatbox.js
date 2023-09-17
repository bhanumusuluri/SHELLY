import React, { useState, useEffect, useRef } from "react";
import "./Chatbox.css";
import { quesAndAns, questions } from "./questions";
import { BiUser, BiBot } from "react-icons/bi";
import Grid from "@mui/material/Grid";

function Chatbox({ handleClose, open }) {
  const [conversation, setConversation] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [startConversation, setStartConversation] = useState(false);
  const [faq, setFaq] = useState(false);
  const [startBtn, setStartBtn] = useState(true);
  const [botImg, setBotImg] = useState(true);

  const chatContainerRef = useRef(null); // Reference to the chat container

  const startConvo = () => {
    setStartConversation(true);
    setStartBtn(false);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      setConversation((prev) => [
        ...prev,
        {
          isUser: true,
          message: inputMessage,
        },
      ]);
      setInputMessage("");

      const systemResponse = quesAndAns.find(
        (qa) => qa[0] === false && qa[1] === inputMessage
      );
      if (systemResponse) {
        setConversation((prev) => [
          ...prev,
          {
            isUser: false,
            message: systemResponse[1],
          },
        ]);
      }

      // Scroll to the bottom of the chat container after sending a message
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (faq && conversation.length < quesAndAns.length) {
      setConversation((prev) => [
        ...prev,
        {
          isUser: quesAndAns[prev.length][0],
          message: quesAndAns[prev.length][1],
        },
      ]);
    }
  }, [conversation, faq]);

  useEffect(() => {
    setTimeout(() => {
      setFaq(true);
    }, 200);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setBotImg(!botImg);
    }, 200);
  }, [open]);

  return (
    <div id="chatbox">
      <div className="chatbox-wrapper">
        <button className="close-btn" onClick={handleClose}>
          &times;
        </button>
        {!startConversation && (
          <>
            <div className="chatbox-top">
              <h1>SHELLY</h1>
              <h2>Hello 👋</h2>

              <div className="chatbox-intro">
                <p>I am Shelly, a Virtual Assistant</p>
                <p>How may I help you today?</p>
              </div>
            </div>

            <div className="faq-wrapper">
              <div className="bot-img">
                <img src="./bot.svg" alt="bot" />
              </div>
              <div className="faq-lists">
                {!startConversation && (
                  <>
                    <h2>Frequently Asked Questions</h2>
                    {faq && (
                      <ul>
                        {questions.map((question, key) => (
                          <li key={key}>
                            <span>⦿</span>
                            {question.title}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>
              {startBtn && (
                <div className="start-btn">
                  <button onClick={startConvo}>
                    <img src="./speech.svg" alt="speech ballon" />{" "}
                    <p>Start a Conversation</p>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
        {startConversation && (
          <>
            <div className="ques-wrapper">
              <div className="bot-img">
                <img src="./bot.svg" alt="bot" />
              </div>
              <div
                className="box-container"
                ref={chatContainerRef} // Add ref to the chat container
              >
                {faq && (
                  <ul className="conversation">
                    {conversation.map((message, key) => (
                      <li
                        key={key}
                        className={message.isUser ? "user" : "system"}
                        style={{
                          border: "1px solid black",
                          width: "80%",
                          marginLeft: message.isUser ? "0" : "auto",
                          marginRight: message.isUser ? "auto" : "0",
                          textAlign: message.isUser ? "left" : "right",
                          display: "flex",
                          justifyContent: message.isUser
                            ? "flex-start"
                            : "flex-end",
                          alignItems: "center",
                          padding: "5px 10px",
                        }}
                      >
                        <Grid container spacing={1}>
                          <Grid item xs={2}>
                            {message.isUser && (
                              <BiBot
                                style={{
                                  width: "15px", // Fixed width for the icon
                                  height: "15px", // Fixed height for the icon
                                }}
                              />
                            )}
                          </Grid>
                          <Grid item xs={8}>
                            <div>{message.message}</div>
                          </Grid>
                          <Grid item xs={2}>
                            {!message.isUser && (
                              <BiUser
                                style={{
                                  width: "15px", // Fixed width for the icon
                                  height: "15px", // Fixed height for the icon
                                }}
                              />
                            )}
                          </Grid>
                        </Grid>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="input-bottom">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </>
        )}
        <button className="close-btn" onClick={handleClose}>
          &times;
        </button>
      </div>
    </div>
  );
}

export default Chatbox;
