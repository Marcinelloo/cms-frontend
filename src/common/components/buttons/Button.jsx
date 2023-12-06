import React from "react";
import styled from "styled-components";
import { COLORS } from "../../colors/colors";

const CommonButtonStyles = `
  background-color: ${COLORS.first};
  font-size: 15px;
  font-weight: 500;
  border: none;
  color: white;
  border-radius: 8px;
  padding: 8px 18px;
  cursor: pointer;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Submit = styled.button`
  ${CommonButtonStyles}
  width: 100%;
  padding: 5px;
  border-radius: 10px;
  line-height: 29px;
  font-weight: bold;
`;

const Login = styled.button`
  ${CommonButtonStyles}
  color: #FFF;
  font-family: Poppins;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  transform: scale(1.1);
  border-radius: 32px;
  background-color: ${COLORS.accent};
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.25);
`;

const Apply = styled.button`
  ${CommonButtonStyles}
`;

const Change = styled.button`
  background-color: ${COLORS.second};

  ${CommonButtonStyles}
`;

const Messages = styled.button`
  background-color: ${COLORS.first};
  border-radius: 8px;
  padding: 8px 18px;
  cursor: pointer;
  transition: transform 0.5s ease;
  width: 158px;
  background-color: ${COLORS.second};
`;

const Upload = styled.button`
  ${CommonButtonStyles}
  width: 200px;
`;

const Preview = styled.button`
  ${CommonButtonStyles}
`;

const Download = styled.button`
  ${CommonButtonStyles}
`;

const Delete = styled.button`
  ${CommonButtonStyles}
  background-color: red;
  margin-top: 20px;
  width: 200px;
`;

const Add = styled.button`
  ${CommonButtonStyles}

  background-color: ${(props) => {
    return props.disable ? "grey !important" : "%{COLORS.first} !important";
  }};
  cursor: ${(props) => {
    return props.disable ? "not-allowed !important" : "pointer !important";
  }};
`;

const User = styled.button`
  background-color: ${COLORS.first};
  color: white;
  border-radius: 8px;
  padding: 8px 18px;
  cursor: pointer;
  transition: transform 0.5s ease;
  width: 158px;
  margin-bottom: 7px;
`;

const Error = styled.button``;

const Warning = styled.button`
  ${CommonButtonStyles}
  padding: 5px 10px;
  color: white;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border-radius: 10px;
  background-color: #ff432a;
  box-shadow: 0px 4px 26px 0px rgba(0, 0, 0, 0.25);
`;

const Accept = styled.button`
  ${CommonButtonStyles}
  background-color: green;
  margin-right: 20px;
`;

const Reject = styled.button`
  ${CommonButtonStyles}
  background-color: red;
  margin-right: 20px;
`;

const Report = styled.button`
  ${CommonButtonStyles};
  background-color: green;
  margin-right: 100px;
`;

const Button = ({ type, handler, text, style, disable = false }) => {
  if (type === "submit") {
    return (
      <Submit type="submit" style={style}>
        {text}
      </Submit>
    );
  }

  if (type === "error" || type === "warning") {
    return (
      <Warning type="button" onClick={(e) => handler(e)} style={style}>
        {text}
      </Warning>
    );
  }

  if (type === "login") {
    return (
      <Login type="submit" style={style}>
        {text}
      </Login>
    );
  }
  if (type === "change") {
    return (
      <Change type="button" onClick={(e) => handler(e)} style={style}>
        {text}
      </Change>
    );
  }

  if (type === "apply") {
    return (
      <Apply type="button" onClick={() => handler()} style={style}>
        {text}
      </Apply>
    );
  }
  if (type === "User") {
    return (
      <User type="button" onClick={() => handler()} style={style}>
        {text}
      </User>
    );
  }
  if (type === "Messages") {
    return (
      <Messages type="button" onClick={() => handler()} style={style}>
        {text}
      </Messages>
    );
  }
  if (type === "upload") {
    return (
      <Upload type="button" onClick={() => handler()} style={style}>
        {text}
      </Upload>
    );
  }
  if (type === "preview") {
    return (
      <Preview type="button" onClick={() => handler()} style={style}>
        {text}
      </Preview>
    );
  }

  if (type === "download") {
    return (
      <Download type="button" onClick={() => handler()} style={style}>
        {text}
      </Download>
    );
  }

  if (type === "delete") {
    return (
      <Delete type="button" onClick={() => handler()} style={style}>
        {text}
      </Delete>
    );
  }
  if (type === "accept") {
    return (
      <Accept type="button" onClick={() => handler()} style={style}>
        {text}
      </Accept>
    );
  }
  if (type === "add") {
    return (
      <Add
        type="button"
        onClick={() => handler()}
        style={style}
        disable={disable}
        disabled={disable}
      >
        {text}
      </Add>
    );
  }

  if (type === "reject") {
    return (
      <Reject type="button" onClick={() => handler()} style={style}>
        {text}
      </Reject>
    );
  }

  if (type === "reject") {
    return (
      <Reject type="button" onClick={() => handler()} style={style}>
        {text}
      </Reject>
    );
  }
  if (type === "report") {
    return (
      <Report type="button" onClick={() => handler()} style={style}>
        {text}
      </Report>
    );
  }

  return <button></button>;
};

export default Button;
