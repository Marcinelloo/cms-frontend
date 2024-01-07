import React, { useState } from "react";
import styled from "styled-components";
import { KEYBOARD_CODES } from "../constants/codes";
import { COLORS } from "@/common/colors/colors";
import HelpTooltip from "@/common/components/Tooltip";

const Required = styled.span`
  color: ${COLORS.red};
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  text-align: center;
  flex-direction: ${(props) => (props.labelUp ? "column" : "row")};
  cursor: ${(props) => (props.cursor ? "default" : "auto")};

  input {
    color: ${(props) => props.inputColor || "black"};
    background: transparent;
    border: none;
    padding: 0.6rem;
    width: ${(props) => props.width || "92%"};
    height: ${(props) => props.height || "auto"};
    border-bottom: 1px solid ${(props) => props.inputColor || "white"};
    font-size: ${(props) => props.fontSize || "16px"};
    white-space: ${(props) => (props.wrapText ? "normal" : "nowrap")};
    border-bottom: ${(props) =>
      props.type === "file" ? "none" : " 1px solid black"};

    &:focus,
    &:hover {
      border-bottom: ${(props) =>
        props.type === "file" ? "none" : ` 1px solid ${COLORS.second}`};
    }
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
  color: ${(props) => props.labelColor || "black"};
`;

const CustomI = styled.i`
  position: absolute;
  top: 35px;
`;

const CustomIPassword = styled(CustomI)`
  cursor: pointer;
  right: 0;
`;
const Input = ({
  tooltipContent,
  tooltipPosition = "bottom",
  name,
  required = false,
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
  cursor,
  icon,
  labelUp = false,
  inputRef,
  labelStyle = {},
  disabled = false,
  multiple,
  handleOnKeydownButton = () => {},
  onKeyDown,
  min,
  max,
}) => {
  const [showPassword, setShowPassword] = useState();

  const handleKeyDown = (e) => {
    if (!allowEnter && e.keyCode === KEYBOARD_CODES.ENTER) {
      e.preventDefault();
      handleOnKeydownButton();
    }
    if (onKeyDown) {
      onKeyDown(e);
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
      labelUp={labelUp}
      type={type}
    >
      <Label
        htmlFor={name}
        labelColor={labelColor}
        fontSize={fontSize}
        style={{
          display: "flex",
          justifyContent: "left",
          marginRight: "10px",
          ...labelStyle,
        }}
      >
        {label}
        {required && <Required> *</Required>}
        {tooltipContent && (
          <HelpTooltip content={tooltipContent} position={tooltipPosition} />
        )}
      </Label>
      {icon && <CustomI className={icon} />}
      {type === "password" && <CustomI className="fa fa-lock" />}
      {type === "password" && (
        <CustomIPassword
          className={
            !showPassword ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"
          }
          onClick={() => setShowPassword((prev) => !prev)}
        />
      )}
      <input
        style={{
          paddingLeft: icon || type === "password" ? "30px" : "5px",
        }}
        type={showPassword ? "text" : type}
        name={name}
        ref={inputRef}
        id={name}
        placeholder={placeholder}
        defaultValue={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        required={required}
        disabled={disabled}
        multiple={true}
        min={min}
        max={max}
      />
    </Wrapper>
  );
};

export default Input;
