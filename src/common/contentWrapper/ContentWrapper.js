import React from "react";
import styled from "styled-components";
import TopBar from "./components/TopBar";
import Fotter from "./components/Fotter";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = ({ children }) => {
  return (
    <Wrapper>
      <TopBar />
      {children}
      <div style={{ flex: "1", background: "#f6f6f6" }}></div>
      <Fotter />
    </Wrapper>
  );
};

export default ContentWrapper;
