import React from "react";
import styled from "styled-components";
import {COLORS} from "@/common/colors/colors";

const SwitchInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
  margin-top: -14px;
`;

const SwitchLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 60px;
  height: 32px;
  border-radius: 100px;
  border: 2px solid gray;
  position: relative;
  transition: background-color 0.2s;
  background-color: ${({checked}) => (checked ? COLORS.first : "transparent")};
`;

const SwitchButton = styled.span`
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 28px;
  height: 28px;
  border-radius: 45px;
  transition: 0.2s;
  background: grey;
  box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
  background: ${({checked}) => (checked ? "white" : "grey")};

  ${SwitchInput}:checked + ${SwitchLabel} & {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }

  ${SwitchLabel}:active & {
    width: 45px;
  }
`;

const ToggleSwitch = ({id, toggled, onChange, label}) => {
    return (
        <>
            {label && <span>{label}</span>}
            <SwitchInput
                className="switch-checkbox"
                id={id}
                type="checkbox"
                checked={toggled}
                onChange={onChange}
            />
            <SwitchLabel className="switch-label" htmlFor={id} checked={toggled}>
                <SwitchButton className="switch-button" checked={toggled}/>
            </SwitchLabel>
        </>
    );
};

export default ToggleSwitch;
