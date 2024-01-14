import { createContext, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../colors/colors";

export const MESSAGE_TYPES = {
  CORRECT: "correct",
  WRONG: "wrong",
  ERROR: "error",
};
const AVAILABLE_SECONDS = 5 * 1000;

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 30px;
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  z-index: 99999999;
`;

const MessageElement = styled.div`
  width: 300px;
  padding: 10px;
  text-align: center;
  border-radius: 15px;
  opacity: 0;
  animation: fadeIn 2.0s, fadeOut 2.5s ${AVAILABLE_SECONDS * 10}s forwards;
  transition: opacity 0.5s;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
}
`;


export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const handleAddMessage = (message, type) => {
    setMessages((prev) => [{ message, type }, ...prev]);

    setTimeout(() => {
      setMessages((prev) => prev.filter((p) => p.message !== message));
    }, AVAILABLE_SECONDS);
  };

  const getBackgroundColor = (type) => {
    if (type === MESSAGE_TYPES.CORRECT) {
      return COLORS.first;
    }
    if (type === MESSAGE_TYPES.ERROR) {
      return COLORS.red;
    }

    return COLORS.yellow;
  };

  const getTextColor = (type) => {
    if (type === MESSAGE_TYPES.CORRECT) {
      return "white";
    }
    if (type === MESSAGE_TYPES.WRONG) {
      return "white";
    }

    return "white";
  };

  return (
    <MessageContext.Provider
      value={{
        handleAddMessage,
      }}
    >
      <MessageWrapper>
        {messages.map((m) => (
          <MessageElement
            style={{
              background: getBackgroundColor(m.type),
              color: getTextColor(m.type),
            }}
          >
            {m.message}
          </MessageElement>
        ))}
      </MessageWrapper>
      {children}
    </MessageContext.Provider>
  );
};
