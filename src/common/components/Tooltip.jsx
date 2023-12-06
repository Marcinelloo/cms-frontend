import Icon from "@/common/components/Icon";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  z-index: 999;
  //margin-top: 20px;
  padding-left: 10px;
`;

const TooltipContent = styled.div`
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  position: absolute;
  bottom: ${({ position }) => (position === "top" ? "100%" : "auto")};
  top: ${({ position }) => (position === "bottom" ? "100%" : "auto")};
  right: 100%; 
  transform: translateY(-70px); /* Adjust as needed */
  background-color: #333;
  color: #fff;

  padding: 8px;
  margin-right: 20px;
  border-radius: 4px;
  width: 200px;
  text-align: center;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.3s ease;
  z-index: 999;
`;

const Tooltip = ({ children, content, position = "bottom" }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState(position);
    const iconRef = useRef(null);

    useEffect(() => {
        if (iconRef.current) {
            const rect = iconRef.current.getBoundingClientRect();
            const spaceAbove = rect.top;
            const spaceBelow = window.innerHeight - rect.bottom;

            if (spaceBelow < 150 && spaceAbove > spaceBelow) {
                setTooltipPosition("top");
            } else {
                setTooltipPosition("bottom");
            }
        }
    }, [position]);

    return (
        <TooltipContainer>
            <div
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                ref={iconRef}
            >
                {children}
            </div>
            <TooltipContent show={showTooltip} position={tooltipPosition}>
                {content}
            </TooltipContent>
        </TooltipContainer>
    );
};

const HelpTooltip = ({ content, position }) => {
    return (
        <Tooltip content={content} position={position}>
            <Icon iconName="fa-regular fa-circle-question" style={{ marginRight: "20px" }} />
        </Tooltip>
    );
};

export default HelpTooltip;
