import React from "react";
import Select from "react-select";
import styled from "styled-components";
import { COLORS } from "@/common/colors/colors";

const Required = styled.span`
  color: #c9382b;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;

  flex-direction: ${(props) => (props.labelUp ? "column" : "row")};
  cursor: ${(props) => (props.cursor ? "default" : "auto")};

  @-webkit-keyframes autofill {
    0%,
    100% {
      color: #666;
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
  color: ${(props) => props.labelColor || "black"};
`;

const CustomI = styled.i`
  position: absolute;
  top: 40px;
`;

const CustomIPassword = styled(CustomI)`
  cursor: pointer;
  right: 0;
`;

const customStyles = (width, icon) => {
  return {
    container: (provided) => ({
      ...provided,
      width: `${width}px`,
    }),
    control: (provided, state) => ({
      ...provided,
      borderRadius: "0px",
      width: `${width}px`,
      border: "none",
      background: "white",
      borderBottom: "1px solid black",
      boxShadow: "none",
      "&:hover ": {
        borderBottom: `1px solid ${COLORS.second}`,
      },
      paddingLeft: icon ? "20px" : 0,
    }),
    valueContainer: (provided) => ({
      ...provided,
    }),
    menu: (provided) => ({
      ...provided,
      width: `${width}px`,
      maxHeight: "240px",
    }),
    menuList: (provided) => ({
      ...provided,
      width: `${width}px`,
      maxHeight: "240px",
    }),
    option: (provided) => ({
      ...provided,
    }),
  };
};

const SelectInput = ({
  options,
  setSelected,
  selected,
  multiple = false,
  required = false,
  selectWidth = 260,
  height = "auto", // Add the height parameter with a default value
  placeholder = "Select...",
  id,
  disabled = false,
  labelColor,
  inputColor,
  wrapText,
  fontSize,
  label,
  cursor,
  labelUp,
  type,
  icon,
  width,
}) => {
  return (
    <Wrapper
      labelColor={labelColor}
      inputColor={inputColor}
      wrapText={wrapText}
      cursor={cursor}
      labelUp={labelUp}
      type={type}
      height={height} // Add the height prop to the Wrapper
    >
      <Label
        labelColor={labelColor}
        fontSize={fontSize}
        style={{ width: width, textAlign: "left" }}
      >
        {label}
        {required && <Required> *</Required>}
      </Label>
      {icon && <CustomI className={icon} />}
      <Select
        id={id}
        value={selected}
        onChange={setSelected}
        options={options}
        isMulti={multiple}
        styles={customStyles(selectWidth, icon)}
        placeholder={placeholder}
        isDisabled={disabled}
        required={required}
      />
    </Wrapper>
  );
};

export default SelectInput;
