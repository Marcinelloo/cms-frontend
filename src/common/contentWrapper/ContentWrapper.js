import React from "react";
import styled from "styled-components";
import TopBar from "./components/TopBar";
import Fotter from "./components/Fotter";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100vh;
`;

const ContentWrapper = ({ children }) => {
  return (
    <Wrapper>
      <TopBar />
      <div
        style={{
          height: "calc(100vh - 60px)",
          overflowY: "auto",
        }}
      >
        {children}
      </div>
      <Fotter />
    </Wrapper>
  );
};

export default ContentWrapper;
