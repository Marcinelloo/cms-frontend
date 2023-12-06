import React from "react";
import styled from "styled-components";

const DateInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-right: 10px;
  width: 80px;
`;

const Input = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const DateInput = ({ label, value, onChange, disabled=false, dateRef, required=false}) => {
  return (
    <DateInputWrapper>
      <Label>{label}</Label>
      <Input type="date" defaultValue={value} onChange={onChange} disabled={disabled} ref={dateRef} required={required}/>
    </DateInputWrapper>
  );
};

export default DateInput;
