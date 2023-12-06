import React from "react";
import styled from "styled-components";
import TopBar from "./components/TopBar";
import ChatBar from "./components/ChatBar";
import Navigation from "./components/navigation/Navigation";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const RestWrapper = styled.div`
  height: calc(100vh - 60px);
  overflow-y: auto;
  overflow-x: hidden;
`;

const ContentWrapperElement = styled.div`
  flex: 1;
`;

const ContentWrapper = ({ children }) => {
  return (
    <Wrapper>
      <Navigation />
      <ContentWrapperElement>
        <TopBar />
        <RestWrapper>{children}</RestWrapper>
      </ContentWrapperElement>
    </Wrapper>
  );
};

export default ContentWrapper;
