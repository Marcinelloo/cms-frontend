import React from "react";
import styled from "styled-components";
import { KEYBOARD_CODES } from "../constants/codes";

const Required = styled.span`
  color: #c9382b;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  cursor: ${(props) => (props.cursor ? "default" : "auto")};

  textarea {
    color: ${(props) => props.inputColor || "white"};
    background: transparent;
    border: none;
    padding: 0.6rem;
    width: ${(props) => props.width || "92%"};
    height: ${(props) => props.height || "auto"};
    border-bottom: 1px solid ${(props) => props.inputColor || "white"};
    font-size: ${(props) => props.fontSize || "16px"};
    resize: ${(props) => (props.wrapText ? "auto" : "none")};
    overflow: ${(props) => (props.wrapText ? "auto" : "hidden")};
    ${(props) => !props.allowResize && "resize: none;"}
  }

  @-webkit-keyframes autofill {
    0%,
    100% {
      color: #666;
      background: transparent;
    }
  }

  input:-webkit-autofill {
    -webkit-animation-delay: 1s;
    -webkit-animation-name: autofill;
    -webkit-animation-fill-mode: both;
  }
`;

const Label = styled.label`
  font-style: normal;
  font-weight: 400;
  font-size: ${(props) => props.fontSize || "16px"};
  line-height: 29px;
  color: ${(props) => props.labelColor || "white"};
`;
const TextArea = ({
  name,
  required,
  label,
  type,
  placeholder,
  value,
  onChange,
  labelColor,
  inputColor,
  width,
  height,
  fontSize,
  wrapText,
  allowEnter,
  addScrollbar,
  allowResize,
  cursor,
  textareaRef,
}) => {
  const handleKeyDown = (e) => {
    if (!allowEnter && e.keyCode === KEYBOARD_CODES.ENTER) {
      e.preventDefault();
    }
  };

  return (
    <Wrapper
      width={width}
      height={height}
      fontSize={fontSize}
      labelColor={labelColor}
      inputColor={inputColor}
      wrapText={wrapText}
      allowResize={addScrollbar}
      cursor={cursor}
    >
      <Label htmlFor={name} labelColor={labelColor} fontSize={fontSize}>
        {label}
        {required && <Required>*</Required>}
      </Label>
      <textarea
        required={required}
        ref={textareaRef}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        style={{
          overflow: addScrollbar ? "auto" : "hidden",
          resize: allowResize ? "vertical" : "none",
        }}
      />
    </Wrapper>
  );
};

export default TextArea;
