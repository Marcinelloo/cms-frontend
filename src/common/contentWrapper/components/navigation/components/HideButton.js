import React from "react";
import Icon from "../../../../components/Icon";
import styled from "styled-components";
import { COLORS } from "../../../../colors/colors";

const Wrapper = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  left: 10px;
  border: none;
  border-radius: 8px;
  padding: 5px 5px 5px 5px;

  font-size: 12px;
  cursor: pointer;
`;

const HideButton = ({ handleToggleNavigation, showFullNavigation }) => {
  return (
    <Wrapper onClick={handleToggleNavigation}>
      <Icon
        iconName={
          showFullNavigation
            ? "fa-solid fa-arrow-left"
            : "fa-solid fa-arrow-right"
        }
        hoverScale={1}
        style={{
          color: COLORS.accent,
        }}
      />
    </Wrapper>
  );
};

export default HideButton;
