import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframes dla animacji kropek
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// Stylizowany komponent LoadingContainer
const LoadingContainerWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;

  .dots {
    display: flex;

    span {
      display: block;
      width: 8px;
      height: 8px;
      margin: 0 5px;
      background-color: #333;
      border-radius: 50%;
      animation: ${bounce} 0.7s infinite alternate;

      &:nth-child(2) {
        animation-delay: 0.3s;
      }

      &:nth-child(3) {
        animation-delay: 0.5s;
      }
    }
  }
`;

const LoadingContainer = () => {
  return (
    <LoadingContainerWrapper>
      <h2>Ładowanie</h2>
      <div className="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </LoadingContainerWrapper>
  );
};

export default LoadingContainer;
