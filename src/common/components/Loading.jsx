import React from "react";
// import Animation from "@/common/icons/animation.svg";
import styled from "styled-components";
import {COLORS} from "../colors/colors";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background: rgba(128, 128, 128, 0.78);
  z-index: 999999;
`;

const LoadingWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

const AnimatedCircle = styled.circle`
  stroke: ${({color}) => color};
`;

const Loading = () => {
    return (
        <Wrapper>
            <LoadingWrapper>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    style={{margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto'}}
                    width="241px"
                    height="241px"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                >
                    <AnimatedCircle
                        cx="50"
                        cy="50"
                        r="20"
                        strokeWidth="4"
                        strokeDasharray="31.41592653589793 31.41592653589793"
                        fill="none"
                        strokeLinecap="round"
                        color={COLORS.first} // Change this to the desired color
                    >
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            dur="2.380952380952381s"
                            repeatCount="indefinite"
                            keyTimes="0;1"
                            values="0 50 50;360 50 50"
                        ></animateTransform>
                    </AnimatedCircle>
                    <AnimatedCircle
                        cx="50"
                        cy="50"
                        r="15"
                        strokeWidth="4"
                        strokeDasharray="23.561944901923447 23.561944901923447"
                        strokeDashoffset="23.561944901923447"
                        fill="none"
                        strokeLinecap="round"
                        color={COLORS.accent} // Change this to the desired color
                    >
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            dur="2.380952380952381s"
                            repeatCount="indefinite"
                            keyTimes="0;1"
                            values="0 50 50;-360 50 50"
                        ></animateTransform>
                    </AnimatedCircle>
                </svg>
            </LoadingWrapper>
        </Wrapper>
    );
};

export default Loading;
