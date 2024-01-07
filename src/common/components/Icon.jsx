import React from "react";
import styled from "styled-components";
import { COLORS } from "../colors/colors";

const CustomIcon = styled.i`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size}px;
  cursor: pointer;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const Icon = ({
  iconName,
  color = COLORS.first,
  size = 20,
  style,
  onClick,
}) => {
  return (
    <CustomIcon
      className={iconName}
      color={color}
      size={size}
      style={style}
      onClick={onClick}
    />
  );
};

export default Icon;
