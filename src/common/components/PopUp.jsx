import React from "react";
import styled, { css } from "styled-components";
import Icon from "./Icon";
import {COLORS} from "@/common/colors/colors";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  margin-right: 20px;
  ${(props) =>
      props.showBlur &&
      css`
        backdrop-filter: blur(5px);
      `}

`;

const Box = styled.div`
  min-width: 500px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  //padding: 10px 10px 10px 10px;

`;

const Card = styled.div`
  border-radius: 10px;
  border: 1px solid grey;
  background: white;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  overflow-y: auto;

`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
`;

const PopUp = ({
  setShow = () => {},
  children,
  canOffByClickingBackground = true,
  showBlur = true,
  closeIcon = true,
  paddingCard = "10px 20px 50px 20px",
}) => {
  return (
    <Wrapper showBlur={showBlur}>
      {canOffByClickingBackground && (
        <div
          onClick={() => setShow((prev) => !prev)}
          style={{ width: "100%", height: "100%" }}
        ></div>
      )}
      <Box>
        <Card style={{ padding: paddingCard }}>
          {closeIcon && (
            <IconWrapper>
              <Icon
                iconName={"fa fa-close"}
                style={{ color: COLORS.accent, cursor: "pointer" }}
                onClick={() => setShow(false)}
              />
            </IconWrapper>
          )}
          {children}
        </Card>
      </Box>
    </Wrapper>
  );
};
export default PopUp;
